import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestProducto } from 'src/app/_model/producto';
import { roles } from 'src/app/_model/rol';
import { LoginService } from 'src/app/_service/login.service';
import { ProductoService } from 'src/app/_service/producto.service';
import { UserService } from 'src/app/_service/user.service';
import Swal from 'sweetalert2';

@Component({ 
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
 
  esAdministrador:boolean= false;
  esTransportista:boolean= false;
  esRegistrado:boolean= false;
  esNoRegistrado:boolean= false;

  isLoggedIn: boolean= false


  productos: RequestProducto[] = []; // Declara una variable para almacenar la lista de productos

  constructor(private productoService: ProductoService,
    private userService: UserService,
    private loginService: LoginService,
    private router: Router ) { }

  ngOnInit(): void {
    this.obtenerProductos(); // Llama al método para obtener la lista de productos al inicializar el componente
    this.obtenerRolesUsuario();
    this.isLoggedIn = this.loginService.isAuthenticated();
  }

  // Método para obtener la lista de productos
  obtenerProductos(): void {
    this.productoService.obtenerTodosLosProductos().subscribe(
      (productos) => {
        this.productos = productos;    
        
      },
      (error) => {
        console.error('Error al obtener la lista de productos:', error);
      }
    );
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
  
  handleClick(idProducto: number) {
    if (!this.isLoggedIn) {
      // Pregunta si desea iniciar sesión
      Swal.fire({
        title: 'Para reservar el aquiler primero debe iniciar sesión. ¿Deseas iniciar sesión?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']); 
        }
      });
    } else if (!this.esTransportista) {
      this.router.navigate([`/principal/pagos/${idProducto}`]);
    }
  }
  


  resetRoles(): void {
    this.esAdministrador = false;
    this.esNoRegistrado = false;
    this.esTransportista = false;
    this.esRegistrado = false;
  }
}
