import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthorizeGuard} from "./shared/gurads/authorize.guard";
import {AdminGuard} from "./shared/gurads/admin.guard";
import {SellerGuard} from "./shared/gurads/seller.guard";

const routes: Routes = [
  {path:"",canActivate:[AuthorizeGuard,SellerGuard],loadChildren:()=>import('./shop/Shop.module').then(x=>x.ShopModule)},
  {path:"User",canActivate:[AuthorizeGuard,AdminGuard],loadChildren:()=>import('./user/user.module').then(x=>x.UserModule)},
  {path:"Chat",canActivate:[AuthorizeGuard,SellerGuard],loadChildren:()=>import('./chat/chat.module').then(x=>x.ChatModule)},
  {path:"Store",canActivate:[AuthorizeGuard,AdminGuard],loadChildren:()=>import('./store/Store.module').then(x=>x.StoreModule)},
  {path:"Shop",canActivate:[AuthorizeGuard,SellerGuard],loadChildren:()=>import('./shop/Shop.module').then(x=>x.ShopModule)},
  {path:"Commenting",canActivate:[AuthorizeGuard,SellerGuard],loadChildren:()=>import('./commenting/commenting.module').then(x=>x.CommentingModule)},
  {path:"Inventory",canActivate:[AuthorizeGuard,SellerGuard],loadChildren:()=>import('./inventory/inventory.module').then(x=>x.InventoryModule)},
  {path:"Auth",loadChildren:()=>import('./auth/auth.module').then(x=>x.AuthModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
