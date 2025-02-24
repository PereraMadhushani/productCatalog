import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
})
export class HeaderComponent{  @Output() searchQueryChange = new EventEmitter<string>();
searchQuery: string = '';

onSearch(): void {
  this.searchQueryChange.emit(this.searchQuery);
}
}