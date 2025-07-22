import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Team } from '../../Models/interfaces';

@Component({
  selector: 'app-league-bracket',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './league-bracket.component.html',
  styleUrls: ['./league-bracket.component.css']
})
export class LeagueBracketComponent implements OnChanges {
  @Input() teams: Team[] = [
    { id: 1, name: 'Team A', logoUrl: '', players: [
      { id: 1, name: 'Player 1', IGN: 'PlayerOne', role: 'Forward' },
      { id: 2, name: 'Player 2', IGN: 'PlayerTwo', role: 'Midfielder' },
      { id: 3, name: 'Player 3', IGN: 'PlayerThree', role: 'Defender' },
      { id: 4, name: 'Player 4', IGN: 'PlayerFour', role: 'Forward' },
      {id: 5, name: 'Player 5', IGN: 'PlayerFive', role: 'Midfielder' }
    ], wins: 10, losses: 2, points: 30 },
    { id: 2, name: 'Team B', logoUrl: '', players: [
      { id: 6, name: 'Player 4', IGN: 'PlayerFour', role: 'Forward' },
      { id: 7, name: 'Player 5', IGN: 'PlayerFive', role: 'Midfielder' },
      { id: 8, name: 'Player 6', IGN: 'PlayerSix', role: 'Defender' },
      { id: 9, name: 'Player 7', IGN: 'PlayerSeven', role: 'Forward' },
      { id: 10, name: 'Player 8', IGN: 'PlayerEight', role: 'Midfielder' }
    ], wins: 8, losses: 4, points: 24 },
    { id: 3, name: 'Team C', logoUrl: '', players: [
      { id: 11, name: 'Player 7', IGN: 'PlayerSeven', role: 'Forward' },
      { id: 12, name: 'Player 8', IGN: 'PlayerEight', role: 'Midfielder' },
      { id: 13, name: 'Player 9', IGN: 'PlayerNine', role: 'Defender' },
      { id: 14, name: 'Player 10', IGN: 'PlayerTen', role: 'Forward' },
      { id: 15, name: 'Player 11', IGN: 'PlayerEleven', role: 'Midfielder' }
    ], wins: 6, losses: 6, points: 18 },
    { id: 4, name: 'Team D', logoUrl: '', players: [
      { id: 16, name: 'Player 10', IGN: 'PlayerTen', role: 'Forward' },
      { id: 17, name: 'Player 11', IGN: 'PlayerEleven', role: 'Midfielder' },
      { id: 18, name: 'Player 12', IGN: 'PlayerTwelve', role: 'Defender' },
      { id: 19, name: 'Player 13', IGN: 'PlayerThirteen', role: 'Forward' },
      { id: 20, name: 'Player 14', IGN: 'PlayerFourteen', role: 'Midfielder' }
    ], wins: 4, losses: 8, points: 12 }
  ];
  @Input() roundCount: number = 4; // Número de rodadas no torneio
  @Input() matchCount: number = 2; // Número de partidas por rodada
  
  bracketRounds: { matches: { teamA: string, teamB: string }[] }[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['teams'] && this.teams.length > 1) {
      this.generateBracket();
    }
  }

  generateBracket() {
    const rounds = [];
    let currentTeams = [...this.teams.map(t => t.name)];
    while (currentTeams.length > 1) {
      const matches = [];
      for (let i = 0; i < currentTeams.length; i += 2) {
        const teamA = currentTeams[i];
        const teamB = currentTeams[i + 1] || 'BYE';
        matches.push({ teamA, teamB });
      }
      rounds.push({ matches });
      // Simula vencedores (aqui só pega o primeiro de cada par, ajuste conforme lógica real)
      
      currentTeams = matches.map(m => m.teamA);
    }
    this.bracketRounds = rounds;
  }
}