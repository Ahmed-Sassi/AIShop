import { Component } from '@angular/core';
import { AuthService } from "../auth.service";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { Router, RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-login',
  templateUrl: './side-login.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatCheckboxModule,
    RouterLink,
    MatButtonModule,
    MatInputModule,
    MatCardModule
  ],
  styleUrls: []
})
export class LoginComponent {
  form: any = {
    username: null,
    password: null
  };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
  }


  onSubmit(): void {
    const {username, password} = this.form;

    this.authService.login(username, password).subscribe({
      next: (response) => {
        if (response) {
          this.router.navigate(['/dashboard']); // Navigate to the dashboard if response is not null
        }
      },
      error: (error) => {
        this.errorMessage = 'Login failed. Please check your credentials.';
        console.error('Login error:', error);
      }
    });
  }
}

