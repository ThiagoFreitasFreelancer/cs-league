import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  userName: string = 'Jogador Exemplo';
  email: string = 'jogador.exemplo@email.com';
  steamId: string = '76561198123456789'; // Exemplo de Steam ID
  isSteamConnected: boolean = true;
  profilePictureUrl: string = 'https://via.placeholder.com/150/007bff/ffffff?text=JP'; // Placeholder

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      username: [this.userName, Validators.required],
      email: [this.email, [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  onUpdateProfile(): void {
    if (this.profileForm.valid) {
      console.log('Perfil atualizado:', this.profileForm.value);
      alert('Perfil atualizado com sucesso!');
    } else {
      alert('Por favor, corrija os erros no formulário.');
    }
  }

  connectSteam(): void {
    alert('Iniciando conexão com Steam...');
    this.isSteamConnected = true;
    this.steamId = '76561198123456789';
  }

  disconnectSteam(): void {
    if (confirm('Tem certeza que deseja desconectar sua conta Steam?')) {
      alert('Conta Steam desconectada.');
      this.isSteamConnected = false;
      this.steamId = '';
    }
  }

  basicStats = {
    kd: '1.25',
    adr: '88.5',
    hs: '48%',
    matchesPlayed: 150
  };
} 