import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestProducto } from '../_model/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  private apiUrl = `${environment.HOST}/api/productos`;

  constructor(private http: HttpClient) { }

  crearProducto(producto: RequestProducto): Observable<RequestProducto> {
    return this.http.post<RequestProducto>(this.apiUrl, producto);
  }

  obtenerProductoPorId(id: number): Observable<RequestProducto> {
    return this.http.get<RequestProducto>(`${this.apiUrl}/${id}`);
  }

  obtenerTodosLosProductos(): Observable<RequestProducto[]> {
    return this.http.get<RequestProducto[]>(this.apiUrl);
  }

  actualizarProducto(producto: RequestProducto): Observable<RequestProducto> {
    return this.http.put<RequestProducto>(this.apiUrl, producto);
  }

  eliminarProducto(id: number): Observable<RequestProducto> {
    return this.http.delete<RequestProducto>(`${this.apiUrl}/${id}`);
  }
}
