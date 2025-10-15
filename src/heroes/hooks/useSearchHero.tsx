import { useQuery } from "@tanstack/react-query";
import { searhHeroAction } from "../actions/search-heroes.action";

export const useSearchHero = (name: string, strength: string) => {
  return useQuery({
    queryKey: [
      "search-heroes",
      {
        name: name,
        strength: strength,
      },
    ],
    queryFn: () => searhHeroAction({ name, strength }),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
