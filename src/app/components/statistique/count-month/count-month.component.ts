import { Component, OnInit } from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";
import {Label} from "ng2-charts";
import {StatistiqueService} from "../../../services/statistique.service";

@Component({
  selector: 'app-count-month',
  templateUrl: './count-month.component.html',
  styleUrls: ['./count-month.component.css']
})
export class CountMonthComponent implements OnInit {
  public barChartType: ChartType = 'bar';
 a!:number
  year:number=2022
  constructor(private statservice:StatistiqueService) { }

  ngOnInit(): void {
  this.get()




  }
 get(){

   this.year=this.year
   this.barChartData[0].data=[]
   let i: number = 1;
   do {




     this.statservice.getByMonth(i,this.year).subscribe(res=>{
       this.a=res
       this.barChartData[0].data?.push( this.a)


     })
     i++;
   }
   while (i< 13);




 }
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['janvier', 'février', 'mars', 'avril', 'mai','juin','juillet','aout','septembre','octrobre','novembre','decembre'];
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'nombre de visioconférence ' }
  ];

}
