import { Course as CourseModel } from '@/models/course.model';
import { CourseService } from '@/services/course-service';
import { UserService } from '@/services/user-service';
import { Component, inject, model, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  imports: [],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage {
  private activatedRoute = inject(ActivatedRoute);
  isAdmin = signal(false);
  course = model<CourseModel>();
  id = 0;

  constructor(
    private userService: UserService,
    private courseService: CourseService,
  ) {
    this.isAdmin.set(this.userService.isBigBoss());
    this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id']; // permet d'avoir type number
    });
    this.courseService.getCourseById(this.id).subscribe((course) => {
      this.course.set(course);
    });
  }
}
