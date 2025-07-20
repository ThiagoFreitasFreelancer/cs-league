import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-create-team',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {
  createTeamForm: FormGroup;
  searchUserQuery: string = '';
  searchResults: any[] = [];
  invitedMembers: any[] = [];
  successMessage: string = '';
  createdTeamId: number | null = null;
  teams: { id: number, name: string, members: string[] }[] = [
    { id: 1, name: 'Os Vingadores do CS', members: ['Jogador1', 'Jogador2'] },
    { id: 2, name: 'Time Prata', members: ['Jogador3'] },
    { id: 3, name: 'Time Bronze', members: ['Jogador4', 'Jogador1'] }
  ];

  // Simulação de usuários disponíveis para convite
  availableUsers = [
    { id: 1, username: 'Jogador1', email: 'jogador1@email.com' },
    { id: 2, username: 'Jogador2', email: 'jogador2@email.com' },
    { id: 3, username: 'Jogador3', email: 'jogador3@email.com' },
    { id: 4, username: 'Jogador4', email: 'jogador4@email.com' },
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.createTeamForm = this.fb.group({
      teamName: ['', Validators.required],
      teamTag: ['', [Validators.required, Validators.maxLength(5)]]
    });
  }

  ngOnInit(): void {}

  onSearchUsers(): void {
    if (this.searchUserQuery.length > 2) {
      this.searchResults = this.availableUsers.filter(user =>
        user.username.toLowerCase().includes(this.searchUserQuery.toLowerCase()) &&
        !this.invitedMembers.some(member => member.id === user.id)
      );
    } else {
      this.searchResults = [];
    }
  }

  inviteUser(user: any): void {
    if (!this.invitedMembers.some(member => member.id === user.id)) {
      this.invitedMembers.push(user);
      this.searchResults = this.searchResults.filter(res => res.id !== user.id);
      this.searchUserQuery = '';
    }
  }

  removeInvitedUser(user: any): void {
    this.invitedMembers = this.invitedMembers.filter(member => member.id !== user.id);
  }

  onCreateTeam(): void {
    if (this.createTeamForm.valid) {
      const newTeamData = {
        ...this.createTeamForm.value,
        members: this.invitedMembers.map(member => member.id)
      };
      console.log('Dados do Novo Time:', newTeamData);
      // Simula criação de time e gera um ID aleatório
      this.createdTeamId = Math.floor(Math.random() * 10000) + 1;
      this.successMessage = `Time "${newTeamData.teamName}" criado com sucesso! Convites enviados.`;
      this.createTeamForm.reset();
      this.invitedMembers = [];
      this.searchResults = [];
      this.searchUserQuery = '';
      // Não redireciona automaticamente
    } else {
      this.successMessage = '';
      alert('Por favor, preencha o nome e a tag do time corretamente.');
    }
  }

  goToTeamDetails(): void {
    if (this.createdTeamId) {
      this.router.navigate(['/team-details', this.createdTeamId]);
    }
  }

  goToTeamDetailsById(id: number): void {
    this.router.navigate(['/team-details', id]);
  }
} 