import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/libros';

@Injectable({
  providedIn: 'root'
})
export class BasedatosService {

  constructor(private http: HttpClient) { }

  getLibros(): Observable<any> {
    return this.http.get(API_URL);
  }

  getLibro(id: number): Observable<any> {
    return this.http.get(`${API_URL}/${id}`);
  }

  addLibro(libro: any): Observable<any> {
    return this.http.post(API_URL, libro);
  }

  updateLibro(id: number, libro: any): Observable<any> {
    return this.http.put(`${API_URL}/${id}`, libro);
  }

  deleteLibro(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }
}
