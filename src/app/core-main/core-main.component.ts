import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-core-main',
  templateUrl: './core-main.component.html',
  styleUrl: './core-main.component.scss'
})
export class CoreMainComponent implements OnInit{
  theme: any
  isDrawerOpen = false;

  toggleDrawer(): void {
    // Why: Single source of truth for open/close avoids class dr
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  closeDrawer(): void {
    this.isDrawerOpen = false;
  }
  
  ngOnInit(): void {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      this.theme = storedTheme;      
    } 
  }
 get_theme(){
  this.theme = document.documentElement.getAttribute('data-theme'); // Set to dark
  console.log(this.theme)
 }
}
