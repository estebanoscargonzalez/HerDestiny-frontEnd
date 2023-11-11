import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private baseUrl = `${environment.HOST}/auth/login`;
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'token'

  public username: String;
  public password: String;


  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  login(username: string, password: string) {
    const body = {
      username: username,
      password: password
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
     // 'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<any>(this.baseUrl, body, { headers: headers }).pipe(
      map(response => {
        // Almacenar el token en el almacenamiento local (localStorage o sessionStorage)
        const token = response.token;
        sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, token);

        this.username = username;
        this.password = password;

          // Opcional: Devolver la respuesta para un procesamiento adicional en el componente
        return response;
      })
    );
  }


  logout() {
    // Eliminar el token del almacenamiento local
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username = '';
    this.password = '';
    // Redirigir al usuario a la página de login
    this.router.navigate(['/principal/inicio']);
  }

  isAuthenticated() {
    // Verificar si el token está presente en el almacenamiento local
    const token = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    return !!token;
  }
}
