import { effect, inject, Injectable, signal } from "@angular/core";
import { delay } from "rxjs";
import { CharacterResponse } from "./model/CharacterResponse";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { Character } from "./model/Character";

type CharacterListParams = {
  name: string;
  page: number;
  gender: Character["gender"] | "";
  status: Character["status"] | "";
  type: string;
  species: string;
};

@Injectable()
export class CharactersListService {
  private http = inject(HttpClient);

  #characters = signal<Character[]>([]);

  #params = signal<CharacterListParams>({
    page: 1,
    gender: "",
    status: "",
    type: "",
    species: "",
    name: "",
  });

  e = effect(() => {
    this.getAll(this.#params()).subscribe({
      next: (response) => {
        this.#characters.set(response.results);
      },
      error: (err: HttpErrorResponse) => {
        // todo
      },
    });
  });

  getAll(params: CharacterListParams) {
    return this.http
      .get<CharacterResponse>("https://rickandmortyapi.com/api/character", {
        params: new HttpParams({ fromObject: params }),
      })
      .pipe(delay(1500));
  }

  characters = this.#characters.asReadonly();
  params = this.#params.asReadonly();

  updateParams(params: Partial<CharacterListParams>) {
    this.#params.update((p) => {
      return {
        ...p,
        ...params,
      };
    });
  }

  markAsDead(character: Character) {
    this.#characters.update((value) => {
      return value.map((c) => {
        if (c.id === character.id) {
          return { ...c, status: "Dead" };
        } else {
          return c;
        }
      });
    });
  }
}
