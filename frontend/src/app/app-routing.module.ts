import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/user_pages/home/home.component';
import { LoginComponent } from './components/user_pages/login/login.component';
import { AdminComponent } from './components/admin_pages/admin/admin.component';
import { RegisterComponent } from './components/user_pages/register/register.component';
import { ShopComponent } from './components/user_pages/shop/shop.component';
import { UserAccountComponent } from './components/user_pages/user-account/user-account.component';
import { ContactComponent } from './components/user_pages/contact/contact.component';
import { AboutComponent } from './components/user_pages/about/about.component';
import { CartComponent } from './components/user_pages/cart/cart.component';
import { CheckoutComponent } from './components/user_pages/checkout/checkout.component';
import { ThanksComponent } from './components/user_pages/thanks/thanks.component';
import { UserDetailsComponent } from './components/admin_pages/user-details/user-details.component';
import { UserUpdateComponent } from './components/admin_pages/user-update/user-update.component';
import { ProductDetailsComponent } from './components/admin_pages/product-details/product-details.component';
import { ProductUpdateComponent } from './components/admin_pages/product-update/product-update.component';
import { ProductAddComponent } from './components/admin_pages/product-add/product-add.component';
import { UserAddComponent } from './components/admin_pages/user-add/user-add.component';
import { InquiriesComponent } from './components/admin_pages/inquiries/inquiries.component';
import { OrderDetailsComponent } from './components/admin_pages/order-details/order-details.component';
import { AdminProfileComponent } from './components/admin_pages/admin-profile/admin-profile.component';

const routes: Routes = [
  { path:'', component:HomeComponent},
  { path:'login', component:LoginComponent},
  { path:'register', component:RegisterComponent},
  { path:'home', component:HomeComponent},
  { path: 'admin', component:AdminComponent},
  { path: 'shop', component:ShopComponent},
  { path: 'user_account', component:UserAccountComponent},
  { path: 'contact', component:ContactComponent},
  { path: 'about', component:AboutComponent},
  { path: 'cart', component:CartComponent},
  { path: 'checkout', component:CheckoutComponent},
  { path: 'thanks', component:ThanksComponent},

  { path: 'admin', component:AdminComponent},
  { path: 'user-details', component:UserDetailsComponent},
  { path: 'user-update/:id', component:UserUpdateComponent },
  { path: 'user-add', component:UserAddComponent },
  { path: 'product-details', component:ProductDetailsComponent },
  { path: 'product-update/:id', component:ProductUpdateComponent },
  { path: 'product-add', component:ProductAddComponent },
  { path: 'inquiries', component:InquiriesComponent },
  { path: 'order-details', component:OrderDetailsComponent },
  { path: 'admin-profile', component:AdminProfileComponent },
  


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
