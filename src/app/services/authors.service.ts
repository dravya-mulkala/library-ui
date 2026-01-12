import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from '../models/author.model';

@Injectable({ providedIn: 'root' })
export class AuthorService {
  private baseUrl = '/api/Authors'; // proxied to https://localhost:7098/api/Authors

  constructor(private http: HttpClient) {}

 getAuthors(): Observable<Author[]> {
     return this.http.get<Author[]>(this.baseUrl);
   }
 }