import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private dataUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.dataUrl);
  }

  addCourse(course: Course) {
    return this.http.post<Course>(this.dataUrl, course);
  }

  getCourseById(id: number) {
    return this.http.get<Course>(this.dataUrl + '/' + id);
  }

  updateCourse(course: Course) {
    return this.http.put<Course>(this.dataUrl + '/' + course.id, course);
  }

  deleteCourseById(id: number) {
    return this.http.delete<Course>(this.dataUrl + '/' + id, { observe: 'response' });
  }
}
