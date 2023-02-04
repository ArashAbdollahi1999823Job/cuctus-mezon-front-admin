import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthorizeGuard} from "./shared/gurads/authorize.guard";

const routes: Routes = [
  {path:"",canActivate:[AuthorizeGuard],loadChildren:()=>import('./product/product.module').then(x=>x.ProductModule)},
  {path:"user",canActivate:[AuthorizeGuard],loadChildren:()=>import('./user/user.module').then(x=>x.UserModule)},
  {path:"chat",canActivate:[AuthorizeGuard],loadChildren:()=>import('./chat/chat.module').then(x=>x.ChatModule)},
  {path:"seller",canActivate:[AuthorizeGuard],loadChildren:()=>import('./seller/seller.module').then(x=>x.SellerModule)},
  {path:"product",canActivate:[AuthorizeGuard],loadChildren:()=>import('./product/product.module').then(x=>x.ProductModule)},
  {path:"commenting",canActivate:[AuthorizeGuard],loadChildren:()=>import('./commenting/commenting.module').then(x=>x.CommentingModule)},
  {path:"inventory",canActivate:[AuthorizeGuard],loadChildren:()=>import('./inventory/inventory.module').then(x=>x.InventoryModule)},
  {path:"auth",loadChildren:()=>import('./auth/auth.module').then(x=>x.AuthModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
