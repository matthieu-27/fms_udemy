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
}
