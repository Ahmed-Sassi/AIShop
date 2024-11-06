import { Component, inject } from '@angular/core';
import { Task } from '../../task.model';
import { AsyncPipe, DatePipe, CommonModule } from '@angular/common';
import { TaskService } from '../../task.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Observable } from 'rxjs';
import { MaterialModule } from '../../material.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgScrollbarModule } from 'ngx-scrollbar';
import {AppYearlyBreakupComponent, YearlyChart} from "../yearly-breakup/yearly-breakup.component";



const emptyTask = {
  name: '',
  description: '',
  dueDate: new Date(),
  completed: false,
  project: 1,
  id: 0,
};

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [DatePipe, TaskFormComponent, AsyncPipe,CommonModule,MaterialModule,
    MatMenuModule,
    MatButtonModule,
    AppYearlyBreakupComponent,
    TablerIconsModule,
    MatProgressBarModule,
    NgScrollbarModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  displayedColumns: string[] = ['name', 'description', 'dueDate', 'completed','menu'];
  showModal: boolean = false;
  formType: 'CREATE' | 'UPDATE' = 'CREATE';
  selectedTask: Task = emptyTask;
  tasks$!: Observable<Task[]>;
  completedPercentage: number = 0 ;
  notCompletedPercentage: number = 0 ;
  yearlyChart!: Partial<YearlyChart>;


  private taskService = inject(TaskService);

  constructor() {
    this.updateTasks();
  }

  updateTasks() {
    console.log('updateTasks called');
    this.tasks$ = this.taskService.getTasks();
    this.tasks$.subscribe(
      (tasks) => {
        console.log('Tasks emitted:', tasks); // Log emitted tasks
        this.calculateCompletedPercentage(tasks);
      },
      (error) => {
        console.error('Error fetching tasks:', error); // Capture errors
      }
    );
  }

  calculateCompletedPercentage(tasks: Task[]) {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    // Calculate percentages and round them to the nearest integer
    this.completedPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    this.notCompletedPercentage = 100 - this.completedPercentage;

    // Log calculated percentages
    console.log('Total Tasks:', totalTasks);
    console.log('Completed Tasks:', completedTasks);
    console.log('Completed Percentage (rounded):', this.completedPercentage);
    console.log('Not Completed Percentage (rounded):', this.notCompletedPercentage);
  }



  handleCheckbox(id: number) {
    // Récupérer la tâche par son ID à partir du service
    this.taskService.getTaskById(id).subscribe((task) => {
      // Inverser la valeur de completed
      task.completed = !task.completed;

      // Mettre à jour la tâche via le service
      this.taskService.updateTask(task).subscribe(
        (updatedTask) => {
          console.log('Task updated successfully:', updatedTask);
          this.updateTasks();
        },
        (error) => {
          console.error('Error updating task:', error);
        }
      );
    },
    (error) => {
      console.error('Error fetching task by id:', error);
    });

  }
  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.updateTasks();
    });
  }

  updateTask(task: Task) {
    this.selectedTask = task;
    this.formType = 'UPDATE';
    this.showModal = true;
  }

  addNewTask() {
    this.selectedTask = emptyTask;
    this.formType = 'CREATE';
    this.showModal = true;
  }

  handleModalClose(type: 'SUBMIT' | 'CANCEL') {
    if (type === 'SUBMIT') {
      this.updateTasks();
    }
    this.showModal = false;
  }
}
