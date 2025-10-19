import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { usePaginatedHero } from "./usePaginatedHero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { getHeroesByPageAction } from "../actions/get-heroes-by-page.action";
import { beforeEach } from "node:test";

vi.mock("../actions/get-heroes-by-page.action", () => ({
  getHeroesByPageAction: vi.fn(),
}));

const mockHeroByPAgeAction = vi.mocked(getHeroesByPageAction);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const tanStackCustomProvider = () => {
  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("usePaginatedHero", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  test("sohuld return the initial state(is loading", () => {
    const { result } = renderHook(() => usePaginatedHero(1, 6), {
      wrapper: tanStackCustomProvider(),
    });
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBe(undefined);
  });

  test("should return succes state when API secces", async () => {
    const mockHeroData = {
      total: 20,
      pages: 4,
      heroes: [],
    };

    mockHeroByPAgeAction.mockResolvedValue(mockHeroData);

    const { result } = renderHook(() => usePaginatedHero(1, 6), {
      wrapper: tanStackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.isError).toBe(false);
    expect(result.current.isSuccess).toBe(true);
    expect(mockHeroByPAgeAction).toHaveBeenCalled();
    expect(mockHeroByPAgeAction).toHaveBeenCalledWith(1, 6, "all");
  });

  test("should call getHeroByPAge with arguments", async () => {
    const mockHeroData = {
      total: 20,
      pages: 4,
      heroes: [],
    };

    mockHeroByPAgeAction.mockResolvedValue(mockHeroData);

    const { result } = renderHook(() => usePaginatedHero(1, 6, "heroes"), {
      wrapper: tanStackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.isError).toBe(false);
    expect(result.current.isSuccess).toBe(true);
    expect(mockHeroByPAgeAction).toHaveBeenCalled();
    expect(mockHeroByPAgeAction).toHaveBeenCalledWith(1, 6, "heroes");
  });
});
