import { Component } from '@angular/core';
import {CartButtonComponent} from "../home/cart-button/cart-button.component";
import {ListProductsComponent} from "../list-products/list-products.component";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {NgIf} from "@angular/common";
import {ConfigurationsService} from "../services/configurations.service";
import {Router} from "@angular/router";
import {CustomerService} from "../services/customer.service";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {CarouselComponent} from "../carousel/carousel.component";
import {ProductService} from "../services/product.service";
import {FooterComponent} from "../footerr/footer.component";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    CartButtonComponent,
    ListProductsComponent,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatDrawer,
    MatDrawerContainer,
    MatIcon,
    MatIconButton,
    MatToolbar,
    NgIf,
    MatFormField,
    MatInput,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    CarouselComponent,
    FooterComponent
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',

})
export class ShopComponent {
  selectedGenre: string = 'ALL';

  constructor(public appConfig: ConfigurationsService, private router:Router , private customerService:CustomerService, private productService: ProductService){

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

  onHome(){
    this.router.navigate(["/","home"]);
  }

  onGenre(genre : string){
        this.productService.getProductsByGenre(genre)
  }
}
