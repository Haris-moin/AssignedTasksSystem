import { AnswersServices } from './../shared/answers/answers.service';
import { Answer } from './../shared/answers/answer.model';
import { map } from 'rxjs/operators';
import { Answers } from './../shared/answers/answers.model';
import { User } from './../user.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { questions } from './../employer/assignQuestions/question.model';
import { FormGroup, FormControl, Form, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employeeQues:string[]=[]
  form!: FormGroup;
  isQuesAvailable=true;

  get questions(): FormArray{
    return this.form.get('answers') as FormArray;
  }

  teamId!:number;
  constructor(private route:ActivatedRoute, private router:Router, private fb:FormBuilder, private answerServices:AnswersServices) { }


  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.teamId = +params['id'];
      }
    )
    this.getDisplayQuestions(this.teamId);
    this.generateForm()
    console.log(JSON.parse(localStorage.getItem('Answers')!))
  }

  generateForm(){
    this.form = this.fb.group({
      answers: this.fb.array([])
    })

    for (const question of this.employeeQues) {
      this.questions.push(this.fb.group({
        answer: ['', Validators.required]
      }))
    }
  }

  // employeeAnswers= this.fb.group({
  //   'answers':this.fb.array([],Validators.required)
  // })

  // get answers():FormArray{
  //   return <FormArray>this.employeeAnswers.get('answers');
  // }



  onSubmit(){
    // for(let i=0; i<this.employeeQues.length;i++){
    //   const controls =new FormControl(null,Validators.required);
    //   (<FormArray>this.employeeAnswers.get('answers'))!.push(controls);
    // }

    // console.log(this.employeeAnswers.value)
    let ans:Answer[]=[]
    let date= this.getCurrentDate();
this.employeeQues.map((ques,index)=>{
  let obj = {
    que:ques,
    ans:this.form.value.answers[index].answer,
    date:date
  }
  ans.push(obj)
})

console.log(ans)
 this.answerServices.createAnswers(ans,this.teamId);
this.router.navigate(['/team'])
   }

  getDisplayQuestions(teamid:number){

      let ques:questions[] = []
      let questions:questions[] = JSON.parse(localStorage.getItem('questions')!);
     ques= questions.filter(q=> q.teamid==teamid);
     let allQuest:string[]=[]
     ques.map(q=>{
       allQuest.push(q.ques);
     })

// console.log('ques',allQuest)

let user:User= JSON.parse(localStorage.getItem('currentUser')!);
let uid=user.id;

let answers:Answers[]=JSON.parse(localStorage.getItem('Answers')!);
let userAns:Answers[]=[]
if(answers){
  userAns=answers.filter(ans=>ans.tid==this.teamId && ans.uid==uid)
}


if(userAns[0]){
  // console.log('ans',userAns[0].answers)
  let answeredQues:string[]=[]
  userAns[0].answers.map(ques=>{
  answeredQues.push(ques.que);
  })

  let remain= allQuest.filter(ques => !answeredQues.includes(ques));

this.employeeQues=remain
// if(remain[0]){
//   this.isQuesAvailable=true;
// }else{
//   this.isQuesAvailable=false;
// }

}else{
  this.employeeQues=allQuest
}

this.isQuesAvailable= (this.employeeQues[0])? true : false;
console.log('this',this.isQuesAvailable)

// if(userAns[0]){
//   // let remain = answers.filter(ans => !userAns.includes(ans));
//   // console.log(remain)

// }else{
//   console.log('not present')
// }
 }
 getCurrentDate(){
    // Get Date -----------------------

  let today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  let date = mm + '/' + dd + '/' + yyyy;
  console.log(date);
  return date
 }
}
