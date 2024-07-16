import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contacts: any = [];
  addContactForm: FormGroup
  constructor(private http:HttpClient, private formBuilder:FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.addContactForm = this.formBuilder.group({
      fname:['', Validators.required],
      lname:['', Validators.required],
      email:['', Validators.required],
      message:['', Validators.required],
    })
  }

  addContact(){
    
    if (this.addContactForm.valid) {
      let userContact = this.addContactForm.value;
      const token= localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }

    const headers = { Authorization: `Bearer ${token}` };

    this.http.post('http://localhost:3000/api/v1/contacts', userContact, {headers})
    .subscribe((contact) => {
      userContact = contact;
      console.log('contact sent successfully', contact);
    }, (error) => {
      console.error('Error fetching data', error);
    });
  }
}
}
