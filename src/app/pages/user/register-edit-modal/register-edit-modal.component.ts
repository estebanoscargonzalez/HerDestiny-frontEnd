import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { roles } from 'src/app/_model/rol';
import { RequestUser, Role } from 'src/app/_model/user';
import { RolService } from 'src/app/_service/rol.service';
import { UserService } from 'src/app/_service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-edit-modal',
  templateUrl: './register-edit-modal.component.html',
  styleUrls: ['./register-edit-modal.component.css']
})
export class RegisterEditModalComponent implements OnInit {
  isEditMode = false;
  registerEditForm: FormGroup;
  allRoles: roles[] = [];
  passwordModified: boolean = false; 

  constructor(
    public dialogRef: MatDialogRef<RegisterEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService,
    private rolesService: RolService
  ) {
    this.isEditMode = data.isEditMode;
  }

  ngOnInit(): void {
    console.log('Modo de edición:', this.isEditMode); 
    this.cargarRoles();
    this.initForm();
    if (this.isEditMode && this.data.user) {
      this.passwordModified = false;
      const userWithRoleIds = {
        ...this.data.user,
        roles: this.data.user.roles[0].idRol,
      };
      this.registerEditForm.patchValue(userWithRoleIds);
    }
  }

  onSubmit() {
    if (this.registerEditForm.invalid) {
      return;
    }

    const formData = this.registerEditForm.value;

    // 
    const user: RequestUser = {
      id: formData.id,
      name: formData.name,
      direccion: formData.direccion,
      username: formData.username,
      email: formData.email,
      roles: [{ idRol: formData.roles }] 
    };

    
    if (this.passwordModified && formData.password && formData.password.trim()) {
      user.password = formData.password;
    }

    if (this.isEditMode) {
      this.userService.modificarUsuario(user).subscribe(
        response => {
          Swal.fire('Éxito', 'El usuario ha sido modificado correctamente', 'success');
          this.dialogRef.close(response);
        },
        error => this.handleError(error)
      );
    } else {
      this.userService.registrarUsuario(user).subscribe(
        response => {
          Swal.fire('Éxito', 'El usuario ha sido registrado correctamente', 'success');
          this.dialogRef.close(response);
        },
        error => this.handleError(error)
      );
    }
  }

  private handleError(error: any) {
    if (error.error && error.error.error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.error.error,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al procesar la solicitud.',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      });
    }
    console.error('Error:', error);
  }

  cargarRoles(): void {
    this.rolesService.listarRoles().subscribe(
      roles => {
        this.allRoles = roles;
        console.log('Roles recibidos:', roles);
      },
      error => {
        console.error('Error al cargar roles:', error);
      }
    );
  }

  private initForm() {

    let passwordValidators = this.isEditMode ? [] : [Validators.required];

    this.registerEditForm = this.fb.group({
      id: [null],
      username: [{value: '', disabled: this.isEditMode}, Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      password: ['', passwordValidators],
      roles: [null, Validators.required],
    });


    this.registerEditForm.get('password')?.valueChanges.subscribe(() => {
      this.passwordModified = true;
    });
  }
}