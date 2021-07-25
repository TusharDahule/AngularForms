import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signupForm:NgForm;

  defaultQuestion = 'pet';
  answer='';
  genders = ['male','female'];
  user = {
    username:'',
    email:'',
    question:'',
    answer:'',
    gender:''
  }
  submitted =  false;
  suggestUserName() {
    const suggestedName = 'Superuser';
    /* this.signupForm.setValue({
      userData:{
        username: suggestedName,
        email:''
      },
      secret:'pet',
      questionAnswer:'',
      gender:'male'
    }); */ /* Not the best approach as it overrides all the values filled by user from UI */

    this.signupForm.form.patchValue({ /* Only updates given fields   */
      userData:{
        username: suggestedName
      }
    });
  }

 /*  onSubmit(form:HTMLFormElement){
    console.log(form);
  } */

  /* onSubmit(form:NgForm){
    console.log(form);
  } *//* Using NgForm we are able to access javascript object */

  onSubmit(){
    console.log(this.signupForm);
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.question = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

    /* this.signupForm.resetForm(); *//*  resetForm is an Angular function tied to a form instance, that orks both for template driven and reactive forms. Also resets intial value. */
    this.signupForm.reset();/* This is for template driven form for HTML. Also resets the form */
    /* Reset Resets the form control, marking it pristine and untouched, and setting the value to null.
        ResetForm: Resets the form value and resets its submitted status. */
  }
}
