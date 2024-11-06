import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      designation: ['', Validators.required],
      tasks: this.fb.array([this.fb.control('', Validators.required)]) // Initialize with one task input
    });
  }

  ngOnInit(): void {}

  get tasks(): FormArray {
    return this.projectForm.get('tasks') as FormArray;
  }

  addTask(): void {
    this.tasks.push(this.fb.control('', Validators.required)); // Add a new task input
  }

  removeTask(index: number): void {
    this.tasks.removeAt(index); // Remove a task input
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      console.log(this.projectForm.value); // Handle form submission
      // Send the form data to your backend or perform other actions here
    }
  }
}
