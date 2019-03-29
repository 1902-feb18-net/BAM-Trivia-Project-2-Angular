import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../logout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(
    private api: LogoutService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLoggedIn = sessionStorage.getItem('account') !== null;
  }

  onSubmit() {
    this.api.logout().subscribe(() => {
      this.router.navigate(['/dashboard']);
    },
      error => {
        // should inspect error and put useful info on page
        console.log(error);
      });
  }
}
