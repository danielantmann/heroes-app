import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "../hero/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb";
import { useSearchParams } from "react-router";
import { useSearchHero } from "@/heroes/hooks/useSearchHero";
import { HeroGrid } from "../hero/components/HeroGrid";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") ?? "";
  const strength = searchParams.get("strength") ?? "";

  const { data: heroes = [] } = useSearchHero(name, strength);

  return (
    <>
      <CustomJumbotron
        title="Search your superheroes"
        description="Discover, explore, and manage your favorite superheroes and villains"
      />

      <CustomBreadcrumb currentPage="Search" />
      <HeroStats />

      <SearchControls />
      <HeroGrid heroes={heroes} />
    </>
  );
};

export default SearchPage;
