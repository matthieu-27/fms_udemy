import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Course as CourseComponent } from '../course/course';
import { Course } from '../models/course.model';
import { CourseService } from '../services/course-service';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseComponent],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  courses: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.courseService.getCourses().subscribe((courses) => {
      this.courses = courses;
    });
  }
}
