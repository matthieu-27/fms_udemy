import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, model, OnInit } from '@angular/core';
import { Course as CourseComponent } from '../course/course';
import { Course } from '../models/course.model';
import { CourseService } from '../services/course-service';
import { SearchBar } from './search-bar/search-bar';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseComponent, SearchBar],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseList implements OnInit {
  courses = model<Course[]>([]);
  searchStr = model('');

  // Calcul réactif des cours filtrés
  filteredCourses = computed(() => {
    const searchTerm = this.searchStr().trim().toLowerCase();
    const allCourses = this.courses();
    
    if (!searchTerm) {
      return allCourses;
    }

    return allCourses.filter(course =>
      course.name.toLowerCase().includes(searchTerm) ||
      course.description.toLowerCase().includes(searchTerm)
    );
  });

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.courseService.getCourses().subscribe((courses) => {
      this.courses.set(courses);
    });
  }

  // Méthode pour gérer les changements de recherche
  onSearchChange(newSearchTerm: string) {
    this.searchStr.set(newSearchTerm);
  }
}
