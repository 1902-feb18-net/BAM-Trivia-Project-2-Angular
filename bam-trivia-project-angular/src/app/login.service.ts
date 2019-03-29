import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from './models/login';
import { Account } from './models/account';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  
  login(login: Login): Observable<{}> {
    // first, send request to login
    const url = `${environment.apiUrl}/api/Users/Login`;
    return this.http.post(url, login, { withCredentials: true }).pipe(res => {
      // then, send request to details
      const url2 = `${environment.apiUrl}/api/Users/Details`;
      return this.http.get<Account>(url2, { withCredentials: true }).pipe(account => {
        // when we get that, save in session storage the logged in user's info
        // (so if client refreshes page, we still have it)
        sessionStorage.setItem('account', JSON.stringify(account));
        // return the account details to the one calling this method
        return account;
      });
    });
  }
}
