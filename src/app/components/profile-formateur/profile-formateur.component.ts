import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { Formateur } from 'src/app/models/formateur';
import { FormateursService } from 'src/app/services/formateurs.service';
import Swal from 'sweetalert2';
import {StatistiqueService} from "../../services/statistique.service";

@Component({
  selector: 'app-profile-formateur',
  templateUrl: './profile-formateur.component.html',
  styleUrls: ['./profile-formateur.component.css']
})

export class ProfileFormateurComponent implements OnInit {
  selected!: Date | null;

  id: any;
  updateForm!: FormGroup;
  formateur!: any;
  upformateur!:Formateur;
  fileUrl="http://localhost:3000/files/get/";
  nbr: number=0
  db: any;
  df:any;
  nbrtot!:number
  nbrh!: number;
  constructor(private route:ActivatedRoute,private  service:FormateursService,
              private router:Router,private statservice:StatistiqueService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
   this.service.getById(this.id).subscribe(
      data=>{
        this.formateur=data;


      }
    )
  this.statservice.getnbrtotvisform(this.id).subscribe(res=>{
    this.nbrtot=res
  })
    this.statservice.getnbrhvisform(this.id).subscribe(res=>{
      this.nbrh=res
    })
  }
  transform()
  {
    this.service.getById(this.formateur._id).subscribe(
      data=>{this.formateur=data;
           })
      return this.formateur;
  }
  updateFormateur(): void {
    this.upformateur=this.formateur;
    this.service.update(this.formateur._id,this.upformateur).subscribe(
      (res)=>{ Swal.fire({ title: '    succés', icon: 'success' });
    this.transform(); },
       (err)=>{ Swal.fire({ title: '    erreur', icon: 'error' }); } )

  }
  get getformaddApp(){
    return this.updateForm.controls;
  }


  back() {
    this.router.navigate(['home/form'])
  }
  get(){
this.statservice.getvisfordate(this.db,this.df,this.id).subscribe(
  res=>{
    this.nbr=res
  }
)
  }
}
