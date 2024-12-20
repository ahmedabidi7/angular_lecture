import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Car } from './car';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8000/api'
  constructor(private http: HttpClient) { }

  getItems(): Observable<any> {
    return this.http.get(`${this.baseUrl}/cars`)
  }

  createItem(data: Car): Observable<any> {
    return this.http.post(`${this.baseUrl}/cars`, data).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(err: any): Observable<any> {
    console.error('an error occurred!', err)
    return throwError(()=>err.error.errors)
  }

  getItemById(id:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/cars/${id}`)
  }

  deleteItem(id:string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cars/${id}`)
  }

  editItem(data: Car): Observable<any> {
    return this.http.put(`${this.baseUrl}/cars/${data._id}`, data).pipe(
      catchError(this.handleError)
    )
  }
}
