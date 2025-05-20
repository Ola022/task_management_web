import { Component } from '@angular/core';

@Component({
  selector: 'app-tailwind-component',
  templateUrl: './tailwind-component.component.html',
  styleUrl: './tailwind-component.component.scss'
})
export class TailwindComponentComponent {
  
  showMenu = true

  toggle(){
    const burger = document.querySelector('#burger')
    const menu = document.querySelector('#menu')

    if(menu?.classList.contains('hidden')){
      menu.classList.remove('hidden')
    }
    else{
      menu?.classList.add('hidden')
    }
  }

  switchTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
  }
}
