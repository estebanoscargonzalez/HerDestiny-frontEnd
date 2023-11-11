export interface RequestUser {
  id?: number;
  username: string;
  name: string;
  password?: string;
  direccion: string;
  email: string;
  roles: Role[];
}

export interface Role {
  idRol: number;
  rolNombre?: string;
}


