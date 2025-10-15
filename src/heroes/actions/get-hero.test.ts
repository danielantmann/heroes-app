import { test, describe, expect } from "vitest";
import { getHero } from "./get-hero";

describe("getHero", () => {
  const resultMatch = {
    id: "1",
    name: "Clark Kent",
    slug: "clark-kent",
    alias: "Superman",
    powers: [
      "Súper fuerza",
      "Vuelo",
      "Visión de calor",
      "Visión de rayos X",
      "Invulnerabilidad",
      "Súper velocidad",
    ],
    description:
      "El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
    strength: 10,
    intelligence: 8,
    speed: 9,
    durability: 10,
    team: "Liga de la Justicia",
    image: "http://localhost:3001/images/1.jpeg",
    firstAppearance: "1938",
    status: "Active",
    category: "Hero",
    universe: "DC",
  };
  test("sohuld fetch hero data and return with complete image url", async () => {
    const result = await getHero("clark-kent");

    expect(result).toStrictEqual(resultMatch);
    expect(result.image).toStrictEqual("http://localhost:3001/images/1.jpeg");
  });

  test("should thrown an error if hero is not found", async () => {
    const result = await getHero("clark-kenttt").catch((error) => {
      expect(error).toBeDefined();
      expect(error.message).toStrictEqual(
        "Request failed with status code 404"
      );
    });
    expect(result).toBeUndefined();
  });
});
