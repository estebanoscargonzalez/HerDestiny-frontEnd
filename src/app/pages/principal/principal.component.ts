import { Component, OnInit } from '@angular/core';
import { roles } from 'src/app/_model/rol';
import { LoginService } from 'src/app/_service/login.service';
import { UserService } from 'src/app/_service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  esAdministrador:boolean= false;
  esTransportista:boolean= false;
  esRegistrado:boolean= false;
  esNoRegistrado:boolean= false;




  constructor( private loginService: LoginService,
    private userService: UserService) { }

  get isLoggedIn(): boolean {
    return this.loginService.isAuthenticated();
  }

 
  ngOnInit(): void {
   // this.isLoggedIn = this.loginService.isAuthenticated();

  if (this.isLoggedIn) {
    this.obtenerRolesUsuario();
    }
  }

  logout() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Quieres cerrar sesión?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loginService.logout();
        // Puedes mostrar otro mensaje con SweetAlert2 indicando que la sesión se cerró con éxito, si lo deseas
        Swal.fire(
          '¡Cerrado!',
          'Tu sesión ha sido cerrada.',
          'success'
        );
      }
    });
  } 


  obtenerRolesUsuario() {
    this.userService.obtenerRolesUsuario().subscribe((roles: roles[]) => {
      this.resetRoles(); 
      console.log("Roles del usuario:", roles);
      this.esAdministrador = roles.some(rol => rol.rolNombre === 'administrador');
      this.esNoRegistrado = roles.some(rol => rol.rolNombre === 'no registrado');
      this.esTransportista = roles.some(rol => rol.rolNombre === 'transportista');
      this.esRegistrado = roles.some(rol => rol.rolNombre === 'registrado');
      console.log("Administrador => ", this.esAdministrador);
      console.log("Archivador => ", this.esNoRegistrado);
      console.log("Auxiliar Investigador => ", this.esTransportista);
      console.log("Mesa de Partes => ", this.esNoRegistrado);
    });
  }

  resetRoles(): void {
    this.esAdministrador = false;
    this.esNoRegistrado = false;
    this.esTransportista = false;
    this.esRegistrado = false;
  }

}