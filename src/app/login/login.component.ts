import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Authe2Service } from '../services/authe2.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: Authe2Service,private router:Router) { }

  login(): void {
    const userDetails = { email: this.email, password: this.password };
    this.authService.login(userDetails).subscribe(
      (response) => {
        if (response.message === 'Success') {
          console.log(response.admin.name);
          localStorage.setItem('currentAdmin', JSON.stringify(response.admin));
          console.log("Login successful");
          console.log('Login successful', response);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "You are now logged in. " + response.admin.name,
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(["/"]);
        } else if (response.message === 'unauthenticated') {
          console.error('Unauthenticated:', response);
          Swal.fire({
            icon: "info",
            title: "Unauthenticated",
            text: "Your credentials are invalid or your session has expired.",
            footer: 'Please login again.'
          });
        } else {
          console.error("Invalid login response:", response);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "An error occurred during login.",
            footer: 'Please try again later.'
          });
          this.email = '';
          this.password = '';
        }
      },
      (error: any) => {
        console.error("Login failed:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred during login.",
          footer: 'Please try again later.'
        });
        this.email = '';
        this.password = '';
      }
    );
  }
  ngOnInit(): void {
  }

}
