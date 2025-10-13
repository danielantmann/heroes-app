import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "../hero/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb";

export const SearchPage = () => {
  return (
    <>
      <CustomJumbotron
        title="Search your superheroes"
        description="Discover, explore, and manage your favorite superheroes and villains"
      />

      <CustomBreadcrumb currentPage="Search" />
      <HeroStats />

      <SearchControls />
    </>
  );
};

export default SearchPage;
