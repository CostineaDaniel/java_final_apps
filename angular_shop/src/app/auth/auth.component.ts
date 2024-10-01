import {Component} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {AuthService} from "../services/auth.service";
import {CustomerService} from "../services/customer.service";
import {Router} from "@angular/router";
import {ConfigurationsService} from "../services/configurations.service";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgSwitch,
    NgSwitchCase,
    NgIf
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  username: string = '';
  password: string = '';



  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    reTypePassword: new FormControl('', [Validators.required]),
  });

  viewType: string = 'login';

  constructor(public appConfig: ConfigurationsService,
              private authService: AuthService,
              private customer: CustomerService,
              private router: Router,
              private snackBar: MatSnackBar
             )
  {

  }

  onViewTypeChange(viewType: string): void {
    this.viewType = viewType;
  }

  onLogIn(): void {
    this.authService.logIn(this.loginForm.value).subscribe(
      (response: any) => {
        if (response.status==200) {
          console.log('Login with success!');

          console.log(response);

          this.customer.setLoggedUser(response.data);

          this.resetLoginForm();

          this.router.navigate(['/', 'home']);
        } else {
          alert(response.message);
        }
      },
      (err) => {
        console.log('Login failed!');
        alert('Invalid credentials!');
        console.log(err);
      }
    );
  }

  onRegister(): void {

      if (this.registerForm.value.password !== this.registerForm.value.reTypePassword) {
        this.snackBar.open("Password do not match !",'Close',{duration:9000});
    } else {
      this.authService.register(this.registerForm.value).subscribe(
        (response: any) => {
          console.log('Register with success!');
          this.snackBar.open("The account was succesfully created",'Close',{duration:9000});
          this.viewType = 'login';
          this.resetRegisterForm();
        },
        (error) => {
          if(error.status === 400){
            this.snackBar.open("This email is already asociated with another account !",'Close',{duration:9000});
          }


        }
      );
    }

  }

  getErrorMessage(formControl: any) {
    if (formControl.hasError('required')) {
      return 'You must enter a value';
    }
    if(formControl.hasError('minlength')){
      return 'Password must be at least 8 characters';
    }

    return formControl.hasError('email') ? 'Not a valid email' : '';
  }

  private resetLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  private resetRegisterForm() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      reTypePassword: new FormControl('', [Validators.required]),
    });
  }

}
