import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitter';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products:any = [];
  constructor(private http: HttpClient , private cartService:CartService , private router:Router) { }

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



