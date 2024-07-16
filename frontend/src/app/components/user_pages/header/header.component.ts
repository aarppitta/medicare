import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { count } from 'rxjs';
import { Emitters } from 'src/app/emitters/emitter';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  showNotification = false;
  notificationCount: number;
  isLoggedIn = false;
  
  constructor(private http: HttpClient, private cartService:CartService, private router:Router) { 
    // this.cartService.showNotification.subscribe(show => {
    //  this.notificationCount++;
    //  this.showNotification = show;
    // });
  }

  ngOnInit() {
    this.cartService.currentNotificationCount.subscribe(count => this.notificationCount = count);
    this.cartService.showNotification.subscribe(show => this.showNotification = show);
    this.cartService.getCartItems();
    localStorage.getItem('token') ? this.isLoggedIn = true : this.isLoggedIn = false;
  }

  //receiveNotification() {
  //  this.notificationCount++;
  //  this.showNotification = true;
  //}

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');

    // Optionally, redirect the user to the login page
    this.router.navigate(['/login']);
  }
}
