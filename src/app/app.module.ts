import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';


import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './aut.interceptor';
import { UserComponent } from './pages/user/user.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroUserComponent } from './pages/registro-user/registro-user.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrincipalComponent } from './pages/principal/principal.component';
import { PagosAlquilerComponent } from './pages/pagos-alquiler/pagos-alquiler.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { FooterComponent } from './pages/footer/footer.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';


import {MatDialogModule} from '@angular/material/dialog';
import { RegisterEditModalComponent } from './pages/user/register-edit-modal/register-edit-modal.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    RegistroUserComponent,
    PrincipalComponent,
    PagosAlquilerComponent,
    ProductosComponent,
    FooterComponent,
    InicioComponent,
    NosotrosComponent,
    RegisterEditModalComponent,
  

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule, 
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatToolbarModule
    
  ],

  exports:[
    FormsModule,
  ],
  providers: [  
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
