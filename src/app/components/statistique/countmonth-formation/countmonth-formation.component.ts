import { Component, OnInit } from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";
import {Label} from "ng2-charts";
import {StatistiqueService} from "../../../services/statistique.service";

@Component({
  selector: 'app-countmonth-formation',
  templateUrl: './countmonth-formation.component.html',
  styleUrls: ['./countmonth-formation.component.css']
})
export class CountmonthFormationComponent implements OnInit {
  public barChartType: ChartType = 'bar';
a!:number;
  year:number=2022
  constructor(private statservice:StatistiqueService) { }

  ngOnInit(): void {
  this.get()
  }
  get() {
    this.year=this.year
    this.barChartData[0].data=[]
    let i: number = 1;
    do {




      this.statservice.getformByMonth(i,this.year).subscribe(res=>{
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
    { data: [], label: 'nombre de formation ' }
  ];



}
