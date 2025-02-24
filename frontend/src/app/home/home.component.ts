import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports:[CommonModule]
})
export class HomeComponent implements OnInit, OnChanges {
  @Input() searchQuery: string = ''; // Receive search query from AppComponent
  @Input() filters: { category: string; priceRange: string; ratings: string[] } = {
    category: '',
    priceRange: '',
    ratings: [],
  };

  filteredProducts: any[] = [];
  allProducts: any[] = [];
  message: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAllProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchQuery'] || changes['filters']) {
      this.performSearchAndFilter();
    }
  }

  /**
   * Fetch all products from backend API
   */
  fetchAllProducts(): void {
    this.http.get<any[]>('http://localhost:5000/api/products').subscribe({
      next: (data) => {
        this.allProducts = data;
        this.performSearchAndFilter();
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.message = 'Error loading products.';
      },
    });
  }

  /**
   * Perform combined filtering based on search query and filters
   */
  performSearchAndFilter(): void {
    console.log('performSearchAndFilter called');
    let results = [...this.allProducts];

    // Apply category filter
    if (this.filters.category) {
      results = results.filter(
        (product) =>
          product.category.toLowerCase() === this.filters.category.toLowerCase()
      );
    }

    // Apply price range filter
    if (this.filters.priceRange) {
      const [min, max] = this.filters.priceRange.split('-').map(Number);
      results = results.filter((product) => product.price >= min && product.price <= max);
    }

    // Apply rating filter
    if (this.filters.ratings.length) {
      results = results.filter((product) =>
        this.filters.ratings.includes(product.rating.toString())
      );
    }

    // Apply search query filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      results = results.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          (product.description?.toLowerCase().includes(query) || false) ||
          product.price.toString().includes(query)
      );
    }
    console.log('Results:', results); 
    this.filteredProducts = results;

    this.message = results.length ? '' : 'No matching products found.';
  }
}
