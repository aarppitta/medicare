import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;  
  
  constructor(
    private formBuilder:FormBuilder,
    private http:HttpClient,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email:'',
      password:''
    })
  }

  validEmail = (email:any) => {
    var validRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(email.match(validRegex)){
      return true;
    }else{ 
      return false;}
  }

  login(){
    let user = this.form.getRawValue();
    
    if( user.email == '' || user.password == ''){
      Swal.fire('Error', 'Please enter all the fields', 'error')
    }else if(!this.validEmail(user.email)){
      Swal.fire('Error', 'Please enter a valid Email', 'error')
    } else {
      this.http.post('http://localhost:3000/api/v1/users/login', { email: user.email, password: user.password })
        .subscribe((response: any) => {
          // Save token in local storage
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          localStorage.setItem('email', user.email);

          // Navigate to user or admin dashboard
          if (response.isAdmin === true) {
            // Navigate to admin dashboard
            this.router.navigate(['/admin']);
          } else {
            // Navigate to user dashboard
            this.router.navigate(['/home']);
          }
        }, (error) => {
          console.log(error);
          Swal.fire('Error', 'Login failed', 'error');
        });
    }
  }
}
