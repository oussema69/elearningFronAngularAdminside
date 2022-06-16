import {Component, Input, OnInit} from '@angular/core';
import {StatistiqueService} from "../../../services/statistique.service";
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";
import {Label} from "ng2-charts";

@Component({
  selector: 'app-visioformateur',
  templateUrl: './visioformateur.component.html',
  styleUrls: ['./visioformateur.component.css']
})
export class VisioformateurComponent implements OnInit {
  year: number=2022
  a!:number
  @Input()
  idf:any
  public barChartType: ChartType = 'bar';

  constructor(private statservice:StatistiqueService) { }

  ngOnInit(): void {
    this.get()
  }

  get() {
    this.year=this.year
    this.barChartData[0].data=[]
    let i: number = 1;
    do {




      this.statservice.getvisByformateur(i,this.year,this.idf).subscribe(res=>{
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
