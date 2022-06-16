import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {LoginService} from "../../services/login.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  cheminImage:any = "assets/logoprojet.png";

  loginForm !: FormGroup;
  hide = true
  fieldTextType!: boolean;
  constructor(private authService : LoginService , private router : Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email : new FormControl ('' , Validators.required),
      password : new FormControl ('' , Validators.required)
    });
  }

  loginAdmin(){
    this.authService.login(this.loginForm.value).subscribe((res:any)=>{
        localStorage.setItem("mhatlioussema", res.token);
        this.router.navigate(['/home'])
    },error => Swal.fire({title: "email ou mot de passe erroné", icon: "error"})
    )
  }

  get getloginForm(){
    return this.loginForm.controls;
  }

}
