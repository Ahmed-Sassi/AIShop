import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="branding">
      <a [routerLink]="['/']" class="flex items-center justify-center">
        <img
          src="./assets/images/logos/logo-icon.svg"
          class="align-middle m-2"
          alt="logo"
        />
        <p class="text-2xl font-bold text-black ml-2">AI Shop</p>
      </a>
    </div>

  `,
})
export class BrandingComponent {
  constructor() {}
}
