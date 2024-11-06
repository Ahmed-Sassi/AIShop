import {Component, inject} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TablerIconsModule } from 'angular-tabler-icons';
import {RouterLink} from "@angular/router";
import {MatTooltip} from "@angular/material/tooltip";
import {Task} from "../../task.model";
import {Observable} from "rxjs";
import {YearlyChart} from "../yearly-breakup/yearly-breakup.component";
import {TaskService} from "../../task.service";

// ecommerce card
interface productCards {
    id: number;
    imgSrc: string;
    title: string;
    description : string;
    price: string;
}

@Component({
    selector: 'app-blog-card',
    standalone: true,
  imports: [MatCardModule, TablerIconsModule, MatButtonModule, RouterLink, MatTooltip],
    templateUrl: './blog-card.component.html',
})
export class AppBlogCardsComponent {

  displayedColumns: string[] = ['name', 'description', 'dueDate', 'completed','menu'];
  showModal: boolean = false;
  formType: 'CREATE' | 'UPDATE' = 'CREATE';
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
        console.log('Tasks emitted:', tasks);
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }


  productcards: productCards[] = [
    {
      id: 1,
      imgSrc: '/assets/images/products/robot.jpg',
      title: 'Huawei AI Robot',
      description: 'A humanoid robot equipped with Huawei’s advanced AI for autonomous tasks in homes and workplaces, featuring natural language processing, object recognition, and mobility.',
      price: '25,000.00',
    },
    {
      id: 2,
      imgSrc: '/assets/images/products/huw.jpg',
      title: 'AI DJ Controller',
      description: 'An AI-powered DJ controller that automatically mixes music, analyzes tracks, and adjusts beats in real time. Perfect for professionals and hobbyists.',
      price: '499.00',
    },
    {
      id: 3,
      imgSrc: '/assets/images/products/replika.jpg',
      title: 'Google AI Assistant Device',
      description: 'A smart home hub powered by Google’s AI, offering voice-activated controls for managing devices, answering queries, and performing daily tasks efficiently.',
      price: '149.99',
    },
    {
      id: 4,
      imgSrc: '/assets/images/products/ring.jpg',
      title: 'AI Smart Ring',
      description: 'An advanced AI-powered ring that tracks vital health metrics such as heart rate, sleep quality, and daily activity. Featuring real-time insights and personalized recommendations, this sleek ring is perfect for managing your health on the go.',
      price: '299.99',
    },
    {
      id: 5,
      imgSrc: '/assets/images/products/download.jpg',
      title: 'AI mobile app',
      description: 'An advanced Mobile App .',
      price: '299.99',
    }

  ];
}
