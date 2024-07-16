import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orders: any[];
  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit(): void {

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

  getProductNames(orderItems: any[]) {
    return orderItems
      .filter(item => item.product !== null)
      .map(item => `${item.product.pname} (${item.quantity})`)
      .join(', ');
  }

}
