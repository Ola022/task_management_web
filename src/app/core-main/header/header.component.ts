import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  default_theme = 'light'
  
  ngOnInit() {
    // Check localStorage for theme preference
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      this.default_theme = storedTheme;
      document.documentElement.setAttribute('data-theme', this.default_theme);
    } else {
      // Default to light theme
      this.default_theme = 'light';
      document.documentElement.setAttribute('data-theme', this.default_theme);
    }
  }
  @Output() menuToggle = new EventEmitter<void>();

onMenuClick() {
  this.menuToggle.emit();
}
  showMenu = true

  switchThemeOld() {
    
    document.documentElement.setAttribute('data-theme', this.default_theme);
    this.default_theme = this.default_theme === 'light' ? 'dark' : 'light';

  }
  switchTheme2() {
    if (this.default_theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light'); // Set to dark
      this.default_theme = 'dark'; // Update the theme variable
    } else {
      document.documentElement.setAttribute('data-theme', 'dark'); // Set to light
      this.default_theme = 'light'; // Update the theme variable
    }
  }
  switchTheme() {
    if (this.default_theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark'); // Store dark theme in localStorage
      this.default_theme = 'dark';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light'); // Store light theme in localStorage
      this.default_theme = 'light';
    }
  }
  
}
