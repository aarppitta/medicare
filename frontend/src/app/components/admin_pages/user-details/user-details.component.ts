import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {


  users: any[];
  id : '';
  
  constructor(private http:HttpClient,private router:Router) {}

  ngOnInit(): void {

    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }
    const headers = { Authorization: `Bearer ${token}` };

    this.http.get<any[]>('https://medicare-backend-ten.vercel.app/api/v1/users', { headers })
      .subscribe((data) => {
      this.users = data;
      console.log('Data fetched successfully', data);
      }, (error) => {
      console.error('Error fetching data', error);
      });
  }

 
editUser(user: any) {
  
  console.log('User:', user);
  this.router.navigate(['/user-update', user._id], { state: { user: user } });
}

  deleteUser(id: string){
    const token= localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }

    const headers = { Authorization: `Bearer ${token}` };

    this.http.delete<any[]>(`https://medicare-backend-ten.vercel.app/api/v1/users/${id}`, { headers })
      .subscribe((data) => {
      console.log('Data fetched successfully', data);
      }, (error) => {
      console.error('Error fetching data', error);
      });
  }

 
}
