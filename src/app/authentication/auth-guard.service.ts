import { AuthServices } from './auth.Services';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuardService implements CanActivate{
  constructor(private router:Router,private authService:AuthServices){ }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean | Promise<boolean> |Observable<boolean>{

    return this.authService.getUser().then((auth)=>{
      if(auth){
        return true;
      }else{
        this.router.navigate(['/login'])
        return false;
      }
    })
  }
}
