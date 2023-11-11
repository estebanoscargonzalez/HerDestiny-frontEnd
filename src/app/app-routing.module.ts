import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { RegistroUserComponent } from './pages/registro-user/registro-user.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { PagosAlquilerComponent } from './pages/pagos-alquiler/pagos-alquiler.component';
import { FooterComponent } from './pages/footer/footer.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'principal/inicio', pathMatch: 'full' }, // Redirige a principal.
  {path: 'logout', component: LoginComponent},

  { path: 'principal', component: PrincipalComponent, children: [
    { path: 'producto', component: ProductosComponent },
    { path: 'pagos/:id', component: PagosAlquilerComponent },
    { path: 'nosotros', component: NosotrosComponent },
    { path: 'inicio', component: InicioComponent },
    { path: 'users', component: UserComponent },
    {path: 'footer', component: FooterComponent},
 
    
  ] },
  {path: 'registro', component: RegistroUserComponent},


 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
