import { RouterProvider } from "react-router";
import { appRouter } from "./router/app.router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FavortiteHeroProvider } from "./heroes/context/FavortiteHeroContext";

const queryClient = new QueryClient();

export const HeroesApp = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <FavortiteHeroProvider>
          <RouterProvider router={appRouter} />

          <ReactQueryDevtools initialIsOpen={false} />
        </FavortiteHeroProvider>
      </QueryClientProvider>
    </>
  );
};
