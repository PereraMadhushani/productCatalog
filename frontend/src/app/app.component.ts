import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { SidePanelComponent } from "./side-panel/side-panel.component";
import { HomeComponent } from "./home/home.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { SignupComponent } from "./auth/signup/signup.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [HeaderComponent, SidePanelComponent, HomeComponent],
})
export class AppComponent {
  searchQuery: string = ''; // Bind search query here
  filters: { category: string; priceRange: string; ratings: string[] } = {
    category: '',
    priceRange: '',
    ratings: [],
  };

  /**
   * Handle search query emitted from HeaderComponent
   */
  onSearchQueryChange(query: string): void {
    this.searchQuery = query;
  }

  /**
   * Handle filters emitted from SidePanelComponent
   */
  onFiltersChange(filters: { category: string; priceRange: string; ratings: string[] }): void {
    this.filters = filters;
  }
}
