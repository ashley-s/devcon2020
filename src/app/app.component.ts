import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, NgForm, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //name: FormControl;
  nameValue: string;
  mainForm: FormGroup;
  constructor(private fb: FormBuilder) {
    
  }

  ngOnInit() {
    this.mainForm = new FormGroup({});
    //this.onChanges();
  }

  submitForm(form: NgForm) {
    console.log('-----------');
    console.log(form.status);
    console.log('-----------');
    console.log('-----------');
    console.log(form.value);
    console.log('-----------');
  }
}
