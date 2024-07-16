import {  HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inquiries',
  templateUrl: './inquiries.component.html',
  styleUrls: ['./inquiries.component.css']
})
export class InquiriesComponent implements OnInit {

  contacts: any[];
  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit(): void {

    const token= localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }

    const headers = { Authorization: `Bearer ${token}` };

    this.http.get<any[]>('http://localhost:3000/api/v1/contacts', {headers})
      .subscribe(contact => {
        this.contacts = contact;
      console.log('Contact fetched successfully', contact);
      }, (error) => {
      console.error('Error fetching data', error);
      });
  }

}
