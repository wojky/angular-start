import { Component, computed, inject } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Character } from "./model/Character";
import { CharactersListService } from "./characters-list.service";

@Component({
  selector: "app-characters-list",
  providers: [CharactersListService],
  imports: [MatProgressSpinnerModule],
  template: `
    <p>Alive count: {{ alive() }}</p>
    @if (characters().length) {
      @for (character of characters(); track character.id) {
        <div class="flex gap-2 items-center">
          <img class="h-16" [src]="character.image" />
          <p>{{ character.name }}</p>

          @if (character.status === "Alive") {
            <button class="bg-green-500 h-fit" (click)="markAsDead(character)">
              Mark as dead
            </button>
          }
        </div>
      }
    } @else {
      <mat-spinner [diameter]="20" />
    }
  `,
})
export class CharactersList {
  service = inject(CharactersListService);
  characters = this.service.characters;

  alive = computed(() => {
    const characters = this.characters();

    if (!characters) {
      return null;
    }

    return characters.filter((character) => character.status === "Alive")
      .length;
  });

  markAsDead(character: Character) {
    this.service.markAsDead(character);
  }
}
