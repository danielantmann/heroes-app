import { describe, expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useHeroSummary } from "./useHeroSummary";
import type { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getSummary } from "../actions/get-summary.actions";
import type { SummaryInformationResponse } from "../pages/hero/types/summary-information.response";

vi.mock("../actions/get-summary.actions", () => ({
  getSummary: vi.fn(),
}));

const mockGetSummaryAction = vi.mocked(getSummary);

const tanStackCustomProvider = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useHeroSummary", () => {
  test("sohuld return the initial state(is loading", () => {
    const { result } = renderHook(() => useHeroSummary(), {
      wrapper: tanStackCustomProvider(),
    });
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBe(undefined);
  });

  test("should return success state with data when API call succeds", async () => {
    const mockSummaryData = {
      totalHeroes: 10,
      strongestHero: {
        id: "1",
        name: "Superman",
      },
      smartestHero: {
        id: "2",
        name: "Batman",
      },
      heroCount: 18,
      villainCount: 7,
    } as SummaryInformationResponse;

    mockGetSummaryAction.mockResolvedValue(mockSummaryData);

    const { result } = renderHook(() => useHeroSummary(), {
      wrapper: tanStackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.isError).toBe(false);
    expect(result.current.isSuccess).toBe(true);
  });

  test("should return error state when API calls fails", async () => {
    const mockError = new Error("Failed to fetch summary");
    mockGetSummaryAction.mockRejectedValue(mockError);

    const { result } = renderHook(() => useHeroSummary(), {
      wrapper: tanStackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.status).toStrictEqual("error");
    expect(result.current.isSuccess).toStrictEqual(false);
    expect(mockGetSummaryAction).toHaveBeenCalled();
    expect(result.current.error?.message).toBe("Failed to fetch summary");
  });
});
