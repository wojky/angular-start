import { Routes } from "@angular/router";
import { Auth } from "./auth/auth";
import { ShellComponent } from "./features/shell.component";

export const routes: Routes = [
  {
    path: "auth",
    component: Auth,
  },
  {
    path: "",
    component: ShellComponent,
    loadChildren: () =>
      import("./features/features.routes").then((m) => m.routes),
  },
  {
    path: "**",
    redirectTo: "auth",
  },
];
