import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardModule} from "@angular/material/card";
import {NgClass, NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {ProductService} from "../services/product.service";
import {OrderService} from "../services/order.service";
import {CustomerService} from "../services/customer.service";
import {Router} from "@angular/router";
import {MatDivider} from "@angular/material/divider";
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list'
@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    MatCardModule,
    NgForOf,
    MatButtonModule,
    NgIf,
    TitleCasePipe,
    MatCardContent,MatCard,MatButton, MatDivider, MatListModule, MatDividerModule,
    TitleCasePipe,
    NgClass,

  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  @Output() changeData = new EventEmitter<any>();// EventEmitter ne ajuta sa transmitem obiecte inafara componentei
  @Input("isAdmin") isAdmin: boolean = false;
  productData: any = null;

  products: any[] = []; // Schimbați acest tip la nevoie
  latestProducts: any[] = [];
  currentIndex: number = 0;
  transitioning: boolean = false;

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private customerService: CustomerService,
    private router: Router) {
    this.productService.getLatestProducts().subscribe((productList: Array<any>) => {
      this.products = productList;
    })
  }

  ngOnInit(): void {
    this.productService.getLatestProducts().subscribe((productList: any[]) => {
      this.products = productList;
    });
  }

  getVisibleProducts(): any[] {
    const startIndex = this.currentIndex * 3;
    const endIndex = startIndex + 3;
    return this.products.slice(startIndex, endIndex);
  }

  next(): void {
    if (this.currentIndex < Math.ceil(this.products.length / 3) - 1) {
      this.currentIndex++;
      this.transitioning = true;
      setTimeout(() => {
        this.transitioning = false;
      }, 100);
    }
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.transitioning = true;
      setTimeout(() => {
        this.transitioning = false;
      }, 100);
    }
  }
  onClick(product:any) {
    this.router.navigate(['/', 'product-details', product.id]);
  }

}
