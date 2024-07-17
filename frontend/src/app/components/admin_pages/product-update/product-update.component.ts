import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  updateProductForm: FormGroup;
  id:any;
  product:any;
  image:[''];
  constructor(private http:HttpClient, private formBuilder:FormBuilder, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    this.http.get(`https://medicare-backend-ten.vercel.app/api/v1/products/${this.id}`, { headers }).subscribe((product: any) => {
      console.log('User:', product);
      this.product = product;
      
      this.updateProductForm = this.formBuilder.group({
        pname: [this.product.pname , Validators.required],
        description: [this.product.description, Validators.required],
        richDescription: [this.product.richDescription, Validators.required],
        price: [this.product.price, Validators.required],
        countInStock: [this.product.countInStock, Validators.required],
        isFeatured: [this.product.isFeatured, Validators.required],
        dateCreated: [this.product.dateCreated, Validators.required],
        image: ['', Validators.required]
      });
    });
  }

  updateProduct(event: Event, product: any){

    if(this.updateProductForm.valid){
      const updatedUserData = this.updateProductForm.value;
      delete updatedUserData.category;
      console.log(updatedUserData);

      const token= localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }

    const headers = { Authorization: `Bearer ${token}` };

      this.http.put(`https://medicare-backend-ten.vercel.app/api/v1/products/${this.id}` ,updatedUserData , { headers })
      .subscribe((result) => {
        this.router.navigate(['/product-details']);
      },
      error => {
        console.error('Error updating user:', error);
      })
    }
  }

  
  }

