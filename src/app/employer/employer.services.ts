import { Teams } from './teams/Teams.model';
import { User } from './../user.model';
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class EmployerServices {

  Teams: any = [];
  displayTeams=[];
  category: string[] = [];
  teamId=0;
  question=[];
  currentUser!:User;
  teamsChanged= new Subject<Teams[]>();
  isEmployer=false;
  constructor() { }
  OnInit() { }

  createTeam(team: any) {

    if (JSON.parse(localStorage.getItem('teams')!) != null) {
      this.Teams = JSON.parse(localStorage.getItem('teams')!)
      this.Teams.push(team);
     localStorage.setItem('teams', JSON.stringify(this.Teams));
    } else {
      this.Teams.push(team);
     localStorage.setItem('teams', JSON.stringify(this.Teams));
    }

    this.teamsChanged.next(this.Teams);
  }

  addCategory(newCtegory:string) {
    if (JSON.parse(localStorage.getItem('categories')!) != null) {
      this.category = JSON.parse(localStorage.getItem('categories')!);
      this.category.push(newCtegory);
      localStorage.setItem('categories', JSON.stringify(this.category));
    } else {
      this.category.push(newCtegory)
      localStorage.setItem('categories', JSON.stringify(this.category));
    }
    return this.category;
  }

  getCategory() {
       return JSON.parse(localStorage.getItem('categories')!);
  }

  getEmployees() {

    this.currentUser=JSON.parse(localStorage.getItem('currentUser')!);
   let Employees:string[] = [];
    let users: User[] = JSON.parse(localStorage.getItem('SignupUsers')!);
    users.map((user: User) => {

      if(user.email!==this.currentUser.email)
        Employees.push(user.email!);

    });
    return Employees;
  }

  getTeams() {
   return this.displayTeams=JSON.parse(localStorage.getItem('teams')!);
  }

  getCurrentTeam(teamId:number){
    let Teams: Teams[] = JSON.parse(localStorage.getItem('teams')!)
    let currentTeam: Teams[] = Teams.filter(t => t.teamId == teamId);
    return currentTeam;
  }
  generateTeamID (){
    const teams =  JSON.parse(localStorage.getItem('teams')!);
    if(teams===null)
    {
      this.teamId=1;
      return  this.teamId
    }else{
      this.teamId=teams.length + 1;
      return this.teamId;
    }
  }

  // addQuestion(question:any){
  //    let teamQuestions:[{'teamid':'','Question':string[]}]=[JSON.parse((localStorage.getItem('teamQuestion')!))];

  //    console.log(teamQuestions)
  //   if(teamQuestions!=null){
  //         console.log('run')
  //    console.log(JSON.parse((localStorage.getItem('teamQuestion')!)))
  //     console.log('here',teamQuestions)

  //     console.log(typeof teamQuestions )
  //    let editQuestions = teamQuestions.map(q=>{
  //       if(question.teamid===q.teamid){
  //         console.log(question)
  //         console.log(question.Question);
  //         q.Question.push(question.Question[0])
  //         console.log(q);
  //         console.log(q.Question)
  //       }
  //     })
  //     console.log(editQuestions)
  //   }else{
  //   let teamQuestions:[{'teamid':'','quesion':string[]}]=question
  //     localStorage.setItem('teamQuestion',JSON.stringify(teamQuestions))
  //   }
  // }

  getIsEmployer(){
   this.isEmployer = JSON.parse(localStorage.getItem('isEmp')!)
    return this.isEmployer;
  }
  setIsEmployer(value:boolean){
    this.isEmployer=value;
    localStorage.setItem('isEmp',JSON.stringify(this.isEmployer));
  }

}
