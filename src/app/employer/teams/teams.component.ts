import { Teams } from './Teams.model';
import { EmployerServices } from './../employer.services';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teamName!:string
  category!:string
  teamEmployees!:string[]
  teamId!:number
  descrip!:string
isEmployer!:boolean
  constructor(private router:Router,private route:ActivatedRoute,private employerServices:EmployerServices) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.teamId = +params['id'];
      }

    )

    this.isEmployer =this.employerServices.getIsEmployer()
    console.log(JSON.parse(localStorage.getItem('Answers')!))
  //  this.getTeamDetails();
  }
  onSettings(){
this.router.navigate(['settings'],{relativeTo:this.route})
  }
  // getTeamDetails(){

  //  let currentTeam:Teams[]= this.employerServices.getCurrentTeam(this.teamId);
  //  this.teamName=currentTeam[0].teamName;
  //  this.category=currentTeam[0].teamcategory;
  //  this.teamEmployees=currentTeam[0].employees;
  //  this.descrip=currentTeam[0].description;
  // }

}
