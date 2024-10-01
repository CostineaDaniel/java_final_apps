import {Component, Inject, input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../services/product.service";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {ConfigurationsService} from "../services/configurations.service";
import {CustomerService} from "../services/customer.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from '@angular/material/core';
import {OrderService} from "../services/order.service";
import {CartButtonComponent} from "../home/cart-button/cart-button.component";
import {MatTab, MatTabGroup, MatTabsModule} from "@angular/material/tabs";

import {MatGridList, MatGridListModule, MatGridTile} from "@angular/material/grid-list";
import {ImageSliderComponent} from "../image-slider/components/image-slider.component";
import {FooterComponent} from "../footerr/footer.component";
import {CarouselComponent} from "../carousel/carousel.component";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MatSnackBar} from "@angular/material/snack-bar";


// import * as console from "console";



@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    NgForOf,
    NgIf,
    TitleCasePipe,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    CartButtonComponent,
    MatTabGroup,
    MatTabsModule,
    MatTab,
    MatGridTile,
    MatGridList,
    MatGridListModule,
    ImageSliderComponent,
    FooterComponent,
    CarouselComponent,
    FormsModule,
    MatButtonToggle,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  productData: any = null;
  startDate = new FormControl('', [Validators.required]);
  endDate = new FormControl('', [Validators.required]);
  details = new FormControl('', [Validators.required]);
  data = {}
  selectedValue: any='';
  size = new FormControl('', [Validators.required]);

  constructor(private snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, private customerService: CustomerService, private productService: ProductService, public appConfig: ConfigurationsService, private orderService: OrderService) {

  }


  ngOnInit(): void {
    // Retrieve ID from URL parameter
    this.route.params.subscribe(params => {
      let id = params['id'];

      if (id != null) {
        this.productService.getProductById(id).subscribe((response: any) => {
          console.log(response);
          this.productData = response.data;
        })
      }
      console.log('ID from URL:', id);
    });
  }

  isUserAdmin() {
    if (this.customerService.getLoggedUser() != null && this.customerService.getLoggedUser().userRole == "ADMIN") {
      return true;
    }
    return false;

  }

  onShop(){
    this.router.navigate(['/','shop']);
  }

  onDashboard() {
    this.router.navigate(['/', 'dashboard']);
  }

  onHome() {
    this.router.navigate(['/', 'home']);
  }

  onLogOut() {
    this.router.navigate(['/', 'auth']);
  }

  onBuy(size:any): void {

    if(size == null){
      this.snackBar.open("You need to select a size first",'Close',{duration:9000});
    }else
    if (this.customerService.getLoggedUser() == null) {
      alert("Utilizatorul nu este logat, trebuie sa te loghezi inainte sa adaugi produse in cos");
      this.router.navigate(["/", "auth"]);
    } else {
      this.selectedValue=size;
      this.productData.productSize = size
      console.log(this.productData.productSize);
      // this.productData.productSize = this.selectedValue;
      console.log(this.selectedValue,size);

      this.orderService.addToCart(this.productData);
      this.size = new FormControl('', [Validators.required]);
    }
  }



  getErrorMessage(input: FormControl): string {
    if (input.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  private parseDate(date: Date) {
    let day = date.getDate();
    let month = date.getMonth() + 1; //lunile anului incep de la 0. Ianuarie=0
    let year = date.getFullYear();
    let dateStr = "";

    dateStr += year;
    dateStr += "-";
    if (month < 10) {
      dateStr += "0" + month;
    } else {
      dateStr += month;
    }
    dateStr += "-";
    if (day < 10) {
      dateStr += "0" + day;
    } else {
      dateStr += day;
    }
    console.log(dateStr);
    return dateStr;
  }
}
