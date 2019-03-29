import { Component, OnInit } from '@angular/core';
import { Login } from '../models/login';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login = new Login();

  constructor(
    private api: LoginService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  onSubmit() {
    this.api.login(this.login).subscribe(() => {
      this.router.navigate(['/quiz-list']);
    },
      error => {
        // should inspect error and put useful info on page
        console.log(error);
      });
  }

}
