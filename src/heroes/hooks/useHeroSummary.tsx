import { getSummary } from "../actions/get-summary.actions";
import { useQuery } from "@tanstack/react-query";

export const useHeroSummary = () => {
  return useQuery({
    queryKey: ["summary-information"],
    queryFn: () => getSummary(),
    staleTime: 1000 * 60 * 5,
  });
};
