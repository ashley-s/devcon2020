import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { ContactInformation } from '../model/model';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {

  contactInfoForm: FormGroup;

  @Input("mainForm") mainForm: FormGroup;
  @Input("formStatus") mainFormStatus: NgForm;
  contactInfo: ContactInformation = <ContactInformation>{};
  @Output("modelUpdate") modelUpdate = new EventEmitter<ContactInformation>();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.contactInfoForm = this.fb.group({
      address: ["", [Validators.required]],
      phone: ["", [ContactInfoComponent.validateMobilePhone]]
    });
    this.mainForm.addControl("contactInfo", this.contactInfoForm);
    this.onChanges();
  }

  get address() {
    return this.contactInfoForm.get("address");
  }

  get phone() {
    return this.contactInfoForm.get("phone");
  }

  static validateMobilePhone(control: FormControl) {

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

  private onChanges() {
    this.contactInfoForm.valueChanges.subscribe((data: ContactInformation) => {
      this.contactInfo.address = data.address;
      this.contactInfo.phone = data.phone;
      this.modelUpdate.emit(this.contactInfo);
    })
  }
}
