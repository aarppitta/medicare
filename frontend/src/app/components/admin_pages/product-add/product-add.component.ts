import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  
  addProductForm: FormGroup;
  image: File;
  imageUrl: string;
  

  constructor(private formBuilder:FormBuilder, private http:HttpClient, private router:Router) { }

  ngOnInit(): void {

    this.addProductForm = this.formBuilder.group({
      pname: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: ['', Validators.required],
      price: ['',Validators.required],
      countInStock: ['',Validators.required],
      isFeatured: ['',Validators.required],
      dateCreated: ['',Validators.required],
      image: ['']
    })
  }

  onFileChange(event:any) {
    if (event.target.files.length > 0) {
      this.image = event.target.files[0];
    }
  }

  addProduct(){

    if(this.addProductForm.valid){
      // const productData = this.addProductForm.value;
      const formData = new FormData();
      
      Object.keys(this.addProductForm.value).forEach(key => {
        formData.append(key, this.addProductForm.value[key]);
      });

      if (this.image) {
        formData.append('image', this.image);
      }


      // console.log(productData);
      const token= localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }

    const headers = { Authorization: `Bearer ${token}` };

      this.http.post('https://medicare-backend-ten.vercel.app/api/v1/products/',formData, {headers})
    
      .subscribe((result:any) => {
        console.log('Product Added Successfully', result);
        this.imageUrl = result.image;
        this.router.navigate(['/product-details']);
      }, (error) => {
        console.log('Error while adding product',  error);
      }
      )
    }
  }

}
