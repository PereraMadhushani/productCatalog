import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css'],
  imports: [FormsModule, CommonModule],
})
export class SidePanelComponent {
  @Output() filtersChanged = new EventEmitter<{
    category: string;
    priceRange: string;
    ratings: string[];
  }>();

  menus = [
    {
      title: 'Category',
      items: [
        { label: 'Laptop', checked: false },
        { label: 'Phones', checked: false },
        { label: 'Tablet', checked: false },
        { label: 'Desktop', checked: false },
        { label: 'Others', checked: false },
      ],
    },
    {
      title: 'Price Range',
      items: [
        { label: '20000-40000', checked: false },
        { label: '40000-60000', checked: false },
        { label: '60000-80000', checked: false },
        { label: '80000-100000', checked: false },
      ],
    },
    {
      title: 'Rating',
      items: [
        { label: '1.0', checked: false },
        { label: '2.0', checked: false },
        { label: '3.0', checked: false },
        { label: '4.0', checked: false },
        { label: '5.0', checked: false },
      ],
    },
  ];

  onCheckboxChange(): void {
    // Ensure only one item is selected in each menu section
    this.menus.forEach((menu) => {
      const selectedItems = menu.items.filter((item) => item.checked);

      if (selectedItems.length > 1) {
        menu.items.forEach((item) => {
          if (!selectedItems.includes(item)) {
            item.checked = false; // Uncheck other items
          }
        });
      }
    });

    // Gather the selected filters
    const selectedCategory = this.menus[0].items.find((item) => item.checked)?.label || '';
    const selectedPriceRange = this.menus[1].items.find((item) => item.checked)?.label || '';
    const selectedRatings = this.menus[2].items
      .filter((item) => item.checked)
      .map((item) => item.label);

    // Emit the selected filters
    this.filtersChanged.emit({
      category: selectedCategory,
      priceRange: selectedPriceRange,
      ratings: selectedRatings,
    });
  }
}
