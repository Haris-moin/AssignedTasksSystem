import { User } from './../../user.model';
import { AuthServices } from './../auth.Services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMesage=""
  constructor(private authServices:AuthServices, private routes:Router) { }

  ngOnInit(): void {
  }

  LoginForm = new FormGroup({
    'email':new FormControl(null,[Validators.required,Validators.email]),
    'password':new FormControl(null,[Validators.required,Validators.minLength(6)])
  })
 onLogin(){
   if(this.LoginForm.valid){
    const user ={

      'email':this.LoginForm.value.email,
      'password':this.LoginForm.value.password
  }

  if(this.authServices.loginUser(user)!=null || this.authServices.loginUser(user)!=undefined){
    const LoggedInUser:User=this.authServices.loginUser(user);

    localStorage.setItem('currentUser',JSON.stringify(LoggedInUser));


      this.errorMesage=""
      this.routes.navigate(['/team'])


  }else{
     this.errorMesage='invalid email or password'
  }


   }else{
     console.log('invalid form')
   }
 }
}
