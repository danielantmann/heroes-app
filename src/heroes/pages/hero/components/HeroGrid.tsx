import { HeroGridCard } from "./HeroGridCard";
import type { Hero } from "../types/hero.interface";

interface Prop {
  heroes: Hero[];
}
export const HeroGrid = ({ heroes }: Prop) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
      {heroes.map((hero) => (
        <HeroGridCard key={hero.id} hero={hero} />
      ))}
    </div>
  );
};
