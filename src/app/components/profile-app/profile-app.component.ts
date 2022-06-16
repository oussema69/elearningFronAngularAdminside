import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { th } from 'date-fns/locale';
import { Apprenant } from 'src/app/models/apprenant';
import { Formation } from 'src/app/models/formation';
import { ApprenantsService } from 'src/app/services/apprenants.service';
import { FormationsService } from 'src/app/services/formations.service';
import Swal from 'sweetalert2';
import { FormationsComponent } from '../formations/formations.component';
import {ToastrService} from "ngx-toastr";
import {StatistiqueService} from "../../services/statistique.service";

@Component({
  selector: 'app-profile-app',
  templateUrl: './profile-app.component.html',
  styleUrls: ['./profile-app.component.css']
})
export class ProfileAppComponent implements OnInit {
  id: any;
  idF!: string;
  i!:string;
  apprenant!: Apprenant;
  app!:string;
  upapprenant!:Apprenant;
  updateForm!: FormGroup;
  fileUrl="http://localhost:3000/files/get/";
  file:any;


x:Formation[]= [];
format!:Formation;
  db: any;
  df:any
  nbr:any
  dbf: any;
  dff: any;
  nbrf:any
  forapp!:number
  nbrhf!:number
  nbrhvis!:number
  nbrvis!:number
  constructor(private route:ActivatedRoute,private  service: ApprenantsService,
              private serviceFormations:FormationsService,private router:Router,
              private toster : ToastrService,private statservice:StatistiqueService
             ) { }

  ngOnInit(): void {


    this.id = this.route.snapshot.params["id"];
  this.getFormations()
this.statservice.getforapp(this.id).subscribe(res=>{
  this.forapp=res
})
    this.statservice.getforappheure(this.id).subscribe(res=>{
      this.nbrhf=res
    })
    this.statservice.getvisioappheure(this.id).subscribe(res=>{
      this.nbrhvis=res
    })
    this.statservice.getvisioapp(this.id).subscribe(res=>{
      this.nbrvis=res
    })
}

  getFormations()
  {
    this.service.getById(this.id).subscribe(
      data=>{

        this.apprenant=data;
        for(let i of this.apprenant.formations)

        {
          this.serviceFormations.getById(i).subscribe(
            data=>{
              this.format=data;
              this.x.push(this.format);
            },error => console.log(error))
        }
      }

    )
  }

  updateApprenant() {
    this.upapprenant=this.apprenant;
    this.service.update(this.apprenant._id,this.upapprenant).subscribe(
      (res)=>{ Swal.fire({ title: '    succés', icon: 'success' });},
       (err)=>{ Swal.fire({ title: '    erreur', icon: 'error' }); } )

  }
  get getformaddApp(){
    return this.updateForm.controls;
  }



back() {
    this.router.navigate(['home/app'])
  }

  go(cat: string) {
    this.router.navigate(['home/formc/'+cat])
  }
  daffecter(id:string):void{
    if(confirm("Es-tu sûr ! vous voulez supprimer cet formation pour cet apprenant ?")) {
      this.serviceFormations.daffect(this.id, id).subscribe(
        (res) => {
          this.toster.success("effacer")

        },
        (err) => {
          Swal.fire({title: '    erreur', icon: 'error'});
        })


    }

  }

  get() {
this.statservice.getvisappdate(this.db,this.df,this.id).subscribe(res=>{
  this.nbr=res
})
  }

  getF() {
    this.statservice.getformappdate(this.dbf,this.dff,this.id).subscribe(res=>{
      this.nbrf=res
    })
  }
}
