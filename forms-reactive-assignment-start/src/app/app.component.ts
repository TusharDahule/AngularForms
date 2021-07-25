import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  projectForm: FormGroup;

  ngOnInit(){
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required, this.forbiddenProjectName.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      'status': new FormControl('Stable')
    });

  }

  forbiddenProjectName(control:FormControl) : {[s:string]: boolean}{
    if(control.value==="Test"){
      return {'forbiddenName': true};
    }
     return null;
  }

  onSubmit(){
    console.log(this.projectForm);
  }

  forbiddenEmails(control: FormControl) : Promise<any> | Observable<any> {
    const promise = new Promise(
      (resolve, reject) =>{
        setTimeout(
          ()=>{
            if(control.value==="test@gmail.com"){
              resolve({'forbiddenEmailName': true});
            }
            else{
              resolve(null);
            }
          }, 1500
        );
      }
    );
    return promise;
  }

}
