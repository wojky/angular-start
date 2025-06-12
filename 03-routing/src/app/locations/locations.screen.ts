import { Component } from "@angular/core";
import { LocationsList } from "./locations-list/locations-list";

@Component({
  selector: "app-locations-screen",
  imports: [LocationsList],
  template: ` <app-locations-list /> `,
  styles: ``,
})
export class LocationsScreen {}
