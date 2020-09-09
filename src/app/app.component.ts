import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, NgForm, FormBuilder, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mainForm: FormGroup;
  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.mainForm = this.fb.group({
      personalInfo: this.fb.group({
        fname: ["", [Validators.required, Validators.minLength(5)]],
        lname: ["", [Validators.required]]
      }),
      contactInfo: this.fb.group({
        address: ["", [Validators.required]],
        phone: ["", [phoneValidatorFactory('mobile')]]
      })
    })
    //this.onChanges();
  }

  get fname() {
    return this.mainForm.get('personalInfo.fname');
  }

  get lname() {
    return this.mainForm.get('personalInfo.lname');
  }

  get address() {
    return this.mainForm.get('contactInfo.address');
  }

  get phone() {
    return this.mainForm.get('contactInfo.phone');
  }

  submitForm(form: NgForm) {
    console.log(form.valid);
    console.log('-----------');
    console.log(form.status);
    console.log('-----------');
    console.log('-----------');
    console.log(form.value);
    console.log('-----------');
  }
}

/**
 * The function's definition is take an abstract control as an argument and 
 * return an object of type ValidationErrors or null
 * @param control abstract control as parameter
 */
export function validateMobilePhone(control: FormControl): ValidationErrors | null {
  if (control.value && control.value.length != 8) {
    return {
      message: "Mobile Phone Number should have 8 numbers"
    }
  }
  if (control.value && control.value.substr(0, 1) != "5") {
    return {
      message: "Mobile Phone Number should start with 5"
    }
  }
  return null;
}

/**
 * a factory function that return a function
 * @param type 
 */
export function phoneValidatorFactory(type: string) {
  return function(control: AbstractControl): ValidationErrors | null {
    if (type == 'mobile') {
      if (control.value && control.value.length != 8) {
        return {
          message: "Mobile Phone Number should have 8 numbers"
        }
      }
      if (control.value && control.value.substr(0, 1) != "5") {
        return {
          message: "Mobile Phone Number should start with 5"
        }
      }
    } else if (type == 'fixedline') {
      if (control.value && control.value.length != 7) {
        return {
          message: "Fixed line Number should have 7 numbers"
        }
      }
      if (control.value && control.value.substr(0, 1) != "6") {
        return {
          message: "Fixed line Number should start with 6"
        }
      }
    }
  }
}
