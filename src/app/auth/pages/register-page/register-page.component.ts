import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/shared/interfaces/usuario.interface';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: []
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RegisterPageComponent>
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onRegister(): void {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      const newUser: Usuario = {
        idUsuario: (Math.floor(Math.random() * 1000) + 1).toString(),
        nombre: formValue.name,
        password: formValue.password,
        email: formValue.email,
        userRole: 'USER'
      };
      this.authService.register(newUser).subscribe(user => {
        console.log('Usuario registrado:', user);
        this.router.navigateByUrl('/auth/login');
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
