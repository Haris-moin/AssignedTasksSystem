import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Answers } from './../../shared/answers/answers.model';
import { Teams } from './../teams/Teams.model';
import { EmployerServices } from './../employer.services';
import { ActivatedRoute, Params } from '@angular/router';
import { AnswersServices } from './../../shared/answers/answers.service';
import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  dateLabel=''
  currentTeamEmployees!: string[]
  allMemberAns!:Answers[]
  teamId!: number
  constructor(private route: ActivatedRoute, private answersServices: AnswersServices, private employeeServices: EmployerServices) { }
  selectedEmpAnswers!:Answers[]
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.teamId = +params['id'];
      }
    )
    this.allMemberAns = this.answersServices.getAllMembersAnswers(this.teamId)
    console.log(this.selectedEmpAnswers)
    this.getCurrentTeamEmployees()
  }

  filterForm = new FormGroup({
    'emp':new FormControl(null,Validators.required),
    'date':new FormControl(null)
  })
  // displayeAnsByDate() {

  //   this.selectedEmpAnswers = this.answersServices.getAnswersByDate(this.teamId, 'moiz@gmail.com', '12-16-2021');

  // }
  // displayAnsByEmpFilter() {
  //   let selectedAnsArray: Answers[]
  //   selectedAnsArray = this.answersServices.getEmployeeAnswers(this.teamId, 'moiz@gmail.com');
  //   this.selectedEmpAnswers = selectedAnsArray[0].answers
  // }
  getCurrentTeamEmployees() {
    let currentTeam: Teams[] = this.employeeServices.getCurrentTeam(this.teamId);

    this.currentTeamEmployees = currentTeam[0].employees

  }

  displayEmployeeAnswers(){

    console.log(this.filterForm.value.emp)
    console.log(this.filterForm.value.date)

    if(this.filterForm.value.date){
//converting Date in formate

  let today = this.filterForm.value.date;
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  let date = mm + '/' + dd + '/' + yyyy;
  this.dateLabel=date

  console.log(date)

  // ----------------------------

   this.allMemberAns= this.answersServices.getAnswersByDate(this.teamId,this.filterForm.value.emp,date)

    }else{
      this.allMemberAns=this.answersServices.getEmployeeAnswers(this.teamId,this.filterForm.value.emp)

    }

 console.log('all members',this.allMemberAns)

  }
}
