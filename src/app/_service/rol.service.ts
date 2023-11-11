import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { roles } from '../_model/rol';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private baseUrl = `${environment.HOST}/roles/`;

  constructor(private http: HttpClient) { }


  listarRoles(): Observable<roles[]> {
    return this.http.get<roles[]>(`${this.baseUrl}`);
  }
}
