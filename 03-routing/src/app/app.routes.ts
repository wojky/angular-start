import { Routes } from "@angular/router";
import { CharactersList } from "./characters-list/characters-list";

export const routes: Routes = [
  {
    path: "characters",
    component: CharactersList,
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
