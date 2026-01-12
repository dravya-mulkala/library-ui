import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/login';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'https://localhost:7098/api';
  private tokenKey = 'auth_token';
  private nameKey = 'auth_name';
  private roleKey = 'auth_role'; // ✅ added role key
  private _isLoggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem(this.tokenKey));
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  /** 🔑 Call backend login endpoint */
  login(payload: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, payload).pipe(
      tap(res => {
        // ✅ Save token, name, and role together
        this.setSession(res.token, res.name, res.role);
      })
    );
  }

  /** ✅ Central method to save session */
  private setSession(token: string, name: string, role?: string) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.nameKey, name);
    if (role) {
      localStorage.setItem(this.roleKey, role);
    }
    this._isLoggedIn$.next(true);
  }

  /** ❌ Clear session + redirect */
  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.nameKey);
    localStorage.removeItem(this.roleKey); // ✅ clear role too
    this._isLoggedIn$.next(false);
    this.router.navigate(['/login']);
  }

  /** 📌 Helpers */
  get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  get currentUserName(): string | null {
    return localStorage.getItem(this.nameKey);
  }

  get currentUserRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }
}
