import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: []
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;

  private readonly errorLogin: string = "Error al iniciar sesion, ingrese las credenciales correctas";

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginPageComponent>,
    private userService: UsuarioService,
    private alertaService: SweetalertService

  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onLogin(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(user => {

        if(user){
          console.log('Usuario logueado:', user);
          this.userService.emitUser(user);
          this.router.navigateByUrl('/veterinaria/home');
          this.dialogRef.close(true);
          return;
        }
        this.dialogRef.close(false);
        this.alertaService.showErrorAlert(this.errorLogin);

        
      
      });
    }
  }

  onCancel(): void {
  
    this.dialogRef.close(false);
  }
}
