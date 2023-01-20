import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsDetailComponent } from './components/marketplace/products-detail/products-detail.component';
import { ProductsListingComponent } from './components/marketplace/products-listing/products-listing.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'products-listing', component: ProductsListingComponent},
  {path: 'products-detail', component: ProductsDetailComponent},
  

];

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
