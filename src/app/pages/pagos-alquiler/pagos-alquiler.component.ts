import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, PatternValidator } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto, RequestAlquiler } from 'src/app/_model/alquiler';
import { RequestProducto } from 'src/app/_model/producto';
import { roles } from 'src/app/_model/rol';
import { AlquilerService } from 'src/app/_service/alquiler.service';
import { ProductoService } from 'src/app/_service/producto.service';
import { UserService } from 'src/app/_service/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pagos-alquiler',
  templateUrl: './pagos-alquiler.component.html',
  styleUrls: ['./pagos-alquiler.component.css']
})

export class PagosAlquilerComponent implements OnInit {

  miFormulario: FormGroup;
  errorMessage: string;
  esEdicion = false;
  idProducto: number;
  alquiler: RequestAlquiler;
  producto: RequestProducto;


  constructor(
    private pagosAlquiler: AlquilerService,
    private productoService: ProductoService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,) { }


  ngOnInit(): void {

    this.inicializarFormulario();
    // Suscribe para obtener el valor del ID de la URL
    this.activateRoute.params.subscribe((params) => {
      this.idProducto = +params['id']; // Convierte el valor a número
      // Ahora tienes el ID en this.idProducto y puedes usarlo en tu componente

      // Llama al servicio para obtener los detalles del producto por su ID
      this.productoService.obtenerProductoPorId(this.idProducto).subscribe(
        (producto: RequestProducto) => {
          // Asigna los detalles del producto a la variable producto
          this.producto = producto;
        },
        (error) => {
          // Maneja el error si no se pudo obtener el producto
          this.errorMessage = 'Error al obtener los detalles del producto.';
        }
      );
    });
    // Inicializar el formulario

  }


  
  // Método para inicializar el formulario
  private inicializarFormulario() {
    this.miFormulario = this.fb.group({
      titularTj: ['', Validators.required],
      numTarjeta: ['', [Validators.required, validarNumeroTarjeta()]],
      fcVencimiento: ['', Validators.required],
      // Limitar a 3 caracteres y solo caracteres numéricos
      cvv: ['', [Validators.required, Validators.maxLength(3), this.validarSoloNumeros()]],
    });
  }
  // Método para validar que el campo contenga solo números
  private validarSoloNumeros(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const cvv = control.value;
      if (!/^\d+$/.test(cvv)) {
        return { 'soloNumeros': true }; // Error de validación
      }
      return null; // Válido, no hay error
    };
  }
  

  registrarAlquiler() {
    if (this.miFormulario.valid) {
      // Obtén los valores del formulario
      const formValues = this.miFormulario.value;
      // Crea el objeto RequestAlquiler
      const alquiler: RequestAlquiler = {
        // Reemplaza con el ID adecuado si es necesario      
        numTarjeta: formValues.numTarjeta,
        fcVencimiento: formValues.fcVencimiento,
        cvv: formValues.cvv,
        titularTj: formValues.titularTj,
        producto: {
          idProducto: this.producto.idProducto // Utiliza el ID del producto deseado
        }
      };

      // Llama al servicio para registrar el alquiler
      this.pagosAlquiler.crearAlquiler(alquiler).subscribe(
        (response) => {
          // Muestra un SweetAlert de éxito
          const precioFormateado = this.producto.precio.toFixed(3);
          Swal.fire({
            icon: 'success',
            title: '¡Se ha realizado el pago correctamente!',
            text: `El pago realizado es de $${precioFormateado}`,
          }).then(() => {
            // Redirige al usuario a la página "principal"
            this.router.navigate(['/principal/producto']);
          });
        },
        (error) => {
          // Muestra un SweetAlert de error
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar el alquiler',
            text: 'Ha ocurrido un error al registrar el alquiler. Por favor, inténtalo nuevamente.',
          });

        }
      );
    }
  }



  // Método para validar el formulario antes de registrar
  validarFormulario() {
    // Puedes agregar aquí lógica adicional de validación si es necesario
    if (this.miFormulario.invalid) {
      // Marcar los campos inválidos como tocados para mostrar los mensajes de error
      Object.values(this.miFormulario.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }





  validarNumeroTarjetaEnTiempoReal(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const numeroTarjeta = inputElement.value.replace(/[^0-9]/g, ''); // Elimina caracteres no numéricos
    inputElement.value = numeroTarjeta; // Actualiza el valor en el input

    if (numeroTarjeta.length !== 19) {
      this.miFormulario.get('numTarjeta')?.setErrors({ 'numeroTarjetaInvalido': true }); // Error de validación
    } else {
      this.miFormulario.get('numTarjeta')?.setErrors(null); // Válido, no hay error
    }
  }
  /**
   * formatea la fecha dd/yyyy
   * @param event 
   */

  formatearFechaVencimiento(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;
  
    // Elimina todos los caracteres que no sean números ni '/'
    value = value.replace(/[^0-9/]/g, '');
  
    // Limita la longitud a 5 caracteres
    if (value.length > 5) {
      value = value.slice(0, 7);
    }
  
    // Formatea el valor en "MM/YY"
    if (value.length >= 2) {
      const month = parseInt(value.slice(0, 2), 10);
      if (month > 12) {
        // Si el mes es mayor a 12, ajusta automáticamente a 12
        value = '12/' + value.slice(3);
      }
    }
  
    // Si el valor contiene solo números, añade el separador '/'
    if (value.length >= 2 && value.indexOf('/') === -1) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
  
    inputElement.value = value;
  }
  

  /**
   * formatea la tarjeta en 4 digitos
   * @param event 
   */
  formatearNumeroTarjeta(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;

    // Elimina todos los caracteres que no sean números
    value = value.replace(/\D/g, '');

    // Agrupa el número de tarjeta en bloques de 4 dígitos
    if (value) {
      const matches = value.match(new RegExp('.{1,4}', 'g'));
      if (matches) {
        value = matches.join('-');
      }
    }


    inputElement.value = value;
  }


  /**
   * método para obtener los roles. 
      */





}

/**
 * valida la tarjeta contenga 16 en un formato
 * @returns 
 */

function validarNumeroTarjeta(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const numeroTarjeta = control.value;

    // Utiliza la expresión regular para verificar el formato
    const numeroTarjetaValido = /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/.test(numeroTarjeta);

    if (numeroTarjetaValido) {
      return null; // Válido, no hay error
    }

    return { 'numeroTarjetaInvalido': true }; // Error de validación
  };

}