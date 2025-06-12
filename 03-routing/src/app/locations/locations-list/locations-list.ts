import { Component, inject } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { LocationsListService } from "./locations-list.service";

@Component({
  selector: "app-locations-list",
  providers: [LocationsListService],
  imports: [MatProgressSpinnerModule],
  template: `
    @if (locations().length) {
      @for (location of locations(); track location.id) {
        <div class="flex gap-2 items-center">
          <p>{{ location.name }}</p>
        </div>
      }
    } @else {
      <mat-spinner [diameter]="20" />
    }
  `,
})
export class LocationsList {
  service = inject(LocationsListService);
  locations = this.service.locations;
}
