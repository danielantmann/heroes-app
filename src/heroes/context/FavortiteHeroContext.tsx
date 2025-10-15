import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { Hero } from "../pages/hero/types/hero.interface";
import { HeroArraySchema } from "../pages/hero/schema/hero.schema";

interface FavoriteHeroContext {
  favorites: Hero[];
  favoritesCount: number;

  toggleFavorite: (hero: Hero) => void;
  isFavorite: (hero: Hero) => boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);

const getFavoritesFromLocalStorage = (): Hero[] => {
  try {
    const raw = localStorage.getItem("favorites");
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    const result = HeroArraySchema.safeParse(parsed);

    if (!result.success) {
      console.warn("Datos inválidos en localStorage:", result.error.format());
      return [];
    }

    return result.data;
  } catch (error) {
    console.error("Error al leer favoritos del localStorage:", error);
    return [];
  }
};

export const FavortiteHeroProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Hero[]>(
    getFavoritesFromLocalStorage()
  );

  const toggleFavorite = (hero: Hero) => {
    const heroExist = favorites.find((h) => h.id === hero.id);

    if (heroExist) {
      const newFavorites = favorites.filter((h) => h.id !== hero.id);
      setFavorites(newFavorites);
      return;
    }

    setFavorites([...favorites, hero]);
  };

  const isFavorite = (hero: Hero) => {
    return favorites.some((h) => h.id === hero.id);
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoriteHeroContext
      value={{
        favoritesCount: favorites.length,
        favorites: favorites,
        isFavorite: isFavorite,
        toggleFavorite: toggleFavorite,
      }}
    >
      {children}
    </FavoriteHeroContext>
  );
};
