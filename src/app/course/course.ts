import { CourseService } from '@/services/course-service';
import { UserService } from '@/services/user-service';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardCardComponent } from '@/shared/components/card';
import { ZardDialogService } from '@/shared/components/dialog';
import { ZardIconComponent } from '@/shared/components/icon';
import { CurrencyPipe } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { toast } from 'ngx-sonner';
import { Course as CourseModel, iCourseForm } from '../models/course.model';
import { CartService } from '../services/cart-service';
import { EditDialog } from './edit-dialog/edit-dialog';

@Component({
  selector: 'app-course',
  imports: [CurrencyPipe, ZardButtonComponent, ZardIconComponent, ZardCardComponent],
  templateUrl: './course.html',
  styleUrl: './course.css',
})
export class Course {
  @Input() course!: CourseModel;
  isBigBoss = signal(false);
  private dialogService = inject(ZardDialogService);

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private courseService: CourseService,
  ) {
    this.userService.isBigBoss() ? this.isBigBoss.set(true) : null;
  }

  // Méthode pour ajouter au panier
  addToCart() {
    this.cartService.addToCart(this.course);
    toast.success(`Cours ajouté au panier !`, {
      description: `Le cours en ligne ${this.course.name} a bien été ajouté au panier`,
    });
  }

  openDialog() {
    this.dialogService.create({
      zTitle: 'Editer la formation',
      zDescription: 'Faites les changements dans ce formulaire et cliquer sur sauvegarder.',
      zContent: EditDialog,
      zData: {
        id: this.course.id,
        name: this.course.name,
        description: this.course.description,
        price: this.course.price,
        category: this.course.category,
      } as iCourseForm,
      zOkText: 'Sauvegarder',
      zOnOk: (instance) => {
        (o: iCourseForm) => {
          this.courseService.updateCourse(o).subscribe((e) => {
            if (e) {
              toast.success('GG !!');
            }
          });
        };
      },
      zWidth: '425px',
    });
  }
}
