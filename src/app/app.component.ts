import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Observer, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name: FormControl;
  nameValue: string;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    //standard way of creating a formControl
    this.name = new FormControl("", [Validators.required, Validators.minLength(5)]);
    //another way of creating a formControl or a formGroup instance for complex forms
    // this.name = this.fb.control("", [Validators.required, Validators.minLength(5)]);
  }

}
