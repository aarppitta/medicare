import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { randomBytes } from 'crypto';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  
  addUserForm:FormGroup;
  
  constructor(private formBuilder:FormBuilder, private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      name:['', Validators.required],
      email:['', Validators.required],
      phone:['', Validators.required],
      postcode:['', Validators.required],
      street:['', Validators.required],
      apartment:['', Validators.required],
      city:['', Validators.required],
      
    })
  }
  // Generate a random password
  generateRandomPassword = () => {
    const length = 10; // Set the desired length of the password
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  addUser(){
    if (this.addUserForm.valid) {
      let userData = this.addUserForm.value;
     
      // Call the generateRandomPassword method
      userData['password'] = this.generateRandomPassword();

      const token= localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }

    const headers = { Authorization: `Bearer ${token}` };

      this.http.post('http://localhost:3000/api/v1/users/register', userData, {headers})
        .subscribe((result: any) => {
          console.log('User Added Successfully', result);
        this.router.navigate(['/user-details']);

        }, (error) => {
          console.log('Error while adding user', error);
        });
    }
  }
}
