import { useQuery } from "@tanstack/react-query";
import { getHero } from "../actions/get-hero";

export const useGetHero = (idSlug: string) => {
  return useQuery({
    queryKey: ["hero", { idSlug: idSlug }],
    queryFn: () => getHero(idSlug),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
