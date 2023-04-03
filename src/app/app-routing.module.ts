import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthorizeGuard} from "./shared/gurads/authorize.guard";
import {AdminGuard} from "./shared/gurads/admin.guard";
import {SellerGuard} from "./shared/gurads/seller.guard";
import {SellerJustGuard} from "./shared/gurads/seller-just.guard";

const routes: Routes = [
  {path:"",canActivate:[AuthorizeGuard,SellerGuard],loadChildren:()=>import('./shop/shop.module').then(x=>x.ShopModule)},
  {path:"User",canActivate:[AuthorizeGuard,AdminGuard],loadChildren:()=>import('./user/user.module').then(x=>x.UserModule)},
  {path:"Chat",canActivate:[AuthorizeGuard,SellerGuard],loadChildren:()=>import('./chat/chat.module').then(x=>x.ChatModule)},
  {path:"Store",canActivate:[AuthorizeGuard,AdminGuard],loadChildren:()=>import('./store/store.module').then(x=>x.StoreModule)},
  {path:"StoreUser",canActivate:[AuthorizeGuard,SellerJustGuard],loadChildren:()=>import('./store-user/store-user.module').then(x=>x.StoreUserModule)},
  {path:"Shop",canActivate:[AuthorizeGuard,SellerGuard],loadChildren:()=>import('./shop/shop.module').then(x=>x.ShopModule)},
  {path:"Commenting",canActivate:[AuthorizeGuard,SellerGuard],loadChildren:()=>import('./commenting/commenting.module').then(x=>x.CommentingModule)},
  {path:"Repository",canActivate:[AuthorizeGuard,SellerGuard],loadChildren:()=>import('./repository/repository.module').then(x=>x.RepositoryModule)},
  {path:"Auth",loadChildren:()=>import('./auth/auth.module').then(x=>x.AuthModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
