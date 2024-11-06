import { Routes } from '@angular/router';

import {LoginComponent} from "./side-login/side-login.component";
import {RegisterComponent} from "./side-register/side-register.component";

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
];
