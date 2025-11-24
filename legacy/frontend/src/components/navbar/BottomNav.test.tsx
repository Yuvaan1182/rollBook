import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { BottomNav } from "./BottomNav";

describe("BottomNav Component", () => {
  it("correctly renders navigation links", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <BottomNav />
      </MemoryRouter>
    );

    // Check for navigation links by their icons/roles
    const navLinks = screen.getAllByRole("link");

    // Should have 4 main nav links (dashboard, payments, invoices, settings)
    expect(navLinks).toHaveLength(4);

    // Verify the links have correct hrefs
    expect(navLinks[0]).toHaveAttribute("href", "/dashboard");
    expect(navLinks[1]).toHaveAttribute("href", "/payments");
    expect(navLinks[2]).toHaveAttribute("href", "/invoices");
    expect(navLinks[3]).toHaveAttribute("href", "/settings");
  });

  it("correctly renders dropdown menu", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <BottomNav />
      </MemoryRouter>
    );

    // Find the plus button (dropdown trigger)
    const plusButton = screen.getByRole("button");
    expect(plusButton).toBeInTheDocument();

    // Click to open dropdown
    await user.click(plusButton);

    // Check for dropdown items
    expect(screen.getByText("Project")).toBeInTheDocument();
    expect(screen.getByText("Service")).toBeInTheDocument();
    expect(screen.getByText("Invoice")).toBeInTheDocument();
    expect(screen.getByText("Client")).toBeInTheDocument();

    // Verify dropdown links have correct hrefs
    expect(screen.getByText("Project").closest("a")).toHaveAttribute(
      "href",
      "/projects"
    );
    expect(screen.getByText("Service").closest("a")).toHaveAttribute(
      "href",
      "/services"
    );
    expect(screen.getByText("Invoice").closest("a")).toHaveAttribute(
      "href",
      "/invoices/new"
    );
    expect(screen.getByText("Client").closest("a")).toHaveAttribute(
      "href",
      "/clients"
    );
  });

  it("has correct container classes and structure", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <BottomNav />
      </MemoryRouter>
    );

    const nav = container.querySelector("nav");
    expect(nav).toHaveClass("fixed", "bottom-0", "bg-background");
  });
});

describe("NavButton Component (Active Styles)", () => {
  it("correctly applies active styles when on the dashboard path", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <BottomNav />
      </MemoryRouter>
    );

    const navLinks = screen.getAllByRole("link");
    const dashboardLink = navLinks[0]; // First link is dashboard

    // Active link should have text-primary class
    expect(dashboardLink).toHaveClass("text-primary");
  });

  it("correctly applies active styles when on the payments path", () => {
    render(
      <MemoryRouter initialEntries={["/payments"]}>
        <BottomNav />
      </MemoryRouter>
    );

    const navLinks = screen.getAllByRole("link");
    const paymentsLink = navLinks[1]; // Second link is payments

    // Active link should have text-primary class
    expect(paymentsLink).toHaveClass("text-primary");
  });

  it("correctly applies active styles when on the invoices path", () => {
    render(
      <MemoryRouter initialEntries={["/invoices"]}>
        <BottomNav />
      </MemoryRouter>
    );

    const navLinks = screen.getAllByRole("link");
    const invoicesLink = navLinks[2]; // Third link is invoices

    // Active link should have text-primary class
    expect(invoicesLink).toHaveClass("text-primary");
  });

  it("correctly applies active styles when on the settings path", () => {
    render(
      <MemoryRouter initialEntries={["/settings"]}>
        <BottomNav />
      </MemoryRouter>
    );

    const navLinks = screen.getAllByRole("link");
    const settingsLink = navLinks[3]; // Fourth link is settings

    // Active link should have text-primary class
    expect(settingsLink).toHaveClass("text-primary");
  });

  it("applies muted foreground color to inactive links", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <BottomNav />
      </MemoryRouter>
    );

    const navLinks = screen.getAllByRole("link");

    // Dashboard is active, so other links should be muted
    expect(navLinks[1]).toHaveClass("text-muted-foreground"); // payments
    expect(navLinks[2]).toHaveClass("text-muted-foreground"); // invoices
    expect(navLinks[3]).toHaveClass("text-muted-foreground"); // settings
  });

  it("only one NavButton is active at a time", () => {
    render(
      <MemoryRouter initialEntries={["/payments"]}>
        <BottomNav />
      </MemoryRouter>
    );

    const navLinks = screen.getAllByRole("link");

    // Count how many links have the active class
    const activeLinks = navLinks.filter((link) =>
      link.className.includes("text-primary")
    );

    expect(activeLinks).toHaveLength(1);
    expect(activeLinks[0]).toHaveAttribute("href", "/payments");
  });
});
