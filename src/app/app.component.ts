import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, Validators, FormGroup, NgForm, FormBuilder, FormArray, ValidationErrors } from '@angular/forms';
import { Observable, of, Observer, observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Registration, Course } from './model/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  //name: FormControl;
  nameValue: string;
  mainForm: FormGroup;
  holderRegistrationObj: Registration;
  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {

    this.mainForm = this.fb.group({
      courses: this.fb.array([])
    })
    this.holderRegistrationObj = {} as Registration;
    //this.onChanges();
    this.holderRegistrationObj = this.getDataFromService();
    //prefill if there is any data availabl
    this.holderRegistrationObj.courses.forEach((course: Course) => {
      this.courses.push(this.createFormGroup(course));
      this.subscribeToFormControls(this.courses.controls[this.courses.length - 1] as FormGroup);
    });
  }

  ngAfterViewInit() {
    this.onChanges();
  }

  submitForm(form: NgForm) {
    console.log('-----------');
    console.log(this.holderRegistrationObj);
    console.log('-----------');
    
  }

  get courses(): FormArray {
    return <FormArray>this.mainForm.get("courses");
  }

  setPersonalInfo($event) {
    this.holderRegistrationObj.personalInfo = $event;
  }

  setContactInfo($event) {
    this.holderRegistrationObj.contactInfo = $event;
  }

  addcourse(course: Course) {
    // this.courses.push(this.fb.group({
    //   courseId: [null, [Validators.required, this.validateCourseId]],
    //   courseName: [null, Validators.required],
    //   payment: [null, Validators.required]
    // }));
    // //subscribe to a control value changes
    // const courseIdControl = <FormControl>this.courses.controls[this.courses.length - 1].get("courseId");
    // this.subscribeToCourseIdChanges(courseIdControl);

    this.courses.push(this.createFormGroup(course));
    //subscribe to a control value changes
    const formGroup = <FormGroup>this.courses.controls[this.courses.length - 1];
    this.subscribeToFormControls(formGroup);
  }

  private createFormGroup(course:Course = {courseId: null, courseName: null, payment: null, cardNumber: null} as Course) {
    return this.fb.group({
      courseId: [course.courseId, [Validators.required, this.validateCourseId]],
      courseName: [course.courseName, Validators.required],
      payment: [course.payment, Validators.required],
      cardNumber:[null]
    });
  }

  private subscribeToFormControls(form: FormGroup) {
    const courseIdControl = form.get("courseId");
    const paymentControl = form.get("payment");
    const cardNumberControl = form.get("cardNumber");

    courseIdControl.valueChanges.subscribe((data) => {
      if (courseIdControl.valid) {
        courseIdControl.setAsyncValidators(this.validateCourseIdBackEnd);
      } else {
        courseIdControl.setAsyncValidators(null);
      }
      courseIdControl.updateValueAndValidity({
        emitEvent: false
      });
    });

    paymentControl.valueChanges.subscribe((data) => {
      if(data == "Cash") {
        cardNumberControl.setValidators(null);
      } else {
        cardNumberControl.setValidators(Validators.required);
      }
      cardNumberControl.updateValueAndValidity();
    })
  }

  removeCourse(idx) {
    this.courses.removeAt(idx);
  }

  validateCourseId(ctrl: FormControl) {
    let id: string = ctrl.value;
    if (id && id.length == 5) {
      if (id.substr(0, 1) == "C") {
        return null;
      } else {
        return {
          message: "Course Id should start with a 'C'"
        }
      }
    } else {
      return {
        message: "Course Id should be 5 characters"
      }
    }
  }

  validateCourseIdBackEnd(ctrl: FormControl): Observable<ValidationErrors> {
    //let checkDigit = Math.random();
    let id: string = ctrl.value;
    let listId: any[] = ['C1234'];
    
    if (listId.indexOf(id) >= 0) {
      return of(null).pipe(delay(3000));
    } else {
      return of({message: "This courseId does not exist"}).pipe(delay(3000));
    }


  }

  subscribeToCourseIdChanges(ctrl: FormControl) {
    let courseId$ = ctrl.valueChanges;
    courseId$.subscribe((data) => {
      if (ctrl.valid) {
        ctrl.setAsyncValidators(this.validateCourseIdBackEnd);
      } else {
        ctrl.setAsyncValidators(null);
      }
      ctrl.updateValueAndValidity({
        emitEvent: false
      });
    })
  }

  private onChanges() {
    this.mainForm.get('courses').valueChanges.subscribe((data: Course[]) => {
      this.holderRegistrationObj.courses = data;
    })
  }

  private getDataFromService(): Registration {
    return JSON.parse(`{
      "contactInfo": {
        "address": "Curepipe",
        "phone": "59050401"
      },
      "personalInfo": {
        "fname": "Ashley",
        "lname": "Shookhye"
      },
      "courses": [{
        "courseId": "C1234",
        "courseName": "Maths",
        "payment": "Cash"
      }, {
        "courseId": "C1235",
        "courseName": "English",
        "payment": "Cash"
      }]
    }`) as Registration;
  }
} 
