import { User } from './../../user.model';
import { EmployerServices } from './../employer.services';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AuthServices } from 'src/app/authentication/auth.Services';

@Component({
  selector: 'app-addteamdialog',
  templateUrl: './addteamdialog.component.html',
  styleUrls: ['./addteamdialog.component.css']
})
export class AddteamdialogComponent implements OnInit {

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  employeeCtlr = new FormControl();
  filteredEmployees!: Observable<string[]>;
  teamId=0;
  categoryArray=[]

  @ViewChild('employeeInput') employeeInput!: ElementRef<HTMLInputElement>;

  employees: string[] = [];
   EmployeesArray:string[]=[''];

  constructor(private dialog: MatDialog,private employerServices:EmployerServices,private authServices:AuthServices) {
    this.filteredEmployees = this.employeeCtlr.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.EmployeesArray.slice()))

  }

  ngOnInit(): void {

    this.categoryArray = this.employerServices.getCategory();
    this.EmployeesArray= this.employerServices.getEmployees();
     }

  createTeamForm=new FormGroup({

    'teamName':new FormControl(null,Validators.required),
    'teamcategory':new FormControl(null,Validators.required),
    'description':new FormControl(null,Validators.required),
    // 'employees':new FormControl(null,Validators.required),
  })
  onSubmit(){
    if(this.createTeamForm.valid){

      this.teamId=this.employerServices.generateTeamID();

     let currenEmployer=JSON.parse(localStorage.getItem('currentUser')!);

     let employerId=currenEmployer.id;

      const newTeam={
        'employerId':employerId,
        'teamId':this.teamId,
        'teamName':this.createTeamForm.value.teamName,
        'teamcategory':this.createTeamForm.value.teamcategory,
        'description':this.createTeamForm.value.description,
        'employees':this.employees
      }


      this.employerServices.createTeam(newTeam)
      this.createNewAddedUser();
      this.createTeamForm.reset()
      this.dialog.closeAll()

    }else{
      console.log('invalid team')
    }
  }

  createNewAddedUser(){
    let allEmployees= this.employerServices.getEmployees();
 let newEmp = this.employees.filter(item => !allEmployees.includes(item));
 if(newEmp){
  let userId=0
   newEmp.map(emp=>{
   userId= this.authServices.generateUserID()
   let empName= emp.substring(0,5);
   let  emppObj:User={
     'id':userId,
     'name':empName,
       'email':emp,
       'password': '123456'
     }
     this.authServices.createUser(emppObj)
   })
  }
  }
 Team!:[{'employerId':'','emp':[],'teamName':'','teamCategory':''}]
// onarrayadd(){

//   let currentTeam:[{'employerId':'','teamid':number,'emp':[],'teamName':'','teamCategory':''}]= JSON.parse(localStorage.getItem('teams')!)
//   let currentTeamEmp=currentTeam.map(t=>{
//     if(t.teamid==this.teamId){
//       console.log('true',console.log(t))
//     }else{
//       console.log(t)
//     }

//   });

//   console.log(this.employees);

//  let allEmployees= this.employerServices.getEmployees();
//  let newEmp = this.employees.filter(item => !allEmployees.includes(item));
//  if(newEmp){
//   let userId=0
//    newEmp.map(emp=>{
//    userId= this.authServices.generateUserID()
//    let  emppObj:User={
//      'id':userId,
//        'email':emp,
//        'password': '123456'
//      }
//      this.authServices.createUser(emppObj)
//    })
//    console.log(JSON.parse(localStorage.getItem('SignupUsers')!))
//  }
//  const found = this.employees.some(r=> {allEmployees.includes(r)
//   console.log('here',r);});
//  console.log(found);

//  this.employees.map(emp=>{
//    allEmployees.map(allemp=>{
//      if(emp!==allemp){
//        console.log('1')
//        console.log(emp);
//      }
//    })
//  })
// }

  remove(employee: string): void {
    const index = this.employees.indexOf(employee);

    if (index >= 0) {
      this.employees.splice(index, 1);
    }
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.employees.push(value);

    }

    // Clear the input value
    event.chipInput!.clear();
    this.employeeCtlr.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.employees.push(event.option.viewValue);
    this.employeeInput.nativeElement.value = '';
    this.employeeCtlr.setValue(null);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.EmployeesArray.filter(emp => emp.toLowerCase().includes(filterValue));
  }
}
