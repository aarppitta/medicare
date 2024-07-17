import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  updateUserForm: FormGroup;
  id:string;
  user:any;

  constructor(
    private http: HttpClient, 
    private formBuilder: FormBuilder, 
    private router:Router, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  
    this.id = this.route.snapshot.paramMap.get('id')!;
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    this.http.get(`https://medicare-backend-ten.vercel.app/api/v1/users/account`, { headers })
    .subscribe((user: any) => {
      console.log('User:', user);
      this.user = user;
      
      this.updateUserForm = this.formBuilder.group({
        name: [this.user.name , Validators.required],
        email: [this.user.email, Validators.required],
        phone: [this.user.phone, Validators.required],
      });
    });
  }

  ValidateEmail = (email: any) => {
  
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  
    if(email.match(validRegex)){
      return true;
    }else{
      return false;
    }
  }

  updateUser(): void {

    if (this.updateUserForm.valid) {
      const token= localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }

    const headers = { Authorization: `Bearer ${token}` };
      this.http.put(`https://medicare-backend-ten.vercel.app/api/v1/users`, this.updateUserForm.value, { headers }).subscribe(
        data => {
          console.log('User updated successfully!');
          this.user = data; // Update this.user with the updated user data
        },
        error => {
          console.error('There was an error!', error);
        }
      );
    }
  }
}
