import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestAlquiler } from '../_model/alquiler';

@Injectable({
  providedIn: 'root'
}) 
export class AlquilerService {

  private apiUrl = `${environment.HOST}/api/alquileres`;
 
  constructor(private http: HttpClient) { }

  crearAlquiler(alquiler: RequestAlquiler): Observable<RequestAlquiler> {
    return this.http.post<RequestAlquiler>(this.apiUrl, alquiler);
  }

  obtenerAlquilerPorId(id: number): Observable<RequestAlquiler> {
    return this.http.get<RequestAlquiler>(`${this.apiUrl}/${id}`);
  }

  actualizarAlquiler(alquiler: any): Observable<RequestAlquiler> {
    return this.http.put<RequestAlquiler>(`${this.apiUrl}/${alquiler.id}`, alquiler);
  }

  eliminarAlquiler(id: number): Observable<RequestAlquiler> {
    return this.http.delete<RequestAlquiler>(`${this.apiUrl}/${id}`);
  }
}
