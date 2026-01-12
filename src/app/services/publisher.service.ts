import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publisher } from '../models/publisher.model';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {
  private baseUrl = '/api/Publishers'; // proxied to your .NET backend

  constructor(private http: HttpClient) {}

  // ✅ GET all publishers
  getPublishers(): Observable<Publisher[]> {
    return this.http.get<Publisher[]>(this.baseUrl);
  }

  // ✅ GET publisher by ID
  getPublisherById(id: number): Observable<Publisher> {
    return this.http.get<Publisher>(`${this.baseUrl}/${id}`);
  }

  // ✅ POST - create new publisher
  addPublisher(publisher: Publisher): Observable<Publisher> {
    return this.http.post<Publisher>(this.baseUrl, publisher);
  }

  // ✅ PUT - update publisher
  updatePublisher(id: number, publisher: Publisher): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, publisher);
  }

  // ✅ DELETE - remove publisher
  deletePublisher(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
