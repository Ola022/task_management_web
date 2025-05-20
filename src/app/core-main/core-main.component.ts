import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-core-main',
  templateUrl: './core-main.component.html',
  styleUrl: './core-main.component.scss'
})
export class CoreMainComponent implements OnInit{
  theme: any
  
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
