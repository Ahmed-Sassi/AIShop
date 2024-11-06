import { Component, ViewEncapsulation, ViewChild, Input, OnInit } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  NgApexchartsModule,
} from 'ng-apexcharts';
import {MaterialModule} from '../../material.module';

export interface YearlyChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive;
}

@Component({
  selector: 'app-yearly-breakup',
  standalone: true,
  templateUrl: './yearly-breakup.component.html',
  imports: [MaterialModule, NgApexchartsModule, TablerIconsModule],
  encapsulation: ViewEncapsulation.None,
})
export class AppYearlyBreakupComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  @Input() completedPercentage!: number;
  @Input() notCompletedPercentage!: number;




  public yearlyChart!: Partial<YearlyChart> | any;

  ngOnInit(): void {
    this.initChart(); // Initialize the chart after inputs are set
  }

  initChart(): void {
    // Log completed and not completed percentages
    console.log('Completed Percentage:', this.completedPercentage);
    console.log('Not Completed Percentage:', this.notCompletedPercentage);


    this.yearlyChart = {
      series: [5,10],
      labels: ["Completed", "Not Completed"],
      chart: {
        width: 180,
        type: "donut",
        fontFamily: "inherit",
        foreColor: "#adb0bb",
      },
      plotOptions: {
        pie: {
          startAngle: 0,
          endAngle: 360,
          donut: {
            size: "75%",
          },
        },
      },
      stroke: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      colors: ['#5D87FF', '#ECF2FF'],
      responsive: [
        {
          breakpoint: 991,
          options: {
            chart: {
              width: 120,
            },
          },
        },
      ],
      tooltip: {
        theme: "dark",
        fillSeriesColor: false,
      },
    };
  }
}
