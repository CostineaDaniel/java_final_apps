import {Component, Input} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {NgForOf, NgIf} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {OrderService} from "../../services/order.service";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-cart-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    NgForOf,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './cart-dialog.component.html',
  styleUrl: './cart-dialog.component.css'
})
export class CartDialogComponent {
  products: Array<any> = [];
  details: FormControl = new FormControl<any>('', Validators.required);
  totalPrice: number = 0;
  // @Input() size : any;

  constructor(private orderService: OrderService) {
    this.orderService.getCart().subscribe((productsList: Array<any>) => {
      this.products = productsList;
    });
  }

  incrementTotalPrice(){
    this.totalPrice = 0;
    for(var i = 0 ; i<this.products.length;i++){

      console.log("aici incrementam " + this.products.length);
      this.totalPrice += this.products[i].price;
    }
    return this.totalPrice;
    console.log("aici incrementam " + this.products.length);
  }

  public onBuy() {
    console.log("Inainte" + this.orderService.getCount(),this.orderService.getCart());
    this.orderService.createOrder(this.details.getRawValue()!);
    this.orderService.deleteCart();
    console.log("DUpa" + this.orderService.getCount(),this.orderService.getCart());
  }

  public onDeleteFromCart(product: any) {
    this.orderService.removeFromCart(product);
  }

  getErrorMessage(input: FormControl): string {
    if (input.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }
}
