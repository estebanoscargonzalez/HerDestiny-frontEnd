import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestCategoria } from '../_model/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService { 


  private baseUrl = `${environment.HOST}/categorias`;
  constructor(private http: HttpClient) {}

  crearCategoria(categoria: RequestCategoria): Observable<RequestCategoria> {
    return this.http.post<RequestCategoria>(`${this.baseUrl}`, categoria);
  }

  obtenerTodasCategorias(): Observable<RequestCategoria> {
    return this.http.get<RequestCategoria>(`${this.baseUrl}`);
  }

  obtenerCategoriaPorId(id: number): Observable<RequestCategoria> {
    return this.http.get<RequestCategoria>(`${this.baseUrl}/${id}`);
  }

  eliminarCategoria(id: number): Observable<RequestCategoria> {
    return this.http.delete<RequestCategoria>(`${this.baseUrl}/${id}`);
  }
}
