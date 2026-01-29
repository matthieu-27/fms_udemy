import { Component, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.searchStr.set(value);
    this.searchStrChange.emit(value);
  }

  clearSearch() {
    this.searchStr.set('');
    this.searchStrChange.emit('');
  }
}
