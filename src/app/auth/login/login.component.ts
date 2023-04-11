import {Component, ElementRef, ViewChild} from '@angular/core';
import {LoginDto} from "../../shared/dto/identity/loginDto";
import {UserAuthorizeDto} from "../../shared/dto/identity/userAuthorizeDto";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  @ViewChild('password') password:ElementRef;
  public toggle:boolean=false;
  loginForm = new FormGroup({
    phoneNumber: new FormControl("", [Validators.pattern("^[0-9]*$"),Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
    password: new FormControl("", [Validators.required, Validators.maxLength(30), Validators.minLength(8)])
  })

  constructor(private authService: AuthService,private toast:ToastrService,private router:Router) {
  }
  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    }
    this.authService.login(<LoginDto>this.loginForm.value).subscribe((res:UserAuthorizeDto)=>{
      if(res){
        this.toast.success("ورود با موفقیت انجام شد",res.username)
       // this.router.navigateByUrl("/auth/profile")
      }
    });
  }

  togglePassword(){
    this.toggle=!this.toggle;
    if(this.toggle==true)this.password.nativeElement.type='text';
    if(this.toggle!=true)this.password.nativeElement.type='password';
  }
}
