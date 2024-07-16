import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  showNotification = new BehaviorSubject<boolean>(false);

  private cartItems = new BehaviorSubject<any>([]);
  private notificationCount = new BehaviorSubject<number>(0);

  currentNotificationCount = this.notificationCount.asObservable();

  constructor(private http:HttpClient) { }

  changeCartItems(items: any[]) {
    this.cartItems.next(items);
    this.notificationCount.next(items.length);
  }

  incrementNotificationCount() {
    let count = this.notificationCount.value;
    this.notificationCount.next(++count);
  }

 getCartItems(){
    const token = localStorage.getItem('token');
    if (!token) {
      return 0 ;
    }
    const headers = { Authorization: `Bearer ${token}` };
    this.http.get('http://localhost:3000/api/v1/cart',{headers}).subscribe((cartItems:any)=>{ 
      console.log(cartItems);
      this.showNotification.next(true);
      const totalQuantity = cartItems.reduce((sum : number, item : any) => sum + item.quantity, 0);
      this.notificationCount.next(totalQuantity);
    },(e)=>{
      console.log(e);
    });
    return 0; 
  }
  
}
