import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  @Input("mainForm") mainForm: FormGroup;
  @Input("formStatus") mainFormStatus: NgForm;

  personalInfoForm: FormGroup;
  constructor(private fb: FormBuilder) {
    
  }

  ngOnInit() {
    this.personalInfoForm = this.fb.group({
      fname: ["", [Validators.required, Validators.minLength(5)]],
      lname: ["", [Validators.required]]
    });

    this.mainForm.addControl("personalInfo", this.personalInfoForm);
    //this.onChanges();
  }

  get fname() {
    return this.personalInfoForm.get('fname');
  }

  get lname() {
    return this.personalInfoForm.get('lname');
  }

}
