export interface RequestAlquiler {
  numTarjeta: string;
  fcVencimiento: string; 
  cvv: string;
  titularTj: string;
  producto: Producto;
}

export interface Producto {
  idProducto: number;

}



