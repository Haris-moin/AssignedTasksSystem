

import { EmployerServices } from './../employer.services';
import { questionServices } from './../assignQuestions/quession.services';
import { User } from './../../user.model';
import { questions } from './../assignQuestions/question.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { assignQuestion } from '../assignQuestions/assignQuestion.model';
import { Teams } from '../teams/Teams.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AuthServices } from 'src/app/authentication/auth.Services';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  id: number = this.quesServices.generateAssignQuesId();
  uid!: number
  ques!: string[]
  question!: questions;
  isEditMode = false;
  quesId = 0;
  questions: any = []
  teamId!: number;
  teamName!: string
  teamCategory!: string
  currentTeamEMployees!: string[]
  addEmpMode = false;
  addQuesModde = true;
  editQuesMode = false;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  editEvent = new Subject<questions[]>()

  employeeCtlr = new FormControl();
  filteredEmployees!: Observable<string[]>;
  @ViewChild('employeeInput') employeeInput!: ElementRef<HTMLInputElement>;

  employees: string[] = [];
  EmployeesArray: string[] = [''];

  constructor(private route: ActivatedRoute,
    private quesServices: questionServices,
    private employerServices: EmployerServices,
    private authServices: AuthServices) {

    this.filteredEmployees = this.employeeCtlr.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.EmployeesArray.slice()))

  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.teamId = +params['id'];
      }
    )
    this.ques = this.getQuestions();
    this.getCurrentTeamName();
    this.getCurrentTeamEmployees();
    this.getEmployeesRemains();
    this.quesServices.addedQuestion.subscribe(q=>{
      this.ques=q;
    })
  }

  createQuestion = new FormGroup({
    'quesion': new FormControl(null, Validators.required)
  });

  editQuestion = new FormGroup({
    'editQuestion': new FormControl(null, Validators.required),
    'toEditQuestion': new FormControl(null, Validators.required)
  });

  onAdd() {
    console.log(this.teamId);
    let user: User = JSON.parse(localStorage.getItem('currentUser')!);
    this.uid = user.id!;

    this.question = {
      id: this.getquestionId(),
      'teamid': this.teamId,
      'ques': this.createQuestion.value.quesion
    }

    this.onAddquestions(this.question);
    // let teamQues: questions[] = this.onAssignQues();

    // //questions array for team assign data set
    // let ques:string[] = []
    // teamQues.map(q => {
    //   ques.push(q.ques);
    // });

    let ques: string[] = this.quesServices.getQuestions(this.teamId)
    let teamAssignQues: assignQuestion = {
      id: this.id,
      teamid: this.teamId,
      question: ques,
      uid: this.uid
    }

    this.quesServices.addAssignQuestion(teamAssignQues);
    this.createQuestion.reset()

  }

  // getTeamName(){
  //   let teams:Teams[]=JSON.parse(localStorage.getItem('teams')!)
  //   this.teamName=teams
  // }
  onAddquestions(q: questions) {
    this.questions = JSON.parse(localStorage.getItem('questions')!)
    if (this.questions == null) {
      this.questions = [q]
      localStorage.setItem('questions', JSON.stringify(this.questions));
    } else {
      this.questions.push(q)
      localStorage.setItem('questions', JSON.stringify(this.questions));
    }

    this.quesServices.addedQuestion.next(this.questions)
    // console.log(JSON.parse(localStorage.getItem('questions')!))
  }

  onAssignQues() {
    let questions: questions[] = JSON.parse(localStorage.getItem('questions')!);
    let teamQuestion = questions.filter(q => this.teamId === q.teamid);
    //  console.log(teamQuestion);
    return teamQuestion;
  }

  getquestionId() {
    const ques = JSON.parse(localStorage.getItem('questions')!)

    if (ques == null) {
      this.quesId = 1;
      console.log('if')
    } else {
      this.quesId = ques.length + 1
      console.log('else')
    }
    console.log('id', this.quesId)
    return this.quesId;
  }

  // onAddemp() {
  //   let arr = 'kashifa@gmail.com'
  //   // let Teams: Teams[] = JSON.parse(localStorage.getItem('teams')!)
  //   // let currentTeam: Teams[] = Teams.filter(t => t.teamId == this.teamId);
  //   let currentTeam: Teams[] = this.employerServices.getCurrentTeam(this.teamId)
  //   console.log(currentTeam)
  //   let currentTeamEmp: string[] = currentTeam[0].employees

  //   console.log(currentTeamEmp)
  //   let present = false

  //   currentTeamEmp.map(emp => {
  //     if (emp == arr) {
  //       console.log(emp)
  //       present = true;

  //     }

  //   })
  //   if (!present) {
  //     currentTeamEmp.push(arr);
  //     console.log('pushed')
  //   }
  // }

  switchMode() {
    // localStorage.removeItem('questions')
    // this.onEditQuestionArray()
    this.isEditMode = !this.isEditMode;

    //     var arr1 = [1,2,3,4],
    //     arr2 = [2,4],
    //     res = arr1.filter(item => !arr2.includes(item));
    // console.log(res);

  }

  addQuesionSwitch() {
    this.addEmpMode = false;
    this.addQuesModde = true;
    this.editQuesMode = false;
  }
  editQuesionSwitch() {
    this.addEmpMode = false;
    this.addQuesModde = false;
    this.editQuesMode = true;
  }
  addEmployeeSwitch() {
    this.addEmpMode = true;
    this.addQuesModde = false;
    this.editQuesMode = false;
  }

  getQuestions() {
    return this.quesServices.getQuestions(this.teamId);
  }
  onEdit() {
    //  localStorage.removeItem('questions')
    //  console.log(JSON.parse(localStorage.getItem('questions')!))
    let editQues = {
      'editQuestion': this.editQuestion.value.editQuestion,
      'toEditQuestion': this.editQuestion.value.toEditQuestion
    }

    let ques: string[] = this.quesServices.getQuestions(this.teamId);

    console.log('ques',ques)
    let quesAfterEdit: string[] = ques.map((q) => {
      if (q == editQues.toEditQuestion) {

        q = editQues.editQuestion;
        return q;
      }
      return q;
    })

    let teamEditedQues: assignQuestion = {
      id: this.id,
      teamid: this.teamId,
      question: quesAfterEdit,
      uid: this.uid
    }
    this.quesServices.addAssignQuestion(teamEditedQues);
        this.onEditQuestionArray();
    console.log(JSON.parse(localStorage.getItem('questions')!))
    this.ques = this.getQuestions();
    this.editQuestion.reset()

  }

  onEditQuestionArray() {
    let questions: questions[] = JSON.parse(localStorage.getItem('questions')!)
    let editedQues = questions.map(q => {
      if (q.teamid == this.teamId && q.ques == this.editQuestion.value.toEditQuestion) {
        q.ques = this.editQuestion.value.editQuestion;
        return q
      }
      return q
    });

    localStorage.setItem('questions', JSON.stringify(editedQues));


    // this.questions.push(EditedQues)
    // localStorage.setItem('questions', JSON.stringify(this.questions));

  }

  getCurrentTeamName() {
    let currentTeam: Teams[] = this.employerServices.getCurrentTeam(this.teamId);

    this.teamName = currentTeam[0].teamName;
    // console.log(this.teamName)
    this.teamCategory = currentTeam[0].teamcategory
  }
  getCurrentTeamEmployees() {
    let currentTeam: Teams[] = this.employerServices.getCurrentTeam(this.teamId);
    this.currentTeamEMployees = currentTeam[0].employees
    let allteams:Teams[]=this.employerServices.getTeams()
    // console.log('all team',allteams)
  }
  getEmployeesRemains() {
    let allEmployees: string[] = this.employerServices.getEmployees()
    // console.log(this.currentTeamEMployees)
    this.EmployeesArray = allEmployees.filter(item => !this.currentTeamEMployees.includes(item));

  }
  addMoreEmployees(){
    this.employees.map(emp=>{
      this.currentTeamEMployees.push(emp);
    })
    // console.log(this.currentTeamEMployees)
    let teams:Teams[]=this.employerServices.getTeams();
    let curreantTeam:Teams[]= this.employerServices.getCurrentTeam(this.teamId);
    console.log(curreantTeam)
    curreantTeam.map(t=>{
      t.employees=this.currentTeamEMployees
    })
    console.log(curreantTeam);
    teams.map(team=>{
      if(team.teamId==this.teamId){
        console.log('running')
        team.employees = curreantTeam[0].employees
      }
    })
    // console.log('new all team',teams)

    this.createNewAddedUser();
    localStorage.setItem('teams',JSON.stringify(teams))

  }
  createNewAddedUser() {
    let allEmployees = this.employerServices.getEmployees();
    let newEmp = this.employees.filter(item => !allEmployees.includes(item));
    if (newEmp) {
      let userId = 0
      newEmp.map(emp => {
        userId = this.authServices.generateUserID();
        let empName= emp.substring(0,5);
        let emppObj: User = {
          'id': userId,
          'name':empName,
          'email': emp,
          'password': '123456'
        }
        this.authServices.createUser(emppObj)
      })
      console.log(JSON.parse(localStorage.getItem('SignupUsers')!))
    }
  }
  // chips functions------------------------

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
      console.log(this.employees)
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
  setTime(){
    let time= new Date().toLocaleTimeString();
    console.log(time)
  }

}
