import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CustomerService} from "./customer.service";
import {ConfigurationsService} from "./configurations.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private cartObservable = new BehaviorSubject<Array<any>>([]);
  private ordersObservable = new BehaviorSubject<Array<any>>([]);
  private productCount = new BehaviorSubject<number>(0);
  productCount$ = this.productCount.asObservable();

  constructor(private appConfig: ConfigurationsService, private customerService: CustomerService, private httpClient: HttpClient) {
    this.readOrders();
  }

  updateCount(count : number){
    this.productCount.next(count);
  }

  resetCount(){
    this.productCount.next(0);
  }

  getCount(){
    return this.productCount.getValue();
  }

  deleteCart(){
    console.log("inainte de delete : " + this.cartObservable.getValue().length)
    let arr : any = [];
    this.cartObservable.next(arr);
    this.productCount.next(0);
    this.resetCount();
    console.log("dupa delete: " + this.cartObservable.getValue().length);
  }

  public addToCart(product: any): void {


    let products = this.cartObservable.getValue();

    products.push(product);
    const currentCount= this.productCount.getValue();

    this.productCount.next(currentCount+1);
    console.log(currentCount)
    this.cartObservable.next(products);
  }


  public removeFromCart(product: any): void {
    let products = this.cartObservable.getValue();
    if(this.productCount.getValue() != 0){
      const currentCount= this.productCount.getValue();
      this.productCount.next(currentCount-1);
    }

    products = products.filter((it: any) => it.id != product.id);
    this.cartObservable.next(products);
  }

  public getCart() {
    return this.cartObservable.asObservable();
  }

  public getOrders() {
    return this.ordersObservable.asObservable();
  }


  public createOrder(details: string) {
    let cartProducts = this.cartObservable.getValue();

    let total = 0;
    let productIds = [];
    for (let product of cartProducts) {
      total += product.price;
      productIds.push({id: product.name});
    }


    let body = {
      date: this.parseDate(),
      total: total,
      details: details,
      paymentStatus: 'PENDING',
      customer: {
        id: this.customerService.getLoggedUser().id,
      },
      productList: productIds,
    }

    this.httpClient.post(`${this.appConfig.getApiUrl()}/orders/addOrder`, body).subscribe((response: any) => {
      console.log(response)
      this.cartObservable.next([]);
      this.readOrders();
    })
  }


  public deleteOrder(id: string) {
    this.httpClient.delete(`${this.appConfig.getApiUrl()}/orders/deleteOrderById/${id}`).subscribe((response: any) => {
      console.log(response);
      this.readOrders()
    })
  }

  public confirmOrder(id: string) {
    this.httpClient.post(`${this.appConfig.getApiUrl()}/orders/confirmOrderById/${id}`, {}).subscribe((response: any) => {
      console.log(response);
      this.readOrders();
    })
  }

  public canceledOrder(id: string) {
    this.httpClient.post(`${this.appConfig.getApiUrl()}/orders/cancelOrderById/${id}`, {}).subscribe((response: any) => {
      console.log(response);
      this.readOrders();
    })
  }

  public readOrders() {
    return this.httpClient.get(`${this.appConfig.getApiUrl()}/orders`).subscribe((response: any) => {
      this.ordersObservable.next(response.data)
    });
  }

  private parseDate() {
    let date = new Date();
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
