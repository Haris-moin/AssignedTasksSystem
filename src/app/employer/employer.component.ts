import { Teams } from './teams/Teams.model';
import { EmployerServices } from './employer.services';

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRouteSnapshot, ActivatedRoute, Params } from '@angular/router';
import { AddteamdialogComponent } from './addteamdialog/addteamdialog.component';
import { AddCategoryComponent } from './add-category/add-category.component';


@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css']
})
export class EmployerComponent implements OnInit {

  employerTeams!:Teams[]
  employeeTeams:Teams[]=[]
   newTeam:string[]=[]
  constructor(private dialog: MatDialog,
    private employerServices:EmployerServices,
    private router:Router,
    private route:ActivatedRoute) { }


 Teams!:Teams[]
 ngOnInit(): void {

  this.Teams= this.employerServices.getTeams();
  this.employerServices.teamsChanged.subscribe((teams:Teams[])=>{
    this.Teams=teams;

  })
  console.log(JSON.parse(localStorage.getItem('Answers')!))
  this.onSetTeamSection();
 }
 openDialog(){
   this.dialog.open(AddteamdialogComponent);
 }
 openCategory(){
   this.dialog.open(AddCategoryComponent);
 }

 onTeam(){
this.router.navigate(['teams'],{relativeTo:this.route})
 }

 onSetTeamSection(){
  let currenEmployer=JSON.parse(localStorage.getItem('currentUser')!);
  let userId=currenEmployer.id;
  let userEmail=currenEmployer.email;
  this.employerServices.teamsChanged.subscribe((teams:Teams[])=>{
    this.Teams=teams;
    this.employerTeams=this.Teams.filter(team=> team.employerId==userId);


  })
  this.employerTeams=this.Teams.filter(team=> team.employerId==userId);

  let partOfTeams=this.Teams.filter(team=> team.employerId!=userId);

  partOfTeams.map(teamp=>{
    teamp.employees.map(emp=>{
      if(emp==userEmail){
        this.employeeTeams.push(teamp);
      }
    })
  })

// this.employeeTeams=this.Teams.filter(team=>team.employees.filter(emp=>emp==userEmail));


 }
 onPartTeamClick(){
  this.employerServices.setIsEmployer(false);

  // this.router.navigate([],{queryParams:{id},relativeTo:this.route})
}
onOwnTeamClick(){
  this.employerServices.setIsEmployer(true);

}
  // team={};
 // selectedCtegory=''
 // teamCategory=['team:1','team:2','team:3','team:4']

 // createTeamForm=new FormGroup({

 //   'teamName':new FormControl(null,Validators.required),
 //   'teamcategory':new FormControl(null),
 //   'description':new FormControl(null,Validators.required),
 //   'employee':new FormControl(null,Validators.required),
 // })

 // onSelectCategory(e:any){
 //   this.selectedCtegory =e.target.value;

 //   console.log(this.selectedCtegory);
 // }
 // onclick()
 // {
 //   console.log('clicked')
 // }
 // onSubmit(){


 //   if(this.createTeamForm.get('teamcategory')?.value==''){
 //     const  users= this.createTeamForm.value;
 //   console.log(users)

 //     this.team=users;
 //   }
 //   else{
 //     this.createTeamForm.get('teamcategory')?.setValue(this.selectedCtegory,{onlySelf: true});
 //     console.log(this.createTeamForm.get('teamcategory')?.value)
 //     console.log('');
 //     console.log(this.createTeamForm.get('teamcategory'))
 //     const  users= this.createTeamForm.value;
 //     console.log('else');
 //   console.log(users)

 //   }


 // }

 Logout(){
   this.router.navigate(['/login'])
 }


}
