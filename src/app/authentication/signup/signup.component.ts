import { Router } from '@angular/router';
import { AuthServices } from './../auth.Services';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // ErrorMessage = "Role can't be empty"
  // roleMsgFlage = false;
  // userRole: string = "";
  userId:number=0;
  isUserExist=false;
  userExist='User already exist'

    constructor(private authServices: AuthServices, private routes:Router) { }
  SignupForm = new FormGroup({
    'email': new FormControl(null, [Validators.required,Validators.email]),
    'name':new FormControl(null,Validators.required),
    'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
  })
  ngOnInit(): void {

  }
  // onUserType(event: any) {
  //   this.userRole = event.target.value;
  //   console.log(this.userRole)
  //   this.roleMsgFlage=false
  // }
  onSubmit() {
    if (this.SignupForm.valid) {
      // if (this.userRole) {

       this.userId= this.authServices.generateUserID()
        const newUser = {
          id:this.userId,
          'email': this.SignupForm.value.email,
          'name':this.SignupForm.value.name,
          'password':this.SignupForm.value.password,
          // 'userRole':this.userRole
        }

        this.isUserExist= this.authServices.userValidation(newUser);

        if(this.isUserExist===false){
          this.authServices.createUser(newUser);
          localStorage.setItem('currentUser',JSON.stringify(newUser));

          // if(newUser.userRole==='Employee'){
          //   this.routes.navigate(['/employee']);
          // }else{
          //   this.routes.navigate(['/employer']);
          // }

          this.routes.navigate(['/team']);
        }
        else{
          this.isUserExist=true;
        }

    //  } else {
      //   this.roleMsgFlage = true;
      // }

    } else {
      console.log('invalid form');
    }

  }
}
