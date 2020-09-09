import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, NgForm, FormBuilder } from '@angular/forms';
import { Registration } from './model/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //name: FormControl;
  nameValue: string;
  mainForm: FormGroup;
  registrationObj: Registration = <Registration>{};
  constructor(private fb: FormBuilder) {
    
  }

  ngOnInit() {
    this.mainForm = new FormGroup({});
    //this.onChanges();
  }

  setPersonalInfo($event) {
    this.registrationObj.personalInfo = $event;
  }

  setContactInfo($event) {
    this.registrationObj.contactInfo = $event;
  }

  submitForm(form: NgForm) {
    console.log('-----------');
    console.log(this.registrationObj);
    console.log('-----------');
    console.log('-----------');
    console.log(form.value);
    console.log('-----------');
  }
}
