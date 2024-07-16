import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private http:HttpClient, private router:Router) { }
  sales:any;
  count:any;
  orders: any[];
  ngOnInit(): void {
    
    const token= localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }

    const headers = { Authorization: `Bearer ${token}` };
    this.http.get('http://localhost:3000/api/v1/orders/get/totalsales', {headers}).subscribe((data)=>{
      this.sales = data
      console.log(data);
    },
    (error)=>{
      console.log(error);

  });

  this.getCount();
  this.getRecentOrders()
}

getCount(){
  const token= localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }

    const headers = { Authorization: `Bearer ${token}` };
    this.http.get('http://localhost:3000/api/v1/orders/get/count', {headers}).subscribe((data)=>{
      this.count = data
      console.log(data);
    },
    (error)=>{
      console.log(error);

  });

}

getRecentOrders(){
  const token= localStorage.getItem('token');
  if (!token) {
    this.router.navigate(['/login']);
  }

  const headers = { Authorization: `Bearer ${token}` };

  this.http.get<any[]>('http://localhost:3000/api/v1/orders', { headers })
    .subscribe(order => {
      this.orders = order;
      console.log('Data fetched successfully', order);
    }, (error) => {
      console.error('Error fetching data', error);
    });
}


}



