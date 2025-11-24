# Test Suite Documentation

This project uses **Vitest** and **React Testing Library** for unit testing React components.

## Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm test -- --run

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Files

### 1. App Component Tests (`src/app/App.test.tsx`)

Tests for the main App component:
- ✅ Renders TopNav, BottomNav, and Routes correctly
- ✅ Renders Login component when navigating to `/` path
- ✅ Renders Login component when navigating to `/login` path
- ✅ Has correct container classes and structure

### 2. BottomNav Component Tests (`src/components/navbar/BottomNav.test.tsx`)

Tests for the bottom navigation bar:
- ✅ Correctly renders navigation links (dashboard, payments, invoices, settings)
- ✅ Correctly renders dropdown menu with all items
- ✅ Has correct container classes and structure

**NavButton Active Styles Tests:**
- ✅ Correctly applies active styles when on the dashboard path
- ✅ Correctly applies active styles when on the payments path
- ✅ Correctly applies active styles when on the invoices path
- ✅ Correctly applies active styles when on the settings path
- ✅ Applies muted foreground color to inactive links
- ✅ Only one NavButton is active at a time

### 3. TopNav Component Tests (`src/components/navbar/TopNav.test.tsx`)

Tests for the top navigation bar:
- ✅ Correctly renders the logo
- ✅ Correctly renders the mode toggle
- ✅ Correctly renders the user avatar
- ✅ Correctly renders user avatar dropdown menu
- ✅ Dropdown has correct links
- ✅ Has correct container classes and structure
- ✅ Renders all main sections: logo, mode toggle, and avatar
- ✅ Has correct layout structure with flex containers

## Test Configuration

### Vitest Config (`vitest.config.ts`)

- **Environment**: jsdom (for DOM testing)
- **Globals**: Enabled for describe, it, expect
- **Setup Files**: `src/test/setup.ts`
- **CSS**: Enabled

### Test Setup (`src/test/setup.ts`)

- Imports `@testing-library/jest-dom` matchers
- Configures automatic cleanup after each test
- Mocks `window.matchMedia` for components that use media queries

## Writing New Tests

When writing new tests, follow these patterns:

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("ComponentName", () => {
  it("should render correctly", () => {
    render(
      <MemoryRouter>
        <ComponentName />
      </MemoryRouter>
    );

    expect(screen.getByText("Expected Text")).toBeInTheDocument();
  });

  it("should handle user interactions", async () => {
    const user = userEvent.setup();
    
    render(
      <MemoryRouter>
        <ComponentName />
      </MemoryRouter>
    );

    await user.click(screen.getByRole("button"));
    expect(screen.getByText("Result")).toBeInTheDocument();
  });
});
```

## Best Practices

1. **Wrap components in MemoryRouter** when they use React Router hooks or Link components
2. **Use `screen` queries** from Testing Library for better error messages
3. **Use `await` and `findBy*`** queries for async operations like dropdown opening
4. **Mock child components** when testing parent components to isolate behavior
5. **Test user interactions** with `userEvent` instead of `fireEvent`
6. **Use semantic queries** like `getByRole`, `getByText`, `getByLabelText` over test IDs when possible

## Coverage

To generate and view test coverage:

```bash
npm run test:coverage
```

This will create a `coverage` directory with an HTML report showing which lines of code are covered by tests.
