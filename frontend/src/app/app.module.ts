import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/user_pages/login/login.component';
import { AdminComponent } from './components/admin_pages/admin/admin.component';
import { HomeComponent } from './components/user_pages/home/home.component';
import { RegisterComponent } from './components/user_pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/user_pages/header/header.component';
import { FooterComponent } from './components/user_pages/footer/footer.component';
import { ShopComponent } from './components/user_pages/shop/shop.component';
import { UserAccountComponent } from './components/user_pages/user-account/user-account.component';
import { ContactComponent } from './components/user_pages/contact/contact.component';
import { AboutComponent } from './components/user_pages/about/about.component';
import { CheckoutComponent } from './components/user_pages/checkout/checkout.component';
import { CartComponent } from './components/user_pages/cart/cart.component';
import { ThanksComponent } from './components/user_pages/thanks/thanks.component';
import { UserDetailsComponent } from './components/admin_pages/user-details/user-details.component';
import { AdminHeaderComponent } from './components/admin_pages/admin-header/admin-header.component';
import { UserUpdateComponent } from './components/admin_pages/user-update/user-update.component';
import { ProductDetailsComponent } from './components/admin_pages/product-details/product-details.component';
import { ProductUpdateComponent } from './components/admin_pages/product-update/product-update.component';
import { ProductAddComponent } from './components/admin_pages/product-add/product-add.component';
import { UserAddComponent } from './components/admin_pages/user-add/user-add.component';
import { InquiriesComponent } from './components/admin_pages/inquiries/inquiries.component';
import { OrderDetailsComponent } from './components/admin_pages/order-details/order-details.component';
import { AdminProfileComponent } from './components/admin_pages/admin-profile/admin-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    ShopComponent,
    UserAccountComponent,
    ContactComponent,
    AboutComponent,
    CheckoutComponent,
    CartComponent,
    ThanksComponent,
    UserDetailsComponent,
    AdminHeaderComponent,
    UserUpdateComponent,
    ProductDetailsComponent,
    ProductUpdateComponent,
    ProductAddComponent,
    UserAddComponent,
    InquiriesComponent,
    OrderDetailsComponent,
    AdminProfileComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
