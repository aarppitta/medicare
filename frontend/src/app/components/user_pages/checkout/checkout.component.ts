import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartItems: any[] ;
  checkoutForm: FormGroup;

  constructor(private http:HttpClient, private formBuilder:FormBuilder, private router:Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }

    const headers = { Authorization: `Bearer ${token}` };

    this.http.get<any[]>('http://localhost:3000/api/v1/cart', { headers })
      .subscribe((data) => {
      this.cartItems = data;
      console.log('Data fetched successfully', data);
      }, (error) => {
      console.error('Error fetching data', error);
      });

    this.checkoutForm = this.formBuilder.group({
      name: '',
      address: '',
      street: '',
      postcode: '',
      phone: '',
      email: '',
      country: '',
      city: ''
    });
  }

  subTotal(){   
    if(this.cartItems){
      return this.cartItems.reduce((acc: any, item: any) => acc + item.product.price * item.quantity, 0);
    }
    return 0;
  }

  placeOrder(): void {

    const order = {
      name: this.checkoutForm.value.name,
      shippingAddress: this.checkoutForm.value.address,
      street: this.checkoutForm.value.street,
      postcode: this.checkoutForm.value.postcode,
      country: this.checkoutForm.value.country,
      city:this.checkoutForm.value.city,
      phone: this.checkoutForm.value.phone,
      email: this.checkoutForm.value.email,
      totalPrice: this.subTotal(),
      orderItems: this.cartItems.map((item: any) => {
        return {
          product: item.product._id,
          quantity: item.quantity
        }
      })
    }
    const token= localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }

    const headers = { Authorization: `Bearer ${token}` };
    this.http.post('http://localhost:3000/api/v1/orders', order, { headers })
    .subscribe((order)=>{
      // remove cart items
      
      this.http.delete('http://localhost:3000/api/v1/cart', { headers })
      .subscribe((data) => {
        console.log('Data fetched successfully', data);
        this.router.navigate(['/thanks']);
        }, (error) => {
        console.error('Error fetching data', error);
        });
      console.log(order);
    },(e)=>{
      console.log(e);
    }
    );
  }
}
