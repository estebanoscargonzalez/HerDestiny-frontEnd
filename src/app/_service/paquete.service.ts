import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestPaquete } from '../_model/paquete';

@Injectable({
  providedIn: 'root'
})
export class PaqueteService {
 

  private apiUrl = `${environment.HOST}/paquetes`;

  constructor(private http: HttpClient) { }

  crearPaquete(paquete: RequestPaquete): Observable<RequestPaquete> {
    return this.http.post<RequestPaquete>(this.apiUrl, paquete);
  }

  obtenerPaquete(id: number): Observable<RequestPaquete> {
    return this.http.get<RequestPaquete>(`${this.apiUrl}/${id}`);
  }

  obtenerTodosLosPaquetes(): Observable<RequestPaquete[]> {
    return this.http.get<RequestPaquete[]>(this.apiUrl);
  }

  actualizarPaquete(paquete: any): Observable<RequestPaquete> {
    return this.http.put<RequestPaquete>(this.apiUrl, paquete);
  }

  eliminarPaquete(id: number): Observable<RequestPaquete> {
    return this.http.delete<RequestPaquete>(`${this.apiUrl}/${id}`);
  }
}
