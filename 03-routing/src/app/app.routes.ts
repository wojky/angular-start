import { Routes } from "@angular/router";
import { CharactersList } from "./characters-list/characters-list";
import { LocationsScreen } from "./locations/locations.screen";

export const routes: Routes = [
  {
    path: "characters",
    component: CharactersList,
  },
  {
    path: "locations",
    component: LocationsScreen,
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "characters",
  },
  {
    path: "**",
    redirectTo: "characters",
  },
];
