import { Subject } from 'rxjs';
import { questions } from './question.model';
import { Injectable } from "@angular/core";
import { assignQuestion } from "./assignQuestion.model";

@Injectable({providedIn:'root'})
export class questionServices{

  id!:number
  assignQuestions:assignQuestion[]=[];
  filterAssques:assignQuestion[]=[];
  addedQuestion= new Subject<string[]>();

  addAssignQuestion(ques:assignQuestion){
    this.assignQuestions=JSON.parse(localStorage.getItem('assignQues')!);
       if(this.assignQuestions==null){
      this.assignQuestions=[];
      this.assignQuestions.push(ques);
      localStorage.setItem('assignQues',JSON.stringify(this.assignQuestions))
    }else{
      this.filterAssques =this.assignQuestions.filter(assignques=>{
      return assignques.teamid !== ques.teamid
      })

      this.filterAssques.push(ques);
      localStorage.setItem('assignQues',JSON.stringify(this.filterAssques));
    }
     console.log(JSON.parse(localStorage.getItem('assignQues')!))



  }

  generateAssignQuesId(){
    const now = new Date()

      this.id=Math.round(now.getTime() / 1000)

    return this.id;
  }

  getQuestions(teamid:number){

    let ques:string[] = []
    let questions: questions[] = JSON.parse(localStorage.getItem('questions')!);
    if(questions){
      let teamQuestion = questions.filter(q => teamid === q.teamid);
      teamQuestion.map(q => {
        ques.push(q.ques);
      });

      this.addedQuestion.next(ques)
    }

     return ques
  }


}
