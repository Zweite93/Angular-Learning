import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppConfig } from '../config/config';

@Injectable()
export class AuthService {
    constructor(public jwtHelper: JwtHelperService, private http: HttpClient, private config: AppConfig) { }

    public isAuthenticated(): boolean {
        debugger;
        const token = localStorage.getItem('token');
        let result = this.jwtHelper.isTokenExpired(token);
        return !this.jwtHelper.isTokenExpired(token);
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${this.config.apiUrl}/users/authenticate`, { username: username, password: password }).pipe(
            map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('token', user.token);
                    debugger;
                }

                return user;
            })
        );
    }

    logout() {
        localStorage.removeItem('currentUser');
    }
}