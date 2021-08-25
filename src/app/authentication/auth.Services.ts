
import { Injectable } from "@angular/core";
import { User } from "../user.model";
@Injectable({ providedIn: 'root' })
export class AuthServices {


  userId:number=0;
  userArray: User[] = [];
  userData: User[] = [];


  isLoggedIn=false;
  constructor() { }
  userValidation (newUser:User){
    let users:User[]=JSON.parse(localStorage.getItem('SignupUsers')!);
    console.log(users);
    let   userExist=false;
    console.log('1')
    if(users){
      console.log('2')

      users.map((user:User)=>{

        if(newUser.email===user.email){
          userExist=true
          return userExist;
        }else{
          return userExist
        }
      })
      return userExist
    }else
    {
      return userExist
    }

  }
  createUser(user: User) {
    console.log('3')
    this.userData = JSON.parse(localStorage.getItem('SignupUsers')!);
    if (this.userData != null) {
      this.userData.push(user);
      localStorage.setItem('SignupUsers', JSON.stringify(this.userData));
      this.isLoggedIn=true;
    } else {
      let newUser:User[]=[];
      newUser.push(user);
      localStorage.setItem('SignupUsers', JSON.stringify(newUser));
      this.isLoggedIn=true;
    }
  }

  generateUserID (){
    const users = this.userData = JSON.parse(localStorage.getItem('SignupUsers')!);
    if(users===null)
    {
      this.userId=1;
      return  this.userId
    }else{
      this.userId=users.length + 1;
      return this.userId;
    }
  }
  loginUser(user:User){
    let LoggedInUser:User
    let users = JSON.parse(localStorage.getItem('SignupUsers')!);
    users.map((u:User)=>{
      if(user.email===u.email && user.password===u.password){
      LoggedInUser=u
      this.isLoggedIn=true;
      }

    });
    return LoggedInUser!
  }
  getUser(){

    console.log(this.isLoggedIn)
    const promise = new Promise((resolve,reject)=>{
      return resolve(this.isLoggedIn)
    });
    return promise;

    // return new Promise((resolve, reject)=>{
    //   return resolve(this.isLoggedIn);
    // });
  }
}
