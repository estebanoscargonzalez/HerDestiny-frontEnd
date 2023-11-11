import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestUser } from 'src/app/_model/user';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-user',
  templateUrl: './registro-user.component.html',
  styleUrls: ['./registro-user.component.css']
})
export class RegistroUserComponent implements OnInit {

  isEditMode = false; // false = Modo Registrar, true = Modo Editar
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder, private userService: UserService,
    private router: Router)
     {

     }



  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      name: ['', [Validators.required]], 
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      direccion: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      isTransportista: [false],
      // Suponiendo que inicialmente todos los usuarios se registran con el mismo rol
     roles: [[{ idRol: '' }]] // Este es un valor temporal, deberías cambiarlo según tu lógica.
    });
  }


/**
 * método para registrar usuario
 * @returns 
 */
  
registrarUsuario() {
  if (this.registerForm.invalid) {
    return;
  }

  const datosUsuarioForm= this.registerForm.value;
      // Usa el valor del checkbox para determinar el idRol
  const idRolSelected = datosUsuarioForm.isTransportista ? 3 : 2;
  const user: RequestUser ={

    name: datosUsuarioForm.name,
    direccion: datosUsuarioForm.direccion,
    password: datosUsuarioForm.password,
    username: datosUsuarioForm.username,
    email: datosUsuarioForm.email,
    roles: [
      {
        idRol: idRolSelected
      }
    ] 
  };

  this.userService.registrarUsuario(user).subscribe(
    response =>{
      Swal.fire('Éxito', 'El usuario ha sido registrado correctamente', 'success');
      
      this.registerForm.reset();
  
      this.router.navigate(['/login']);
   
    }
    ,
    (error) => {
      // Error al registrar, muestra un mensaje de error con SweetAlert
      if (error.error && error.error.error) {
       // Accede al campo "error" dentro del objeto de error
       Swal.fire({
         icon: 'error',
         title: 'Error',
         text: error.error.error, // Muestra el mensaje de error del servidor
         confirmButtonColor: '#d33',
         confirmButtonText: 'Aceptar'
       });
     } else {
       // Si el servidor no envió un mensaje de error específico, muestra un mensaje genérico
       Swal.fire({
         icon: 'error',
         title: 'Error',
         text: 'Error al registrar el usuario.',
         confirmButtonColor: '#d33',
         confirmButtonText: 'Aceptar'
       });
     }
     console.error('Error al registrar el usuario:', error);
   }
);


}
}