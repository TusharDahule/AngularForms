import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('f') signupForm: NgForm;
  subscriptions = ['Basic','Advanced','Pro'];
  defaultSubscription = 'Advanced';
  user = {
    email:'',
    subscription:'',
    password:''
  };
  submitted = false;

  onSubmit(){
    this.submitted = true;
  console.log(this.signupForm);
  this.user.email = this.signupForm.value.email;
  this.user.subscription = this.signupForm.value.subscription;
  this.user.password  =this.signupForm.value.password;

  console.log(this.user.email);
  console.log(this.user.subscription);
  console.log(this.user.password);
  }
}
