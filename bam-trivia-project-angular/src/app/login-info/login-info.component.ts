import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-info',
  templateUrl: './login-info.component.html',
  styleUrls: ['./login-info.component.css']
})
export class LoginInfoComponent implements OnInit {

  username: string;
  role: string;
  id: number;

  constructor() { }

  ngOnInit() {
    if (sessionStorage.getItem('account') !== null) {
      this.username = JSON.parse(sessionStorage.getItem('account'))['username'];
      this.role = JSON.parse(sessionStorage.getItem('account'))['roles'];
      this.id = JSON.parse(sessionStorage.getItem('account'))['userId'];
    } 

  }

}
