import { Injectable } from '@angular/core';
import { LoginRequest } from './login-request';
import { LoginResponse } from './login-response';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private _authStatus = new BehaviorSubject<boolean>(false);
  public authStatus = this._authStatus.asObservable();

  private isAuthenticated() : boolean
  {
    var retval : boolean = false;

    retval = (localStorage.getItem("comp584wk") != null);

    return retval;
  }

 getToken() : string | null
  {
    return localStorage.getItem("comp584wk");
  }

  private setAuthStatus(isAuthenticated: boolean) : void
  {
    this._authStatus.next(isAuthenticated);
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse>
  {
    return this.http.post<LoginResponse>(`${environment.baseUrl}api/Admin/Login`, loginRequest)
    .pipe(tap(loginResult => {
      if(loginResult.success)
      {
        localStorage.setItem("comp584wk", loginResult.token);
        this.setAuthStatus(true);
      }
    }));
  }

  logout()
  {
    localStorage.removeItem("comp584wk");
    this.setAuthStatus(false);
  }
}
