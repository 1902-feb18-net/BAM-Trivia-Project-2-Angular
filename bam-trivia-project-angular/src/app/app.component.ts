import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'BAM Trivia Project 2 Angular';

  //  isLoggedIn: boolean = false; 
  ngOnInit() {
    // console.log(sessionStorage.getItem('account'));
    // if (sessionStorage.getItem('account') !== null) {
    //   this.isLoggedIn = true;
    // }
  }
}
