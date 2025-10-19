import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { CustomPagination } from "./CustomPagination";
import { MemoryRouter } from "react-router";
import type { PropsWithChildren } from "react";

vi.mock("../ui/button", () => ({
  Button: ({ children, ...props }: PropsWithChildren) => (
    <button {...props}>{children}</button>
  ),
}));

const rednerWithRouter = (
  component: React.ReactElement,
  initialEntries?: string[]
) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>
  );
};

describe("CustomPagination", () => {
  test("should render with default values", () => {
    rednerWithRouter(<CustomPagination totalPages={5} />);

    expect(screen.getByText("Next")).toBeDefined();
    expect(screen.getByText("Previous")).toBeDefined();
    expect(screen.getByText("1")).toBeDefined();
    expect(screen.getByText("2")).toBeDefined();
    expect(screen.getByText("3")).toBeDefined();
    expect(screen.getByText("4")).toBeDefined();
    expect(screen.getByText("5")).toBeDefined();
  });

  test("should dissable next button when page is 5", () => {
    rednerWithRouter(<CustomPagination totalPages={5} />, ["/?page=5"]);

    const button = screen.getByText("Next");
    expect(button.getAttributeNames()).toContain("disabled");
  });

  test("should dissable  button 3  when page is 3", () => {
    rednerWithRouter(<CustomPagination totalPages={5} />, ["/?page=3"]);

    const button = screen.getByText("3");

    expect(button.getAttribute("variant")).toBe("default");
  });

  test("should change page when click on number button", () => {
    rednerWithRouter(<CustomPagination totalPages={5} />, ["/?page=3"]);

    const button1 = screen.getByText("3");
    const button2 = screen.getByText("2");

    expect(button1.getAttribute("variant")).toBe("default");
    expect(button2.getAttribute("variant")).toBe("outline");

    fireEvent.click(button2);

    expect(button1.getAttribute("variant")).toBe("outline");
    expect(button2.getAttribute("variant")).toBe("default");
  });
});
