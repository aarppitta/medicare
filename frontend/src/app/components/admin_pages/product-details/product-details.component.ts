import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  
  products: any[];
  id:'';
  constructor(private http: HttpClient, private router: Router) { } 

  ngOnInit(): void {
    const token= localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }

    const headers = { Authorization: `Bearer ${token}` };

    this.http.get<any[]>('http://localhost:3000/api/v1/products', { headers })
      .subscribe(data => {
        this.products = data;
      console.log('Data fetched successfully', data);
      }, (error) => {
      console.error('Error fetching data', error);
      });
      
  }
  editProduct(product: any) {
  
    console.log('Product:', product);
    this.router.navigate(['/product-update', product._id], { state: { product: product } });
  }

  deleteProduct(id: string){
    
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.delete<any>(`http://localhost:3000/api/v1/products/${id}`, { headers})
      .subscribe({
        next: (data) => {
          console.log('Data fetched successfully', data);
        },
        error: (error) => {
          console.error('Error fetching data', error);
        }
      });
  }

 

}
  