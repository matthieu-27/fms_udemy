import { UserService } from '@/services/user-service';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardIconComponent } from '@/shared/components/icon';
import { NgOptimizedImage } from '@angular/common';
import { Component, computed, Renderer2, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgOptimizedImage, ZardIconComponent, ZardButtonComponent],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  theme = signal<'light' | 'dark'>('light');
  role = signal('CUSTOMER');
  isLoggedIn = signal(false);

  themeClass = computed(() => `theme-${this.theme()}`);

  constructor(
    private userService: UserService,
    private renderer: Renderer2,
  ) {}

  toggleTheme() {
    if (this.theme() == 'light') {
      this.renderer.addClass(document.body.parentElement, 'dark');
      this.theme.set('dark');
    } else {
      this.renderer.removeClass(document.body.parentElement, 'dark');
      this.theme.set('light');
    }
  }
}
