import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any;
  constructor(private http:HttpClient, private router:Router, private cartService:CartService) { }

  ngOnInit(): void {

    const token= localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }

    const headers = { Authorization: `Bearer ${token}` };

    this.http.get<any[]>('http://localhost:3000/api/v1/cart', { headers })
      .subscribe((data) => {
      this.cartItems = data;
      this.cartService.changeCartItems(data);
       console.log('Data fetched successfully', data);
      }, (error) => {
      console.error('Error fetching data', error);
      });
  }

  deleteCartItem(id: string){
    const token= localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }

    const headers = { Authorization: `Bearer ${token}` };

    this.http.delete<any[]>(`http://localhost:3000/api/v1/cart/${id}`, { headers })
      .subscribe((data) => {
     this.cartItems = this.cartItems.filter((item: any) => item._id !== id);
      console.log('Data fetched successfully', data);
      this.cartService.getCartItems();
      }, (error) => {
      console.error('Error fetching data', error);
      });
  }

  updateCartItem(id: string, quantity: number){
    const token= localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }

    const headers = { Authorization: `Bearer ${token}` };


    this.http.put<any[]>(`http://localhost:3000/api/v1/cart/${id}`, {quantity: quantity}, { headers })
      .subscribe((data) => {
    this.cartService.getCartItems();
    this.cartService.incrementNotificationCount();

    this.cartItems.forEach((item: any) => {
      if (item._id === id) {
        item.quantity = quantity;
      }
    });
      console.log('Data fetched successfully', data);
      }, (error) => {
      console.error('Error fetching data', error);
      });
  }

  subTotal() {
    if (Array.isArray(this.cartItems)) {
      return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    } else {
      return 0;
    }
  }
}
