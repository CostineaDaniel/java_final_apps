import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatCard, MatCardContent, MatCardModule} from "@angular/material/card";
import {Router} from "@angular/router";
import {ListProductsComponent} from "../list-products/list-products.component";
import {CartButtonComponent} from "./cart-button/cart-button.component";
import {CustomerService} from "../services/customer.service";
import {NgClass, NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {ConfigurationsService} from "../services/configurations.service";
import {ProductService} from "../services/product.service";
import {CarouselComponent} from "../carousel/carousel.component";
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {FooterComponent} from "../footerr/footer.component";
import {OrderService} from "../services/order.service";

@Component({
  selector: 'app-home',
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
    ToolbarComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @Output() changeData = new EventEmitter<any>();// EventEmitter ne ajuta sa transmitem obiecte inafara componentei
  @Input("isAdmin") isAdmin: boolean = false;
  products: any[] = []; // Schimbați acest tip la nevoie
  currentIndex: number = 0;
  transitioning: boolean = false;
  pcount: number = this.orderService.getCount();

  constructor(private orderService : OrderService,
              private productService: ProductService,
              public appConfig: ConfigurationsService,
              private router:Router ,
              private customerService:CustomerService)
  {
    this.productService.getProductList().subscribe((productList: Array<any>) => {
      this.products = productList;
    })

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
  onMen(){
    this.productService.getProductsByGenre("BARBATI");
    this.router.navigate(['/','shop']);
  }
  onWomen(){
    this.productService.getProductsByGenre("FEMEI");
    this.router.navigate(['/','shop']);
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

    protected readonly window = window;
}
