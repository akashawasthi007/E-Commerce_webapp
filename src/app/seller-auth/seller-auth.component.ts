import { Component } from '@angular/core';
import {FormControl, NgForm, Validators} from '@angular/forms';
import { SellerService } from '../Services/seller.service';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent {

  
  hide = true;
  showLogin = false;
  authError : string = '';
  //email = new FormControl('', [Validators.required, Validators.email]); 

  constructor(private seller : SellerService , private router : Router){}

  ngOnInit():void{
    this.seller.reloadService();
  }
  
  SignUpSubmit(data:SignUp):void {
    console.log(data);
    this.seller.userSignUp(data);

    // this.seller.userSignUp(data).subscribe((result)=>{
    //   if(result){
    //     this.router.navigate(['seller-home']);
    //   }
    // });

    //console.log(this.email.value);
  }
  // ? this method is removed cause its not working if we get email in the object. we need to use formcontrol tag to use this 
  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     //return 'You must enter a value';
  //   }

  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }

  openlogin():void {
    this.showLogin=!this.showLogin;
    //throw new Error('Method not implemented.');
    }

    Login(data:Login) :void{
    this.seller.userLogin(data);  
    this.seller.isLoginError.subscribe((isError) => {
      if(isError){
        this.authError="Email or password is not correct";
      }
    })
    }
}
