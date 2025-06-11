import { HttpClient } from "@angular/common/http";
import { Component, computed, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { delay } from "rxjs";

export type CharacterResponse = {
  info: {};
  results: {
    id: number;
    name: string;
    image: string;
    status: "Alive" | "Dead" | "unknown";
  }[];
};

@Component({
  selector: "app-characters-list",
  imports: [],
  template: `
    @let characterRes = characters();
    <p>Alive count: {{ alive() }}</p>
    <!--  -->
    @if (characterRes) { @for (character of characterRes.results; track
    character.id) {
    <div class="flex gap-2">
      <img class="h-24" [src]="character.image" />
      <p>{{ character.name }}</p>
    </div>
    } } @else {
    <p>Loading...</p>
    }
  `,
  styles: ``,
})
export class CharactersList {
  http = inject(HttpClient);

  characters = toSignal(
    this.http
      .get<CharacterResponse>("https://rickandmortyapi.com/api/character")
      .pipe(delay(2000))
  );

  alive = computed(() => {
    const characters = this.characters();

    if (!characters) {
      return null;
    }

    return characters.results.filter(
      (character) => character.status === "Alive"
    ).length;
  });

  isReady = computed(() => {
    return Boolean(this.alive());
  });

  // constructor() {
  //   this.http
  //     .get("https://rickandmortyapi.com/api/character")
  //     .subscribe((response) => {
  //       this.characters.set(response);
  //       console.log(response);
  //     });
  // }
}
