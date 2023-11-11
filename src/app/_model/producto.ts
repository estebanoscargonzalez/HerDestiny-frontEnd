export interface RequestProducto {
  idProducto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  paquete: Paquete;
  categoria: Categoria;
}

interface Categoria {
  idCategoria: number;

}

interface Paquete {
  idPaquete: number;
  nombrePaquete: string;

}
