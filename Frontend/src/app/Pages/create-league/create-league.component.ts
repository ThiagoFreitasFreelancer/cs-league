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
  createdLeagueId: number | null = null;
  createdLeagueName: string = '';
  successMessage: string = '';

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
      // Simulação de criação de liga bem-sucedida com ID aleatório
      this.createdLeagueId = Math.floor(Math.random() * 10000) + 1;
      this.createdLeagueName = this.createLeagueForm.value.leagueName;
      this.successMessage = `Liga "${this.createdLeagueName}" criada com sucesso!`;
      // Limpa o formulário
      this.createLeagueForm.reset({ isPublic: true });
    } else {
      this.successMessage = '';
      alert('Por favor, preencha o nome da liga e verifique os campos.');
    }
  }

  goToLeagueDetails(): void {
    if (this.createdLeagueId) {
      this.router.navigate(['/league-details', this.createdLeagueId]);
    }
  }
}
