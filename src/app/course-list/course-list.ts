import { ZardLoaderComponent } from '@/shared/components/loader';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, model } from '@angular/core';
import { Course as CourseComponent } from '../course/course';
import { Course } from '../models/course.model';
import { CourseService } from '../services/course-service';
import { SearchBar } from './search-bar/search-bar';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseComponent, SearchBar, ZardLoaderComponent],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseList {
  courses = model<Course[]>([]);
  searchStr = model('');
  selectedCategory = model('all');
  maxPrice = model<number | null>(null);

  // Calcul réactif des cours filtrés
  filteredCourses = computed(() => {
    const searchTerm = this.searchStr().trim().toLowerCase();
    const category = this.selectedCategory();
    const maxPriceValue = this.maxPrice();
    const allCourses = this.courses();

    return allCourses.filter((course) => {
      // Filtre par recherche texte
      const matchesSearch =
        !searchTerm ||
        course.name.toLowerCase().includes(searchTerm) ||
        course.description.toLowerCase().includes(searchTerm);

      // Filtre par catégorie
      const matchesCategory = category === 'all' || course.category === category;

      // Filtre par prix maximum
      const matchesPrice = maxPriceValue === null || course.price <= maxPriceValue;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  });

  constructor(private courseService: CourseService) {
    this.courseService.getCourses().subscribe((courses) => {
      this.courses.set(courses);
    });
  }

  // Méthodes pour gérer les changements de filtres
  onCategoryChange(category: string) {
    this.selectedCategory.set(category);
  }

  onMaxPriceChange(maxPrice: number | null) {
    this.maxPrice.set(maxPrice);
  }

  // Méthode pour gérer les changements de recherche
  onSearchChange(newSearchTerm: string) {
    this.searchStr.set(newSearchTerm);
  }
}
