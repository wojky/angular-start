import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { FirstComponent } from "./first.component";

@Component({
  selector: "app-root",
  imports: [MatIconModule, FirstComponent],
  // templateUrl: "./app.html",
  template: `
    <h1 class="text-3xl font-bold">
      <mat-icon fontIcon="emoji_people"></mat-icon>
      {{ title }}
    </h1>
    <app-first [text]="firstCmpText" />

    <button (click)="toggle()">Toggle</button>
    @if (showSecondFirst) {
    <app-first />
    } @else { ... }
  `,
  styles: [
    `
      /* style sa enkapsulowane dla danego komponentu */
      h1 {
        color: peru;
      }
    `,
  ],
})
export class App {
  title = " Hello world!!!!!";

  showSecondFirst = false;

  firstCmpText = "Different...";

  toggle() {
    this.showSecondFirst = !this.showSecondFirst;
  }

  getTitle() {
    return "Hello universe";
  }
}
