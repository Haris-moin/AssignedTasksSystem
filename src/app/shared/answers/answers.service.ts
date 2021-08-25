
import { User } from './../../user.model';
import { Answers } from './answers.model';
import { Injectable } from "@angular/core";
import { Answer } from './answer.model';

@Injectable({ providedIn: 'root' })
export class AnswersServices {
 ans:Answers[]=[{
   tid:1,
   uid:90,
   name:'user',
   answers:[{que:'what is your name',ans:'my name is user',date:'08/20/2021'}]

 }]


  getAnswersByDate(teamId: number, emp: string, date: string) {

    // localStorage.setItem('Answers',JSON.stringify(this.ans))

    let currentEmpAns = this.getEmployeeAnswers(teamId, emp);


    let currentEmpAnsByDate: Answers[] = []
    let empName: string = '';
    let empId: number = 0;
    let ansByDate: {
      que: string,
      ans: string,
      date: string
    }[] = []
    currentEmpAns.map((ans) => ans.answers.filter(answer => {

      empName = ans.name
      if (answer.date == date) {
        ansByDate.push(answer)
      }

    }))

    currentEmpAnsByDate[0] = {
      uid: empId,
      name: empName,
      tid: teamId,
      answers: ansByDate
    }

    console.log(currentEmpAnsByDate)
    return currentEmpAnsByDate
  }


  getEmployeeAnswers(teamId: number, employee: string) {
    // localStorage.setItem('Answers', JSON.stringify(this.ans))
    let answers: Answers[] = JSON.parse(localStorage.getItem('Answers')!)
    let uid = this.getCurrentEmployeeid(employee);
    let currentEmpAnswers:Answers[]=[]
    if (answers) {
      currentEmpAnswers = answers.filter(user => user.uid == uid && user.tid == teamId);
    }

    return currentEmpAnswers
  }

  getCurrentEmployeeid(employee: string) {
    let users: User[] = JSON.parse(localStorage.getItem('SignupUsers')!);
    console.log(users)
    let currentEmployee: User[] = users.filter(user => user.email == employee)
    let CurrentEmpId = currentEmployee[0].id
    console.log(CurrentEmpId);
    return CurrentEmpId
  }
  getAllMembersAnswers(teamid: number) {
    // localStorage.setItem('Answers',JSON.stringify(this.ans))
    //    let AllMembersAnswers: {
    //   que:string,
    //   ans:string,
    //   time:string,
    //   date:string
    // }[]=[]
    let answers: Answers[] = JSON.parse(localStorage.getItem('Answers')!)
    console.log('all ans', answers)
    let AllMembers: Answers[] = []
    if (answers) {
      AllMembers = answers.filter(ans => ans.tid == teamid);
      console.log('all members', AllMembers)
    }


    //    AllMembers.map(ans=>{
    //    ans.answers.map(val=>{
    //     AllMembersAnswers.push(val);
    //   });
    // });
    return AllMembers;
  }

  // Get Date -----------------------

  // let today = new Date();
  // var dd = String(today.getDate()).padStart(2, '0');
  // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  // var yyyy = today.getFullYear();
  // let date = mm + '/' + dd + '/' + yyyy;
  // console.log(date)

  createAnswers(answer: Answer[], teamid: number) {
    console.log(answer)
    let allAns: Answers[]=[]
    allAns = JSON.parse(localStorage.getItem('Answers')!)







    let user: User = JSON.parse(localStorage.getItem('currentUser')!);
    let userid: number = user.id!;
    let userName: string = user.name!;
    let currentTeamAns:Answers[]=[]
    // debugger;
    //==================
        if(allAns===null){
          let newAnsObj: Answers = {
            uid: userid,
            name: userName,
            tid: teamid,
            answers: answer
          }
      allAns=[newAnsObj]
      localStorage.setItem('Answers', JSON.stringify(allAns))
    }
//=======================
    else{
    currentTeamAns  = allAns.filter(ans => ans.tid == teamid && ans.uid == userid)

    if (currentTeamAns[0]) {

      answer.map(ans => {
        currentTeamAns[0].answers.push(ans);
      })

      localStorage.setItem('Answers', JSON.stringify(allAns))
    } else {
      let newAnsObj: Answers = {
        uid: userid,
        name: userName,
        tid: teamid,
        answers: answer
      }
      allAns.push(newAnsObj);

      localStorage.setItem('Answers', JSON.stringify(allAns))
    }
    console.log(allAns)
  }
    //
  }
}
