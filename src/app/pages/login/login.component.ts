import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Asegúrate de tener esta línea importada
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/_model/loginModel';
import { LoginService } from 'src/app/_service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  isLoggedIn: boolean = false;
  loginForm: FormGroup;
  loginData: LoginModel;
  errorMessage: string; 

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {

    this.loginData = new LoginModel();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required], // Modificar el nombre del control a 'cdUsuario'
      password: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.isLoggedIn = this.loginService.isAuthenticated();
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    this.loginService.login(username, password).subscribe(
      response => {
        const token = response.token;
        const username = response.username;
        const authorities = response.authorities;    
        
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('authorities', JSON.stringify(authorities));
        this.isLoggedIn = true;
        // Redirigir al usuario a la página principal o a la página deseada después del login
        this.router.navigate(['/principal/inicio']);
      },
      error => {
        this.errorMessage = error.error;

      }
    );
  }


  logout() {
    this.loginService.logout();
    this.isLoggedIn = false;
  }


}
