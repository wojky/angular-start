import { Component, computed, inject } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Character } from "./model/Character";
import { CharactersListService } from "./characters-list.service";
import { Router } from "@angular/router";
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { debounceTime, distinctUntilChanged, tap } from "rxjs";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";

@Component({
  selector: "app-characters-list",
  providers: [CharactersListService],
  imports: [
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  template: `
    <!-- <button (click)="navigate()">go to locations</button> -->
    <p>Alive count: {{ alive() }}</p>
    <form [formGroup]="filtersForm" class="pb-4">
      <input
        formControlName="name"
        placeholder="Enter name..."
        class="border-b border-black"
      />

      <mat-form-field>
        <mat-label>Gender:</mat-label>
        <mat-select formControlName="gender" name="gender">
          @for (option of genderOptions; track option.value) {
            <mat-option [value]="option.value">{{
              option.viewValue
            }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Status:</mat-label>
        <mat-select formControlName="status" name="status">
          @for (option of statusOptions; track option.value) {
            <mat-option [value]="option.value">{{
              option.viewValue
            }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
    </form>
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
  fb = inject(NonNullableFormBuilder);

  filtersForm = this.fb.group({
    name: this.fb.control("", [Validators.minLength(3)]),
    gender: this.fb.control<Character["gender"] | "">(""),
    status: this.fb.control<Character["status"] | "">(""),
  });

  genderOptions: { value: Character["gender"] | ""; viewValue: string }[] = [
    {
      value: "",
      viewValue: "-",
    },
    {
      value: "Female",
      viewValue: "Female",
    },
    {
      value: "Male",
      viewValue: "Male",
    },
    {
      value: "Genderless",
      viewValue: "Genderless",
    },
  ];

  statusOptions: { value: Character["status"] | ""; viewValue: string }[] = [
    {
      value: "",
      viewValue: "-",
    },
    {
      value: "Alive",
      viewValue: "Alive",
    },
    {
      value: "Dead",
      viewValue: "Dead",
    },
    {
      value: "unknown",
      viewValue: "Unknown",
    },
  ];

  service = inject(CharactersListService);
  router = inject(Router);
  characters = this.service.characters;

  alive = computed(() => {
    const characters = this.characters();

    if (!characters) {
      return null;
    }

    return characters.filter((character) => character.status === "Alive")
      .length;
  });

  ngOnInit() {
    this.filtersForm.valueChanges
      .pipe(
        debounceTime(400),
        // distinctUntilChanged((prev, curr) => {
        //   return prev.name === curr.name;
        // }),
      )
      .subscribe((value) => {
        console.log(this.filtersForm.controls.name);

        if (this.filtersForm.controls.name.invalid) {
          return;
        }

        this.service.updateParams({
          name: value.name,
          gender: value.gender,
          status: value.status,
        });
      });
  }

  navigate() {
    this.router.navigate(["/locations"]);
  }

  markAsDead(character: Character) {
    this.service.markAsDead(character);
  }
}
