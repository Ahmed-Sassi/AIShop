import { Component } from '@angular/core';
import {AuthService} from "../auth.service";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {Router, RouterLink} from "@angular/router";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";


@Component({
  selector: 'app-register',
  templateUrl: './side-register.component.html',
  standalone: true,
  imports: [
    MatButton,
    MatCardContent,
    MatCard,
    MatFormField,
    MatLabel,
    FormsModule,
    MatInput,
    RouterLink
  ],
  styleUrls: ['./side-register.component.html']
})
export class RegisterComponent {
  form: any = {
    username: null,
    email: null,
    password: null
  };


  constructor(private authService: AuthService,private router: Router) { }

  onSubmit(): void {
    const { username, email, password } = this.form;

    this.authService.register(username, email, password).subscribe({
      next: data => {
        console.log(data);
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
