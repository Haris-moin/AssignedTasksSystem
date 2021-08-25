
import { AddteamdialogComponent } from './../addteamdialog/addteamdialog.component';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { EmployerServices } from '../employer.services';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {

  constructor(private dialog: MatDialog,
     private employeeServices:EmployerServices,
     private router:Router,
     private route:ActivatedRoute) { }

  Teams=[{'teamName':'','ddescription':'','teamcategory':'','employees':[]}]
  ngOnInit(): void {
   this.Teams= this.employeeServices.getTeams();
   console.log(this.Teams)
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



}
