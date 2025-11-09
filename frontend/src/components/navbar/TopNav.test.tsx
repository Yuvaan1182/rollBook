import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import TopNav from "./TopNav";

// Mock the ModeToggle component
vi.mock("../mode-toggle", () => ({
  ModeToggle: () => <div data-testid="mode-toggle">ModeToggle</div>,
}));

describe("TopNav Component", () => {
  it("correctly renders the logo", () => {
    render(
      <MemoryRouter>
        <TopNav />
      </MemoryRouter>
    );

    // Check for logo text
    const logo = screen.getByText("Invoxyhub");
    expect(logo).toBeDefined();

    // Verify the logo is a link to dashboard
    const logoLink = logo.closest("a");
    expect(logoLink).not.toBeNull();
    expect((logoLink as HTMLAnchorElement).getAttribute("href")).toBe(
      "/dashboard"
    );
  });

  it("correctly renders the mode toggle", () => {
    render(
      <MemoryRouter>
        <TopNav />
      </MemoryRouter>
    );

    // Check if ModeToggle is rendered
    expect(screen.getByTestId("mode-toggle")).toBeDefined();
  });

  it("correctly renders the user avatar", () => {
    render(
      <MemoryRouter>
        <TopNav />
      </MemoryRouter>
    );

    // Check for avatar (may be image or fallback)
    const avatar = screen.getByText("CN"); // Fallback text
    expect(avatar).toBeDefined();
  });

  it("correctly renders user avatar dropdown menu", async () => {
    const user = userEvent.setup();

    const { container } = render(
      <MemoryRouter>
        <TopNav />
      </MemoryRouter>
    );

    // Find the avatar dropdown trigger by aria-haspopup
    const avatarTrigger = container.querySelector('[aria-haspopup="menu"]');
    expect(avatarTrigger).toBeDefined();

    await user.click(avatarTrigger!);

    // Check for dropdown menu items
    expect(await screen.findByText("Profile")).toBeDefined();
    expect(await screen.findByText("Logout")).toBeDefined();
  });

  it("dropdown has correct links", async () => {
    const user = userEvent.setup();

    const { container } = render(
      <MemoryRouter>
        <TopNav />
      </MemoryRouter>
    );

    // Open the dropdown by finding the trigger
    const avatarTrigger = container.querySelector('[aria-haspopup="menu"]');
    await user.click(avatarTrigger!);

    // Verify Profile link
    const profileLink = (await screen.findByText("Profile")).closest("a");
    expect(profileLink).not.toBeNull();
    expect((profileLink as HTMLAnchorElement).getAttribute("href")).toBe(
      "/profile"
    );
  });

  it("has correct container classes and structure", () => {
    const { container } = render(
      <MemoryRouter>
        <TopNav />
      </MemoryRouter>
    );

    const nav = container.querySelector("nav");
    expect(nav).not.toBeNull();
    expect(nav?.classList.contains("fixed")).toBe(true);
    expect(nav?.classList.contains("top-0")).toBe(true);
    expect(nav?.classList.contains("bg-background")).toBe(true);
    expect(nav?.classList.contains("border-b")).toBe(true);
  });

  it("renders all main sections: logo, mode toggle, and avatar", () => {
    render(
      <MemoryRouter>
        <TopNav />
      </MemoryRouter>
    );

    // Logo section
    expect(screen.getByText("Invoxyhub")).toBeDefined();

    // Mode toggle section
    expect(screen.getByTestId("mode-toggle")).toBeDefined();

    // Avatar section
    expect(screen.getByText("CN")).toBeDefined();
  });

  it("has correct layout structure with flex containers", () => {
    const { container } = render(
      <MemoryRouter>
        <TopNav />
      </MemoryRouter>
    );

    const nav = container.querySelector("nav");

    // Nav should have flex and justify-between
    expect(nav).not.toBeNull();
    expect(nav?.classList.contains("flex")).toBe(true);
    expect(nav?.classList.contains("justify-between")).toBe(true);
  });
});
