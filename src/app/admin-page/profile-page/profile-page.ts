import { Course as CourseModel } from '@/models/course.model';
import { CourseService } from '@/services/course-service';
import { UserService } from '@/services/user-service';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardCardComponent } from '@/shared/components/card';
import { ZardFormImports } from '@/shared/components/form/form.imports';
import { ZardIconComponent } from '@/shared/components/icon';
import { ZardInputDirective } from '@/shared/components/input';
import { ZardSelectImports } from '@/shared/components/select';
import { Component, inject, model, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-profile-page',
  imports: [
    ReactiveFormsModule,
    ZardFormImports,
    ZardInputDirective,
    ZardButtonComponent,
    ZardCardComponent,
    ZardSelectImports,
    ZardIconComponent,
  ],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage {
  private activatedRoute = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  isAdmin = signal(false);
  course = model<CourseModel>();
  id = 0;
  isEditing = signal(false);
  isSubmitting = signal(false);
  isCreating = signal(false);
  // <z-select-item zValue="all">Toutes les catégories</z-select-item>
  // <z-select-item zValue="Développement Web">Développement Web</z-select-item>
  // <z-select-item zValue="Développement Mobile">Développement Mobile</z-select-item>
  // <z-select-item zValue="Data Science & IA">Data Science & IA</z-select-item>
  // <z-select-item zValue="Cloud & DevOps">Cloud & DevOps</z-select-item>
  // <z-select-item zValue="Langages de Programmation">Langages de Programmation</z-select-item>
  // <z-select-item zValue="Cybersécurité">Cybersécurité</z-select-item>
  // <z-select-item zValue="Bases de Données & Algorithmes"
  //   >Bases de Données & Algorithmes</z-select-item
  // >
  // <z-select-item zValue="Autres">Autres</z-select-item>
  categories = [
    'Développement Web',
    'Développement Mobile',
    'Data Science & IA',
    'Cloud & DevOps',
    'Langages de Programmation',
    'Cybersécurité',
    'Bases de Données & Algorithmes ',
    'Autres',
  ];
  selectedCategory = '';

  courseForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    price: [0, [Validators.required, Validators.min(0)]],
    category: ['Autre', Validators.required],
  });

  constructor(
    private userService: UserService,
    private courseService: CourseService,
    public router: Router,
  ) {
    this.isAdmin.set(this.userService.isBigBoss());
    this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id']; // permet d'avoir type number
      this.determineMode();
    });
  }

  determineMode() {
    if (this.id === 0) {
      // Mode création (URL: /adminpage sans ID)
      this.isCreating.set(true);
      this.isEditing.set(true);
    } else {
      // Mode modification (URL: /adminpage/:id)
      this.isCreating.set(false);
      this.loadCourse();
    }
  }

  loadCourse() {
    this.courseService.getCourseById(this.id).subscribe((course) => {
      this.course.set(course);
      this.initializeForm();
    });
  }

  // Méthode pour gérer le changement de catégorie
  onCategoryChange() {}

  initializeForm() {
    if (this.course()) {
      this.courseForm.patchValue({
        name: this.course()?.name || '',
        description: this.course()?.description || '',
        price: this.course()?.price || 0,
        category: this.course()?.category || 'Autre',
      });
    }
  }

  toggleEdit() {
    this.isEditing.set(!this.isEditing());
    if (!this.isEditing()) {
      this.initializeForm();
    }
  }

  onSubmit() {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    if (this.isCreating()) {
      // Mode création
      this.createCourse();
    } else {
      // Mode modification
      this.updateCourse();
    }
  }

  createCourse() {
    const newCourse: CourseModel = {
      id: Math.floor(Math.random() * 1000000),
      name: this.courseForm.value.name!,
      description: this.courseForm.value.description!,
      price: this.courseForm.value.price!,
      category: this.courseForm.value.category!,
    };

    this.courseService.addCourse(newCourse).subscribe({
      next: () => {
        toast.success('Cours créé avec succès !', {
          description: `Le cours "${newCourse.name}" a été ajouté avec succès.`,
        });
        this.router.navigate(['/courses']);
      },
      error: (err) => {
        toast.error('Erreur lors de la création du cours', {
          description: "Une erreur est survenue lors de l'ajout du cours.",
        });
        console.error('Error creating course:', err);
      },
      complete: () => {
        this.isSubmitting.set(false);
      },
    });
  }

  updateCourse() {
    const updatedCourse: CourseModel = {
      id: this.id,
      name: this.courseForm.value.name!,
      description: this.courseForm.value.description!,
      price: this.courseForm.value.price!,
      category: this.courseForm.value.category!,
    };

    this.courseService.updateCourse(updatedCourse).subscribe({
      next: () => {
        toast.success('Cours mis à jour avec succès !', {
          description: `Le cours "${updatedCourse.name}" a été modifié avec succès.`,
        });
        this.course.set(updatedCourse);
        this.isEditing.set(false);
        this.router.navigate(['/courses']);
      },
      error: (err) => {
        toast.error('Erreur lors de la mise à jour du cours', {
          description: 'Une erreur est survenue lors de la modification du cours.',
        });
        console.error('Error updating course:', err);
      },
      complete: () => {
        this.isSubmitting.set(false);
      },
    });
  }

  // Getters pour les contrôles du formulaire
  get nameControl() {
    return this.courseForm.get('name')!;
  }

  get descriptionControl() {
    return this.courseForm.get('description')!;
  }

  get priceControl() {
    return this.courseForm.get('price')!;
  }

  get categoryControl() {
    return this.courseForm.get('category')!;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.courseForm.get(fieldName);
    return !!(field?.invalid && (field?.dirty || field?.touched));
  }
}
