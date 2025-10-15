import { heroApi } from "../api/hero.api";
import type { Hero } from "../pages/hero/types/hero.interface";

const BASE_URL = import.meta.env.VITE_API_URL;

interface Options {
  name?: string;
  team?: string;
  category?: string;
  universe?: string;
  status?: string;
  strength?: string;
}

export const searhHeroAction = async (options: Options = {}) => {
  const { category, name, status, strength, team, universe } = options;

  if (!name && !category && !status && !strength && !team && !universe) {
    return [];
  }
  const { data } = await heroApi.get<Hero[]>("/search", {
    params: {
      name,
      team,
      category,
      universe,
      status,
      strength,
    },
  });

  return data.map((hero) => ({
    ...hero,
    image: `${BASE_URL}/images/${hero.image}`,
  }));
};
