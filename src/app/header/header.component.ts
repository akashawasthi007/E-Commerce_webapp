import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  // value : string | undefined;
  constructor(private route: Router) {}

  value = 'Hello';
  menuType: string = 'default';
  sellerName :string ="";

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      console.log(val.url);
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = 'seller';
          let sellerstorage = localStorage.getItem('seller');
          let sellerdata = sellerstorage && JSON.parse(sellerstorage)[0];
          console.log(sellerdata);
          //this.sellerName=sellerdata.name;
        } else {
          this.menuType = 'default';
        }
      }
    });
  }

  logout():void{
    console.log("hello")
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
}
