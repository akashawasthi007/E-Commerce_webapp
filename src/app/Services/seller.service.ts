import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Login, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}
  
  
  userSignUp(data: SignUp) {
    console.warn('Service called');
    this.http
      .post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((result) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result));
        this.router.navigate(['seller-home']);
        console.warn(result);
      });
  }
  reloadService() {
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data : Login){   // * seller login ( to create selling items)
    console.log(data);
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{ observe : 'response' })
    .subscribe((result : any) => {
      console.log(result);
      if(result && result.body && result.body.length)
      {
        console.log("user logged in");
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result));
        this.router.navigate(['seller-home']);
      }
      else
      {
        console.log("login failed");
        this.isLoginError.emit(true);
      }
    });
    
  }
}
