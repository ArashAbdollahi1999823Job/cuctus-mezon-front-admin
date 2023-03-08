import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-c/app.component';
import {SharedModule} from "./shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoadingInterceptor} from "./shared/interceptors/loading.interceptor";
import {ErrorHandlingInterceptor} from "./shared/interceptors/error-handling.interceptor";
import {JwtInterceptor} from "./shared/interceptors/jwt.interceptor";
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule,BrowserAnimationsModule,HttpClientModule],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:ErrorHandlingInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true},
    {provide: HTTP_INTERCEPTORS,  useClass: JwtInterceptor, multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
