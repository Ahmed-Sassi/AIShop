import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';
import {TaskListComponent} from '../../components/task-list/task-list.component';
import {AppYearlyBreakupComponent} from "../../components/yearly-breakup/yearly-breakup.component";
import {AppBlogCardsComponent} from "../../components/blog-card/blog-card.component";

@Component({
  selector: 'app-starter',
  standalone: true,
  imports: [
    MaterialModule,
    TaskListComponent,
    AppYearlyBreakupComponent,
    AppBlogCardsComponent
  ],
  templateUrl: './starter.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent {
  completedPercentage: number = 0;
  notCompletedPercentage: number = 0;
}
