import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form:FormGroup;

  constructor( 
    private formBuilder:FormBuilder,
    private http:HttpClient,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name:'',
      email:'',
      password:'',
      phone:'',
      postcode:'',
      street:'',
      apartment:'',
      city:''
    })
  }

ValidateEmail = (email: any) => {
  
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

  if(email.match(validRegex)){
    return true;
  }else{
    return false;
  }
}


register(){
  let user =  this.form.getRawValue();
  console.log(user);

  if(user.name == '' || user.email == '' || user.password == '' || user.contact == '' || user.postcode == '' || user.street == '' || user.apartment == '' || user.city == '')
  {
    Swal.fire('Error', 'Please Enter all Fields!', 'error')
  }

  else if(!this.ValidateEmail(user.email))
  {
    Swal.fire('Error', 'Please Enter valid Email!', 'error')
  }
  else{
    this.http.post("https://medicare-backend-ten.vercel.app/api/v1/users/register", user,{
      withCredentials:true
    }).subscribe(() => {
      this.router.navigate(['/home']), (e:any) => {
      Swal.fire('Error', e.error.message, 'error')
     }
    })
  }
}
}
