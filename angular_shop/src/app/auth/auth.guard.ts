
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {Injectable} from "@angular/core";
import {CustomerService} from "../services/customer.service";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard {
  public constructor(private router: Router, private customerService: CustomerService, private authService: AuthService) {
  }





  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   let user = this.customerService.getLoggedUser();
  //
  //   if (user != null && user.userRole == "ADMIN") { // aici putem verifica daca utilizatorul logat este admin sau nu
  //     return true;
  //   } else {
  //     this.router.navigateByUrl('/auth');
  //     return false;
  //   }
  // }
}
