import { HttpClient, httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private dataUrl = 'http://localhost:3000/courses';
  courses = httpResource(() => `${this.dataUrl}`);

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.dataUrl);
  }
}
