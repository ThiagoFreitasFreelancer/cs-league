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
      alert(`Time "${newTeamData.teamName}" criado com sucesso! Convites enviados.`);
      this.router.navigate(['/dashboard']);
    } else {
      alert('Por favor, preencha o nome e a tag do time corretamente.');
    }
  }
} 