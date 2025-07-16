import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Dados de Login:', this.loginForm.value);
      // Lógica de autenticação aqui (chamar API de backend)
      // Exemplo: this.authService.login(this.loginForm.value).subscribe(...)

      // Simulação de login bem-sucedido
      this.loginError = '';
      alert('Login realizado com sucesso!');
      this.router.navigate(['/dashboard']);
    } else {
      this.loginError = 'Por favor, preencha todos os campos corretamente.';
    }
  }

  loginWithSteam(): void {
    alert('Redirecionando para login via Steam...');
    // Lógica para iniciar o fluxo OAuth/OpenID do Steam
    // Isso geralmente envolve um redirecionamento para a URL de autenticação do Steam.
  }
}