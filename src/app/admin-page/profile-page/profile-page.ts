import { Course as CourseModel } from '@/models/course.model';
import { CourseService } from '@/services/course-service';
import { UserService } from '@/services/user-service';
import { Component, inject, input, signal } from '@angular/core';
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
  course = input.required<CourseModel>();

  constructor(
    private userService: UserService,
    private courseService: CourseService,
  ) {
    this.isAdmin.set(this.userService.isBigBoss());

    console.log(this.activatedRoute);
  }
}
