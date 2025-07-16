import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  // Validador personalizado para verificar se as senhas coincidem
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
     ? null : { 'mismatch': true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Dados de Cadastro:', this.registerForm.value);
      // Lógica de registro aqui (chamar API de backend)
      // Exemplo: this.authService.register(this.registerForm.value).subscribe(...)

      // Simulação de registro bem-sucedido
      alert('Cadastro realizado com sucesso!');
      this.router.navigate(['/login']); // Redireciona para a tela de login após o cadastro
    } else {
      alert('Por favor, preencha todos os campos corretamente e verifique se as senhas coincidem.');
    }
  }
}