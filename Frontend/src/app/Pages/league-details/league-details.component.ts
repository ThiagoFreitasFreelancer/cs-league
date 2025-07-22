import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { CdkDragDrop, moveItemInArray, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { League, Team } from '../../Models/interfaces';
import { LeagueService } from '../../Services/league.service';
import { AuthService } from '../../Services/auth.service';
import { LeagueTeamsTableComponent } from './league-teams-table.component';
import { LeagueBracketComponent } from '../../Components/league-bracket/league-bracket.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-league-details',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    DatePipe,
    FlexLayoutModule,
    LeagueTeamsTableComponent,
    LeagueBracketComponent,
    HttpClientModule,
  ],
  templateUrl: './league-details.component.html',
  styleUrls: ['./league-details.component.css'],
})
export class LeagueDetailsComponent implements OnInit {
  leagueId: number | null = null;
  league: League | null = null;
  isLoading = true;
  isAdmin = false;
  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private leagueService: LeagueService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.leagueId = Number(params.get('id'));
      if (this.leagueId) {
        this.fetchLeagueDetails(this.leagueId);
      }
    });
    this.authService.isAdmin().subscribe(isAdmin => this.isAdmin = isAdmin);
  }

  fetchLeagueDetails(id: number): void {
    this.isLoading = true;
    this.errorMsg = '';
    this.leagueService.getLeagueById(id).subscribe({
      next: (league) => {
        this.league = league;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMsg = 'Erro ao carregar detalhes da liga.';
        this.isLoading = false;
      }
    });
  }

  onTeamsReordered(teams: Team[]) {
    if (this.leagueId) {
      this.leagueService.updateTeamsOrder(this.leagueId, teams).subscribe();
    }
  }

  onEditTeam(team: Team) {
    // Lógica para abrir modal de edição ou navegação
    alert('Editar equipe: ' + team.name);
  }

  onRemoveTeam(teamId: number) {
    if (confirm('Tem certeza que deseja remover esta equipe da liga?')) {
      if (this.league && this.league.teams) {
        this.league.teams = this.league.teams.filter(team => team.id !== teamId);
        this.onTeamsReordered(this.league.teams);
      }
    }
  }

  // Métodos de gerenciamento de equipes e partidas podem ser implementados aqui usando os serviços
}
