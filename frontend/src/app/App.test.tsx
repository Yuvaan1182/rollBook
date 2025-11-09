import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

// Mock the child components
vi.mock("@/components/navbar/TopNav", () => ({
  default: () => <div data-testid="top-nav">TopNav</div>,
}));

vi.mock("@/components/navbar/BottomNav", () => ({
  BottomNav: () => <div data-testid="bottom-nav">BottomNav</div>,
}));

vi.mock("@/features/auth/components/login/Login", () => ({
  default: () => <div data-testid="login-page">Login Component</div>,
}));

describe("App Component", () => {
  it("renders TopNav, BottomNav, and Routes correctly", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    // Check if TopNav is rendered
    expect(screen.getByTestId("top-nav")).toBeInTheDocument();

    // Check if BottomNav is rendered
    expect(screen.getByTestId("bottom-nav")).toBeInTheDocument();

    // Check if Routes component renders Login (default route)
    expect(screen.getByTestId("login-page")).toBeInTheDocument();
  });

  it("renders Login component when navigating to / path", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId("login-page")).toBeInTheDocument();
  });

  it("renders Login component when navigating to /login path", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId("login-page")).toBeInTheDocument();
  });

  it("has correct container classes and structure", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveClass("h-screen", "bg-accent");
  });
});
