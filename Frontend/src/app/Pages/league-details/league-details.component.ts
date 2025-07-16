import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf, DatePipe } from '@angular/common'; // Import DatePipe
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop'; // Importar módulos do CDK Drag and Drop

// Importe as interfaces que definimos
import { League, Team, Player } from '../../Models/interfaces'; // Ajuste o caminho se necessário

@Component({
  selector: 'app-league-details',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, DatePipe, CdkDrag, CdkDropList], // Adicionar módulos do CDK Drag and Drop
  templateUrl: './league-details.component.html',
  styleUrls: ['./league-details.component.css']
})
export class LeagueDetailsComponent implements OnInit {
  leagueId: number | null = null;
  league: League | null = null;
  isLoading: boolean = true;
  isAdmin: boolean = true; // Para simular permissões de admin, idealmente viria de um serviço de autenticação

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.leagueId = Number(params.get('id'));
      if (this.leagueId) {
        this.fetchLeagueDetails(this.leagueId);
      }
    });
    // Em um cenário real, você verificaria o papel do usuário logado
    // this.authService.isAdmin().subscribe(isAdmin => this.isAdmin = isAdmin);
  }

  fetchLeagueDetails(id: number): void {
    this.isLoading = true;
    // Simulação de chamada de API
    setTimeout(() => {
      // Dados mockados para uma liga, equipes e jogadores
      const mockPlayers1: Player[] = [
        { id: 101, name: 'João Silva', IGN: 'Phoenix', role: 'Entry Fragger' },
        { id: 102, name: 'Maria Souza', IGN: 'Valkyrie', role: 'AWPer' },
      ];
      const mockPlayers2: Player[] = [
        { id: 103, name: 'Pedro Costa', IGN: 'Ghost', role: 'Support' },
        { id: 104, name: 'Ana Pereira', IGN: 'Sentinel', role: 'Lurker' },
      ];
      const mockPlayers3: Player[] = [
        { id: 105, name: 'Carlos Santos', IGN: 'Blaze', role: 'IGL' },
        { id: 106, name: 'Sofia Lima', IGN: 'Echo', role: 'Rifler' },
      ];

      const mockTeams: Team[] = [
        { id: 1, name: 'Dragons', logoUrl: 'https://via.placeholder.com/40/FF5733/FFFFFF?text=D', players: mockPlayers1, wins: 5, losses: 1, points: 15, seed: 1 },
        { id: 2, name: 'Wolves', logoUrl: 'https://via.placeholder.com/40/33C7FF/FFFFFF?text=W', players: mockPlayers2, wins: 4, losses: 2, points: 12, seed: 2 },
        { id: 3, name: 'Falcons', logoUrl: 'https://via.placeholder.com/40/33FF57/FFFFFF?text=F', players: mockPlayers3, wins: 3, losses: 3, points: 9, seed: 3 },
        { id: 4, name: 'Sharks', logoUrl: 'https://via.placeholder.com/40/FF33E9/FFFFFF?text=S', players: [], wins: 2, losses: 4, points: 6, seed: 4 },
        { id: 5, name: 'Vipers', logoUrl: 'https://via.placeholder.com/40/FFBB33/FFFFFF?text=V', players: [], wins: 1, losses: 5, points: 3, seed: 5 },
      ];

      this.league = {
        id: id,
        name: `Liga Elite CS #${id}`,
        description: `Esta é a descrição detalhada da Liga Elite CS, onde os melhores times competem pela glória!`,
        startDate: new Date('2025-08-01T10:00:00'),
        endDate: new Date('2025-08-30T22:00:00'),
        teams: mockTeams,
        status: 'ongoing',
      };
      this.isLoading = false;
    }, 1000);
  }

  // --- Funções de Drag and Drop para a tabela de equipes ---
  drop(event: CdkDragDrop<Team[]>): void {
    // moveItemInArray é uma função utilitária do CDK para reordenar arrays
    if (this.league && this.league.teams) {
      moveItemInArray(this.league.teams, event.previousIndex, event.currentIndex);
      // Opcional: Atualizar o "seed" ou posição da equipe após o drop
      this.league.teams.forEach((team, index) => {
        team.seed = index + 1;
      });
      console.log('Equipes reordenadas:', this.league.teams);
      // Em um cenário real, você enviaria essa atualização para o seu backend
      // this.leagueService.updateLeagueTeamsOrder(this.league.id, this.league.teams.map(t => t.id)).subscribe();
    }
  }

  // --- Funções de Gerenciamento de Equipes (para administradores) ---
  editTeam(team: Team): void {
    console.log('Editar equipe:', team);
    // Lógica para abrir um modal de edição ou navegar para uma página de edição da equipe
  }

  removeTeam(teamId: number): void {
    if (confirm('Tem certeza que deseja remover esta equipe da liga?')) {
      if (this.league && this.league.teams) {
        this.league.teams = this.league.teams.filter(team => team.id !== teamId);
        console.log('Equipe removida. Novas equipes:', this.league.teams);
        // Em um cenário real, você enviaria essa remoção para o seu backend
        // this.leagueService.removeTeamFromLeague(this.league.id, teamId).subscribe();
      }
    }
  }

  addTeamToLeague(): void {
    console.log('Adicionar equipe à liga');
    // Lógica para abrir um modal de seleção/criação de equipe
    // e adicioná-la à this.league.teams
    // Exemplo:
    // const newTeam: Team = { id: Math.random(), name: 'Nova Equipe', logoUrl: '', players: [], wins: 0, losses: 0, points: 0, seed: this.league.teams.length + 1 };
    // this.league.teams.push(newTeam);
  }
}