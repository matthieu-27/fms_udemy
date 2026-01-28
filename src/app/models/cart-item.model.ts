import { Course } from './course.model';

export class CartItem {
  course: Course;
  quantity: number;

  constructor(course: Course, quantity: number = 1) {
    this.course = course;
    this.quantity = quantity;
  }
}
