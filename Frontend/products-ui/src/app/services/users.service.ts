import { Injectable } from '@angular/core';
import constants from '../constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url = constants.URL;

  constructor(private http: HttpClient) {}

  validateUser(user: any): Observable<any> {
    return this.http.post(`${this.url}/register`, user);
  };

  loginUser(user: any): Observable<any> {
    return this.http.post(`${this.url}/login`, user);
  }
}
