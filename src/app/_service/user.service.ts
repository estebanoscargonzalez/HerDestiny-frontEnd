import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestUser } from '../_model/user';
import { environment } from 'src/environments/environment';
import { roles } from '../_model/rol';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${environment.HOST}/auth`; // Cambia esto según la URL de tu API

  constructor(private http: HttpClient) { }

  // Método para registrar un nuevo usuario
  registrarUsuario(user: RequestUser): Observable<any> {
    return this.http.post(`${this.baseUrl}/nuevoUsuario`, user);
  }

  // Método para modificar un usuario
  modificarUsuario(user: RequestUser): Observable<RequestUser> {
    return this.http.put<RequestUser>(`${this.baseUrl}/modificar`, user);
  }

  // Método para listar usuarios
  listarUsuarios(filtros?: { username?: string; name?: string; email?: string }): Observable<RequestUser[]> {
    let params = new HttpParams();
    if (filtros) {
      if (filtros.username) {
        params = params.append('username', filtros.username);
      }
      if (filtros.name) {
        params = params.append('name', filtros.name);
      }
      if (filtros.email) {
        params = params.append('email', filtros.email);
      }
    }
    return this.http.get<RequestUser[]>(`${this.baseUrl}/`, { params });
  }

  // Método para eliminar un usuario por su ID
  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Método para obtener un usuario por su ID
  obtenerUsuarioPorId(id: number): Observable<RequestUser> {
    return this.http.get<RequestUser>(`${this.baseUrl}/${id}`);
  }

/**
 * método para obtener el rol del usuario authenticado.
 * @returns 
 */
  obtenerRolesUsuario(): Observable<roles[]> {
    const url = `${this.baseUrl}/usuario`;
    return this.http.get<roles[]>(url);
  }

}
