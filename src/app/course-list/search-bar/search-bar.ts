import { Component, Input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Course } from '../../models/course.model';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  searchStr = model('');
  searchStrChange = output<string>();

  // todo : trouver le moyen d'utiliser un signal pour filteredCourses
  @Input() filteredCourses: Course[] = [];

  // Nouveaux outputs pour les filtres
  categoryChange = output<string>();
  maxPriceChange = output<number | null>();

  constructor(private cartService: CartService) {}

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.searchStr.set(value);
    this.searchStrChange.emit(value);
  }

  // Méthode pour gérer le changement de catégorie
  onCategoryChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.categoryChange.emit(select.value);
  }

  // Méthode pour gérer le changement de prix maximum
  onMaxPriceChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.maxPriceChange.emit(value ? parseFloat(value) : null);
  }

  clearSearch() {
    this.searchStr.set('');
    this.searchStrChange.emit('');
  }

  // Méthode pour ajouter toutes les formations filtrées au panier
  addAllToCart() {
    if (this.filteredCourses.length === 0) {
      alert('Aucune formation trouvée à ajouter au panier.');
      return;
    }

    this.filteredCourses.forEach((course) => {
      this.cartService.addToCart(course);
    });

    alert(`${this.filteredCourses.length} formation(s) ajoutée(s) au panier !`);
  }
}
