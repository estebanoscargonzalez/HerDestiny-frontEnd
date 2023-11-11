import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RequestUser } from 'src/app/_model/user';
import { UserService } from 'src/app/_service/user.service';
import Swal from 'sweetalert2';
import { RegisterEditModalComponent } from './register-edit-modal/register-edit-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  usuarios: MatTableDataSource<RequestUser>;
  displayedColumns: string[] = ['username', 'name', 'email', 'rol', 'Acciones'];

  /**filtros */
  filtroUsername: string = '';
  filtroName: string = '';
  filtroEmail: string = '';

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private userService: UserService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.listarUsuarios().subscribe(
      data => {
        this.usuarios = new MatTableDataSource(data);
        this.usuarios.sort = this.sort;
      },
      err => {
        Swal.fire('Error', 'No se pudo cargar la lista de usuarios', 'error');
      }
    );
  }

  editUser(user: RequestUser): void {
    this.openRegisterDialog(user);
  }

  deleteUser(user: RequestUser): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Eliminarás al usuario ${user.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        // Llamar a tu servicio para eliminar el usuario
           this.userService.eliminarUsuario(user.id!).subscribe(
          () => {
            Swal.fire('Eliminado!', 'El usuario ha sido eliminado.', 'success');
            this.loadUsers();  // Recargamos la lista para mostrar los cambios
          },
          err => {
            Swal.fire('Error', 'Hubo un error al eliminar al usuario', 'error');
          }
        );
        
      }
    });
  }

  openRegisterDialog(user?: RequestUser) {
    const dialogRef = this.dialog.open(RegisterEditModalComponent, {
      width: '650px',
      data: {
        user: user || null, // Si no proporcionas un usuario, será modo registro
        isEditMode: !!user // Si proporcionas un usuario, será modo editar
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.loadUsers();
      
    });
  }
  

  applyFilters(): void {
    this.userService.listarUsuarios({
      username: this.filtroUsername,
      name: this.filtroName,
      email: this.filtroEmail
    }).subscribe(
      data => {
        this.usuarios = new MatTableDataSource(data);
        this.usuarios.sort = this.sort;
      },
      err => {
        Swal.fire('Error', 'No se pudo cargar la lista de usuarios con filtros', 'error');
      }
    );
  }


  getRoleNames(user: RequestUser): string {
    return user.roles.map(role => role.rolNombre).join(', ');
  }
}