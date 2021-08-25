import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmployerServices } from './../employer.services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {


    constructor(private dialog:MatDialog ,private employerServices:EmployerServices) { }
  ngOnInit(): void {


  }
  createCategory = new FormGroup({
    'categoryName':new FormControl(null,Validators.required),
  })
  onAddCategory(){

   if(this.createCategory.valid){
    let newCategory:string=this.createCategory.value.categoryName
    this.employerServices.addCategory(newCategory)
    this.onClose();
   }

  }
  onClose(){
this.dialog.closeAll()
  }


}
