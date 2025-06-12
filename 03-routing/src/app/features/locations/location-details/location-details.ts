import { Component, input } from "@angular/core";

@Component({
  selector: "app-location-details",
  imports: [],
  template: ` <p>location-details works! {{ id() }} {{ name() }}</p> `,
  styles: ``,
})
export class LocationDetails {
  id = input();
  name = input();

  ngOnInit() {
    // todo: kiedy sie odpala
  }

  ngOnDestroy() {
    console.log("destroyed");
  }
}
