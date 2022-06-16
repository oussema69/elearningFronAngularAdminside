import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";
import {StatistiqueService} from "../../../services/statistique.service";
import {Label} from "ng2-charts";

@Component({
  selector: 'app-statappvisio',
  templateUrl: './statappvisio.component.html',
  styleUrls: ['./statappvisio.component.css']
})
export class StatappvisioComponent implements OnInit {

  year: number=2022
  a!:number
  @Input()
  idApp:any
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




      this.statservice.getvisiobyappmonth(i,this.year,this.idApp).subscribe(res=>{
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
