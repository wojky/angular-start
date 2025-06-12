import { Component } from "@angular/core";
import { CharactersList } from "./characters-list/characters-list";

@Component({
  selector: "app-root",
  imports: [CharactersList],
  template: ` <app-characters-list /> `,
  styles: [``],
})
export class App {}
