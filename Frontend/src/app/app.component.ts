import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './Components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
  styles: '',
  imports: [RouterModule, NavbarComponent]
})
export class AppComponent {
  title = 'cs2-platform-frontend';
}
