import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import {
  FavoriteHeroContext,
  FavortiteHeroProvider,
} from "./FavortiteHeroContext";
import { use } from "react";
import type { Hero } from "../pages/hero/types/hero.interface";
import { beforeEach } from "node:test";

const mockHero = {
  id: "1",
  name: "batman",
} as Hero;
const TestComponent = () => {
  const { favorites, favoritesCount, isFavorite, toggleFavorite } =
    use(FavoriteHeroContext);

  return (
    <div>
      <div data-testid="favorite-count">{favoritesCount}</div>

      <div data-testid="favorite-list">
        {favorites.map((hero) => (
          <div key={hero.id} data-testid={`hero-${hero.id}`}>
            {hero.name}
          </div>
        ))}
      </div>

      <button
        data-testid="toggle-favorite"
        onClick={() => toggleFavorite(mockHero)}
      >
        Toggle Favorite
      </button>

      <div data-testid="is-favorite">{isFavorite(mockHero).toString()}</div>
    </div>
  );
};

const renderContextComponent = () => {
  return render(
    <FavortiteHeroProvider>
      <TestComponent></TestComponent>
    </FavortiteHeroProvider>
  );
};

describe("FavortiteHeroContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should initialize with default values", () => {
    renderContextComponent();
    screen.debug();
    expect(screen.getByTestId("favorite-count").textContent).toBe("0");
    expect(screen.getByTestId("favorite-list").children.length).toBe(0);
  });

  test("should add hero to favorites when toggleFavorites is called with new hero", () => {
    renderContextComponent();

    const button = screen.getByTestId("toggle-favorite");
    fireEvent.click(button);
    expect(screen.getByTestId("is-favorite").textContent).toBe("true");
    expect(screen.getByTestId("hero-1").textContent).toBe("batman");
    expect(screen.getByTestId("favorite-count").textContent).toBe("1");
    screen.debug();

    const localStorageFavorites = JSON.parse(
      localStorage.getItem("favorites")!
    );

    console.log(localStorageFavorites);
    expect(localStorageFavorites).toEqual([{ id: "1", name: "batman" }]);
  });

  test("should remove hero from favorites when toggleFavorites is called with an existed hero", () => {
    renderContextComponent();

    const button = screen.getByTestId("toggle-favorite");
    fireEvent.click(button);
    expect(screen.getByTestId("is-favorite").textContent).toBe("true");
    expect(screen.getByTestId("hero-1").textContent).toBe("batman");
    expect(screen.getByTestId("favorite-count").textContent).toBe("1");
    screen.debug();

    const localStorageFavorites = JSON.parse(
      localStorage.getItem("favorites")!
    );

    expect(localStorageFavorites).toEqual([{ id: "1", name: "batman" }]);

    fireEvent.click(button);
    console.log(localStorageFavorites);
    screen.debug();
    expect(screen.getByTestId("favorite-count").textContent).toBe("0");
    expect(screen.getByTestId("is-favorite").textContent).toBe("false");
    expect(screen.queryByTestId("hero-1")).toBeNull();
  });
});
