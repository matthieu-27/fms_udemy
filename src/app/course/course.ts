import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Course as CourseModel } from '../models/course.model';

@Component({
  selector: 'app-course',
  imports: [CurrencyPipe],
  templateUrl: './course.html',
  styleUrl: './course.css',
})
export class Course {
  @Input() course!: CourseModel;

  // Méthode placeholder pour ajouter au panier
  addToCart() {
    alert(`Cours "${this.course.name}" ajouté au panier (placeholder)`);
    console.log('Cours ajouté au panier:', this.course);
  }
}
