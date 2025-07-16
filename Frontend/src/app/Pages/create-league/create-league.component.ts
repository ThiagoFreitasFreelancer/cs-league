import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-league',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-league.component.html',
  styleUrls: ['./create-league.component.css']
})
export class CreateLeagueComponent implements OnInit {
  createLeagueForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.createLeagueForm = this.fb.group({
      leagueName: ['', Validators.required],
      description: ['', Validators.maxLength(500)],
      rules: [''],
      isPublic: [true] // Campo para definir se a liga é pública ou privada
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.createLeagueForm.valid) {
      console.log('Dados da Nova Liga:', this.createLeagueForm.value);
      // Lógica para criar a liga (chamar API de backend)
      // Exemplo: this.leagueService.createLeague(this.createLeagueForm.value).subscribe(...)

      // Simulação de criação de liga bem-sucedida
      alert(`Liga "${this.createLeagueForm.value.leagueName}" criada com sucesso!`);
      this.router.navigate(['/dashboard']); // Redireciona para o dashboard
    } else {
      alert('Por favor, preencha o nome da liga e verifique os campos.');
    }
  }
}
