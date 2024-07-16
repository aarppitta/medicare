import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  updateForm: FormGroup;
  id: any;
  user: any;
  
  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    this.http.get(`http://localhost:3000/api/v1/users/${this.id}`, { headers }).subscribe((user: any) => {
      console.log('User:', user);
      this.user = user;
      this.updateForm = this.formBuilder.group({
        name: [this.user.name , Validators.required],
        email: [this.user.email, [Validators.required, Validators.email]],
        phone: [this.user.phone, Validators.required],
        postcode: [this.user.postcode, Validators.required],
        street: [this.user.street, Validators.required],
        apartment: [this.user.apartment, Validators.required],
        city: [this.user.city, Validators.required]
      });
    });
  }

  updateUser(event: Event, user: any){

    // event.preventDefault();
    if(this.updateForm.valid){
      const updatedUserData = this.updateForm.value;
      const token= localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }

    const headers = { Authorization: `Bearer ${token}` };

      this.http.put(`http://localhost:3000/api/v1/users/${this.id}` ,updatedUserData , { headers })
      .subscribe((result)=>{
        this.router.navigate(['/user-details']);
      },
      error => {
        console.error('Error updating user:', error);
      })
    }
  }

}  


