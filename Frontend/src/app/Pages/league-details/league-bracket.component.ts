import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Team } from '../../Models/interfaces';

interface Match {
  id: number;
  round: number;
  teamA: Team | null;
  teamB: Team | null;
  scoreA: number | null;
  scoreB: number | null;
  winner: Team | null;
}

@Component({
  selector: 'app-league-bracket',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bracket-container" *ngIf="bracket.length > 0; else noBracket">
      <div class="bracket-round" *ngFor="let round of bracket; let r = index">
        <div class="round-title">{{ getRoundName(r, bracket.length) }}</div>
        <div class="bracket-matches">
          <div class="bracket-match" *ngFor="let match of round">
            <div class="team-row">
              <span class="team-name">{{ match.teamA?.name || 'TBD' }}</span>
              <input type="number" min="0" [(ngModel)]="match.scoreA" class="score-input" />
            </div>
            <div class="team-row">
              <span class="team-name">{{ match.teamB?.name || 'TBD' }}</span>
              <input type="number" min="0" [(ngModel)]="match.scoreB" class="score-input" />
            </div>
            <button class="winner-btn" (click)="setWinner(match)">Avançar</button>
            <div *ngIf="match.winner" class="winner-label">Vencedor: {{ match.winner.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <ng-template #noBracket>
      <p>Chaveamento será gerado quando houver pelo menos 2 times.</p>
    </ng-template>
  `,
  styleUrls: ['./league-details.component.css']
})
export class LeagueBracketComponent implements OnChanges {
  @Input() teams: Team[] = [];
  bracket: Match[][] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['teams']) {
      this.generateBracket();
    }
  }

  generateBracket() {
    this.bracket = [];
    if (!this.teams || this.teams.length < 2) return;
    // Limita a 32 times
    const maxTeams = 32;
    let teams = this.teams.slice(0, maxTeams);
    // Preenche com null para completar potência de 2
    const nextPow2 = Math.pow(2, Math.ceil(Math.log2(teams.length)));
    while (teams.length < nextPow2) teams.push(null as any);
    let roundTeams: (Team|null)[] = teams;
    let round = 1;
    let matchId = 1;
    while (roundTeams.length > 1) {
      const matches: Match[] = [];
      for (let i = 0; i < roundTeams.length; i += 2) {
        matches.push({
          id: matchId++,
          round,
          teamA: roundTeams[i],
          teamB: roundTeams[i + 1],
          scoreA: null,
          scoreB: null,
          winner: null
        });
      }
      this.bracket.push(matches);
      // Prepara times para próxima rodada (vencedores ou null)
      roundTeams = matches.map(m => m.winner);
      round++;
    }
  }

  setWinner(match: Match) {
    if (match.teamA && match.teamB && match.scoreA !== null && match.scoreB !== null) {
      match.winner = match.scoreA > match.scoreB ? match.teamA : match.teamB;
      // Atualiza o time na próxima rodada
      const roundIdx = match.round - 1;
      if (this.bracket[roundIdx + 1]) {
        const nextMatchIdx = Math.floor(this.bracket[roundIdx].indexOf(match) / 2);
        const nextMatch = this.bracket[roundIdx + 1][nextMatchIdx];
        if (nextMatch) {
          if (this.bracket[roundIdx].indexOf(match) % 2 === 0) {
            nextMatch.teamA = match.winner;
          } else {
            nextMatch.teamB = match.winner;
          }
        }
      }
    }
  }

  getRoundName(roundIdx: number, totalRounds: number): string {
    if (totalRounds === 1) return 'Final';
    if (roundIdx === totalRounds - 2) return 'Semifinal';
    if (roundIdx === totalRounds - 3) return 'Quartas';
    if (roundIdx === 0) return 'Oitavas';
    return `Rodada ${roundIdx + 1}`;
  }
} 