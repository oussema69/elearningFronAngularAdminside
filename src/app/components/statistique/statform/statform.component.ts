import { Component, OnInit } from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";
import {Label} from "ng2-charts";
import {StatistiqueService} from "../../../services/statistique.service";

@Component({
  selector: 'app-statform',
  templateUrl: './statform.component.html',
  styleUrls: ['./statform.component.css']
})
export class StatformComponent implements OnInit {
  year:number=2022
  a! :number
  public barChartType: ChartType = 'bar';
  constructor(private statservice:StatistiqueService) { }

  ngOnInit(): void {
    this.get()
  }
  get(){

    this.year=this.year
    this.barChartData[0].data=[]
    let i: number = 1;
    do {




      this.statservice.getformstat(i,this.year).subscribe(res=>{
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
    { data: [], label: 'nombre des formateur ' }
  ];
}
