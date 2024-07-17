import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products:any = [];
  notificationCount = 0;



  constructor(private http:HttpClient, private router:Router, private cartService:CartService) { }

  ngOnInit(): void {

    this.http.get('https://medicare-backend-ten.vercel.app/api/v1/products')
    .subscribe((product)=>{
      this.products = product;
    },(e)=>{
      console.log(e);
    }
    )
  }

  addToCart(product: any, quantity: number) {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }
    const headers = { Authorization: `Bearer ${token}` };
    console.log(token);
    this.http.post('https://medicare-backend-ten.vercel.app/api/v1/cart', {product_id: product._id, quantity: quantity}, {headers})
    .subscribe((cart)=>{
      console.log(cart);
      this.cartService.incrementNotificationCount();
     this.cartService.showNotification.next(true);
    },(e)=>{
      console.log(e);
    }
    )
  }
}
