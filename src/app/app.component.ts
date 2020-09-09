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
  status$: Observable<any>
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    //standard way of creating a formControl
    this.name = new FormControl("", [Validators.required, Validators.minLength(5)]);
    //another way of creating a formControl or a formGroup instance for complex forms
    // this.name = this.fb.control("", [Validators.required, Validators.minLength(5)]);
    //binding this formControl instance to an element using the formControl Directive
    //this.name.setValidators();
    this.onChanges();
  }

  onChanges() {
    //returns an observable that emit events whenever the state of control changes
    const nameCtrl$ = this.name.valueChanges;
    //you can subscribe to these events and watch the values and react accordingly
    const observer: Observer<any> = {
      next: (x) => {
        console.log(x)
      },
      error: (x) => {
        console.error(x)
      },
      complete: () => {
        console.log("Stream is completed")
      }
    }
    //only when subscribing, that the values will start flowing
    nameCtrl$.subscribe(observer);
    
    const statusCtrl$ = this.name.statusChanges;
    this.status$ = this.name.statusChanges;
    statusCtrl$.subscribe((data) => {
      console.log(data)
    })
  }
}
