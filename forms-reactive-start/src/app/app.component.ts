import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];

  signupForm: FormGroup;
  forbiddenUserNames= ['Chris','Lanna'];

  ngOnInit(){
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),/* Angular is calling forbiddenNames not us when it checks the validity. To fix, we need to bind to this class */
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)/* Asynchronous email validator should not be in the normal validators arrays */
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    // this.signupForm.valueChanges.subscribe( /* FormGroup has two observables : valueChanges & statusChanges (invalid, pending, valid) */
    //   (value)=>{console.log(value);}
    // );

    this.signupForm.statusChanges.subscribe(
      (value)=>{ console.log("Form is :"+value);}
    );
  }



  onSubmit(){
    console.log(this.signupForm);
  }
  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls(){
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  /* Creating custom validator */ /* Error code will be added in individual controller object. For below on username control */
  forbiddenNames(control: FormControl) : {[s:string]:boolean}{
    if(this.forbiddenUserNames.indexOf(control.value) !== -1){/* you will get an error here if not binded your custom validator */
      return {'nameIsForbidden':true};
    }
    return null;
  }

  /* Asychronous validator. It will have to wait for some time. */
  forbiddenEmails(control:FormControl) : Promise<any> | Observable<any>{
    const promise = new Promise<any>(
      (resolve,reject)=>{
        setTimeout(
          ()=>{
            if(control.value==='test@test.com'){
              resolve({'emailIsForbidden':true});
            }else{
              resolve(null);
            }
          }, 1500
        );
      }
    );
    return promise;
  }
}
