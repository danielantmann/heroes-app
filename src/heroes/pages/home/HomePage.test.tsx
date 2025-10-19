import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { HomePage } from "./HomePage";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavortiteHeroProvider } from "@/heroes/context/FavortiteHeroContext";

vi.mock("@/heroes/hooks/usePaginatedHero");

const mockedPaginatedHero = vi.mocked(usePaginatedHero);

mockedPaginatedHero.mockReturnValue({
  data: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
} as unknown as ReturnType<typeof usePaginatedHero>);

const queryClient = new QueryClient();

const renderHomePage = (initialEntries: string[] = ["/"]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <FavortiteHeroProvider>
        <QueryClientProvider client={queryClient}>
          <HomePage />
        </QueryClientProvider>
      </FavortiteHeroProvider>
    </MemoryRouter>
  );
};

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should render HomePage with default values", () => {
    const { container } = renderHomePage();
    expect(container).toMatchSnapshot();
  });

  test("should call usePaginatedHero with default values", () => {
    renderHomePage();
    expect(mockedPaginatedHero).toHaveBeenCalledWith(1, 6, "all");
  });

  test("should call usePaginatedHero with custom query params", () => {
    renderHomePage(["/?page=2&limit=10&category=villains"]);
    expect(mockedPaginatedHero).toHaveBeenCalledWith(2, 10, "villains");
  });

  test("should XXX", () => {
    renderHomePage(["?/tab=favorites?page=2&limit=10"]);
    const [, , , villainsTab] = screen.getAllByRole("tab");
    screen.debug(villainsTab);
    fireEvent.click(villainsTab);
    expect(mockedPaginatedHero).toHaveBeenCalledWith(1, 10, "villain");
  });
});
