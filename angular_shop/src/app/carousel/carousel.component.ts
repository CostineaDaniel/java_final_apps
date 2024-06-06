import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardModule} from "@angular/material/card";
import {NgClass, NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {ProductService} from "../services/product.service";
import {OrderService} from "../services/order.service";
import {CustomerService} from "../services/customer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-carousel',
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
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  @Output() changeData = new EventEmitter<any>();// EventEmitter ne ajuta sa transmitem obiecte inafara componentei
  @Input("isAdmin") isAdmin: boolean = false;
  productData: any = null;

  products: any[] = []; // Schimbați acest tip la nevoie
  currentIndex: number = 0;
  transitioning: boolean = false;

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private customerService: CustomerService,
    private router: Router) {
    this.productService.getProductList().subscribe((productList: Array<any>) => {
      this.products = productList;
    })
  }

  ngOnInit(): void {
    this.productService.getProductList().subscribe((productList: any[]) => {
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
  onBuy(item:any) {
    this.router.navigate(['/', 'product-details', item.id]);
  }
  addToCart(item:any): void {
    if (this.customerService.getLoggedUser() == null) {
      alert("Utilizatorul nu este logat, trebuie sa te loghezi inainte sa adaugi produse in cos");
      this.router.navigate(["/", "auth"]);
    } else {

      this.orderService.addToCart(this.productData);
    }
  }
}
