import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "characters",
    loadComponent: () =>
      import("./characters-list/characters-list").then((m) => m.CharactersList),
  },
  {
    path: "locations",
    loadComponent: () =>
      import("./locations/locations.screen").then((m) => m.LocationsScreen),
  },
  {
    path: "**",
    redirectTo: "characters",
  },
];
