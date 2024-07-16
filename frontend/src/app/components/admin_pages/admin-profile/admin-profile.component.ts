import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  updateForm: FormGroup;
  id: any;
  user: any;
  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    
    
      this.updateForm = this.formBuilder.group({
        name: ['' , Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        postcode: ['', Validators.required],
        street: ['', Validators.required],
        apartment: ['', Validators.required],
        city: ['', Validators.required]
      });
    
  }


  updateUser(){

    if (this.updateForm.valid) {
      let userData = this.updateForm.value;
      const token= localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }

    const headers = { Authorization: `Bearer ${token}` };

    this.http.post('http://localhost:3000/api/v1/users', userData, {headers})
    .subscribe((data) => {
      userData = data;
      console.log('user updated successfully', data);
      this.router.navigate(['/admin']);
    }, (error) => {
      console.error('Error fetching data', error);
    });
  }
  }
}
