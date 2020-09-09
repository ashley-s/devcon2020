import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { PersonalInformation } from '../model/model';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  @Input("mainForm") mainForm: FormGroup;
  @Input("formStatus") mainFormStatus: NgForm;
  personalInfo: PersonalInformation = <PersonalInformation>{};
  @Output("modelUpdate") modelUpdate = new EventEmitter<PersonalInformation>();

  personalInfoForm: FormGroup;
  constructor(private fb: FormBuilder) {
    
  }

  ngOnInit() {
    this.personalInfoForm = this.fb.group({
      fname: ["", [Validators.required, Validators.minLength(5)]],
      lname: ["", [Validators.required]]
    });
    this.mainForm.addControl("personalInfo", this.personalInfoForm);
    this.onChanges();
  }

  get fname() {
    return this.personalInfoForm.get('fname');
  }

  get lname() {
    return this.personalInfoForm.get('lname');
  }

  private onChanges() {
    this.personalInfoForm.valueChanges.subscribe((data: PersonalInformation) => {
      this.personalInfo.fname = data.fname;
      this.personalInfo.lname = data.lname;
      this.modelUpdate.emit(this.personalInfo);
    })
  }

}
