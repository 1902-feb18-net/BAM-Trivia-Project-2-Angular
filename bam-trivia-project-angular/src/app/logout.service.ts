import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http: HttpClient) { }

  logout(): Observable<{}> {
    // first, send request to login
    const url = `${environment.apiUrl}/api/Users/Logout`;
    return this.http.post(url, {}, { withCredentials: true }).pipe(res => {
      // then, send request to details
      sessionStorage.removeItem('account');
      return res;
    });
  }
}
