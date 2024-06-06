import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatCard, MatCardContent, MatCardModule} from "@angular/material/card";
import {Router} from "@angular/router";
import {ListProductsComponent} from "../list-products/list-products.component";

import {CustomerService} from "../services/customer.service";
import {NgClass, NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {ConfigurationsService} from "../services/configurations.service";
import {ProductService} from "../services/product.service";
import {CarouselComponent} from "../carousel/carousel.component";
import {CartButtonComponent} from "../home/cart-button/cart-button.component";


@Component({
  selector: 'app-toolbar',
  standalone: true,
    imports: [
      MatSidenavModule,
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatCardModule,
      ListProductsComponent,
      CartButtonComponent,
      NgIf,
      NgForOf,
      MatCardContent,
      MatCard,
      TitleCasePipe,
      MatButton,
      NgClass,
      CarouselComponent,
    ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  @Output() changeData = new EventEmitter<any>();// EventEmitter ne ajuta sa transmitem obiecte inafara componentei
  @Input("isAdmin") isAdmin: boolean = false;
  products: any[] = []; // Schimbați acest tip la nevoie
  currentIndex: number = 0;
  transitioning: boolean = false;

  constructor(private productService: ProductService,
              public appConfig: ConfigurationsService,
              private router:Router ,
              private customerService:CustomerService)
  {

  }
  onBuy(item: any) {
    this.router.navigate(['/', 'product-details', item.id]);
  }
  isUserAdmin(){

    if(this.customerService.getLoggedUser() != null && this.customerService.getLoggedUser().userRole == "ADMIN"){
      return true;
    }
    return false;

  }
  onDashboard(){
    this.router.navigate(['/','dashboard']);
  }
  onLogOut(){
    this.router.navigate(['/','auth']);
  }

  onShop(){
    this.router.navigate(['/','shop']);
  }
}
