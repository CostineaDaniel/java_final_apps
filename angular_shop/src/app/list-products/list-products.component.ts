import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductService} from "../services/product.service";
import {MatCard, MatCardContent, MatCardModule} from "@angular/material/card";
import {NgClass, NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {OrderService} from "../services/order.service";
import {CustomerService} from "../services/customer.service";
import {Router} from "@angular/router";

@Component({

  selector: 'app-list-products',
  standalone: true,
  imports: [
    MatCardModule,
    NgForOf,
    MatButtonModule,
    NgIf,
    TitleCasePipe,
    MatCardContent,
    MatCard,
    TitleCasePipe,
    MatButton,
    NgClass
  ],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent {
  @Output() changeData = new EventEmitter<any>();// EventEmitter ne ajuta sa transmitem obiecte inafara componentei
  @Input("isAdmin") isAdmin: boolean = false;
  productData: any = null;

  products: any[] = []; // Schimbați acest tip la nevoie
  womenProducts: any[] = []


  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private customerService: CustomerService,
    private router: Router) {
    this.productService.getProductList().subscribe((productList: Array<any>) => {
      this.products = productList;
    })

  }

  onEdit(item: any) {
    this.changeData.emit(item);
  }

  onDelete(item: any) {
    console.log(item);
    this.productService.deleteProduct(item);
  }

  onBuy(item: any) {
    this.router.navigate(['/', 'product-details', item.id]);
  }


}




