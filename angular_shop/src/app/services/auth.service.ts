import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ConfigurationsService} from "./configurations.service";
import {catchError, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private appConfig: ConfigurationsService, private httpClient: HttpClient) {

  }

  logIn(loginData: any) {
    return this.httpClient.post(`${this.appConfig.getApiUrl()}/auth/login`, loginData);
  }

  register(registerData: any) {

    return this.httpClient.post(`${this.appConfig.getApiUrl()}/auth/register`, registerData);


  }

  isAuthenticated(): boolean{
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  logOut(){
    localStorage.removeItem('authToken');
  }
}
