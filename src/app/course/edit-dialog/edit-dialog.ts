import { iCourseForm } from '@/models/course.model';
import { UserService } from '@/services/user-service';
import { Z_MODAL_DATA } from '@/shared/components/dialog';
import { ZardInputDirective } from '@/shared/components/input';
import { ZardSelectComponent, ZardSelectItemComponent } from '@/shared/components/select';
import { AfterViewInit, ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-dialog',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ZardInputDirective,
    ZardSelectComponent,
    ZardSelectItemComponent,
  ],
  templateUrl: './edit-dialog.html',
  styleUrl: './edit-dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditDialog implements AfterViewInit {
  private zData: iCourseForm = inject(Z_MODAL_DATA);
  isBigBoss = signal(false);

  form = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(0),
    category: new FormControl(''),
  });

  constructor(private userService: UserService) {
    this.isBigBoss.set(this.userService.isBigBoss());
  }

  ngAfterViewInit(): void {
    if (this.zData) {
      this.form.patchValue(this.zData);
    }
  }
}
