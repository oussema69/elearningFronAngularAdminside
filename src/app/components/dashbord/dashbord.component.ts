import { Component, OnInit } from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType, RadialChartOptions} from "chart.js";
import {Color, Label, MultiDataSet} from "ng2-charts";
import {FormateursService} from "../../services/formateurs.service";
import {Formateur} from "../../models/formateur";
import {ApprenantsService} from "../../services/apprenants.service";
import {Apprenant} from "../../models/apprenant";
import {VisioconferenceService} from "../../services/visioconference.service";
import {CategoriService} from "../../services/categori.service";
import {FormationsService} from "../../services/formations.service";
import {StatistiqueService} from "../../services/statistique.service";

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  public barChartType: ChartType = 'bar';
formateurs: any
  apprenant:any
  visio:any
  data:any
  cat:any
  formation:any
  db: any;
  df: any;
  nbr: any;
  dbf: any;
  dff: any;
  nbrf:any;
  constructor(private formateurservice:FormateursService,private serviceapp:ApprenantsService
  ,private visioservice:VisioconferenceService,private catservice:CategoriService,
              private formService:FormationsService,private statservice:StatistiqueService) {

  }

  ngOnInit(): void {
    this.formateurservice.getall().subscribe(
      data=>{
        this.formateurs=data;
        this.radarChartData[0].data?.push(this.formateurs?.length)
      }
      )
    this.serviceapp.getall().subscribe(
      res=>{
        this.apprenant=res;
        this.radarChartData[0].data?.push(this.apprenant?.length)

      }
    )
    this.visioservice.getroom(this.data).subscribe(
      res=>{
        this.visio=res.rooms
        this.radarChartData[0].data?.push(this.visio?.length)


      }
    )
    this.catservice.getAll().subscribe(
      res=>{
        this.cat=res
        this.radarChartData[0].data?.push(this.cat?.length)

      }
    )
 this.formService.getAll().subscribe(
   res=>{
     this.formation=res
     this.radarChartData[0].data?.push(this.formation?.length)

   }
 )

  }



  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['formateurs', 'Apprenants', 'catégorie', 'formation', 'Visioconférence'];
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'first step' }
  ];

  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['formateurs', 'Apprenants', 'catégorie', 'formation', 'Visioconférence'];

  public radarChartData: ChartDataSets[] = [
    { data: [], label: 'statistique generale' }
  ];
  public radarChartType: ChartType = 'radar';


  get() {
this.statservice.getallvisDate(this.db,this.df).subscribe(res=>{
  this.nbr=res
})
  }

  getF() {
    this.statservice.getallformDate(this.dbf,this.dff).subscribe(res=>{
      this.nbrf=res
    })
  }
}
// style="width:50%; background-color:white;border:1px solid black"
