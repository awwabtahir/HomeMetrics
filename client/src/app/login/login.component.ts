import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: [
    './login-component.css'
  ]
})
export class LoginComponent implements OnInit {
  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private dataService: DataService ,private router: Router) { }

  ngOnInit() {
    if (this.auth.isLoggedIn()) { 
      this.router.navigateByUrl('/welcome'); 
    }
  }

  login() {
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/welcome');
    }, (err) => {
      console.error(err);
    });
  }
}
