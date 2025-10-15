import { describe, expect, test } from "vitest";
import { getHeroesByPageAction } from "./get-heroes-by-page.action";
import AxiosMockAdapter from "axios-mock-adapter";
import { heroApi } from "../api/hero.api";
import { beforeEach } from "node:test";

const BASE_URL = import.meta.env.VITE_API_URL;

describe("getHeroByPageAction", () => {
  const heroesApiMock = new AxiosMockAdapter(heroApi);

  beforeEach(() => {
    heroesApiMock.reset();
  });

  test("should return default heroes", async () => {
    heroesApiMock.onGet("/").reply(200, {
      total: 10,
      pages: 2,
      heroes: [
        {
          image: "1.jpg",
        },
        {
          image: "1.jpg",
        },
      ],
    });
    const result = await getHeroesByPageAction(1);
    expect(result).toStrictEqual({
      total: 10,
      pages: 2,
      heroes: [
        { image: `${BASE_URL}/images/1.jpg` },
        { image: `${BASE_URL}/images/1.jpg` },
      ],
    });
  });

  test("should return the correct heroes when page is not a number", async () => {
    const responseObject = {
      total: 10,
      pages: 1,
      heroes: [],
    };

    heroesApiMock.onGet("/").reply(200, responseObject);
    heroesApiMock.resetHistory();

    await getHeroesByPageAction("abc" as unknown as number);
    const params = heroesApiMock.history.get[0].params;

    expect(params).toStrictEqual({ limit: 6, offset: 0, category: "all" });
  });

  test("should return the correct heroes when page is a string number", async () => {
    const responseObject = {
      total: 10,
      pages: 1,
      heroes: [],
    };

    heroesApiMock.onGet("/").reply(200, responseObject);
    heroesApiMock.resetHistory();

    await getHeroesByPageAction("1" as unknown as number);
    const params = heroesApiMock.history.get[0].params;

    expect(params).toStrictEqual({ limit: 6, offset: 0, category: "all" });
  });

  test("should call the api with correct params", async () => {
    const responseObject = {
      total: 10,
      pages: 1,
      heroes: [],
    };

    heroesApiMock.onGet("/").reply(200, responseObject);
    heroesApiMock.resetHistory();

    await getHeroesByPageAction(2, 10, "heroes");
    const params = heroesApiMock.history.get[0].params;

    expect(params).toStrictEqual({ limit: 10, offset: 10, category: "heroes" });
  });
});
