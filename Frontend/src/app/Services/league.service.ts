import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { League, Team, Player } from '../Models/interfaces';

@Injectable({ providedIn: 'root' })
export class LeagueService {
  // private apiUrl = '/api/leagues'; // Desabilitado para mock

  constructor() {}

  getLeagueById(id: number): Observable<League> {
    // MOCKS
    const players1: Player[] = [
      { id: 1, name: 'João Silva', IGN: 'Phoenix', role: 'Entry Fragger' },
      { id: 2, name: 'Maria Souza', IGN: 'Valkyrie', role: 'AWPer' },
      { id: 3, name: 'Carlos Lima', IGN: 'Blaze', role: 'Support' },
    ];
    const players2: Player[] = [
      { id: 4, name: 'Ana Pereira', IGN: 'Sentinel', role: 'Lurker' },
      { id: 5, name: 'Pedro Costa', IGN: 'Ghost', role: 'IGL' },
      { id: 6, name: 'Lucas Rocha', IGN: 'Echo', role: 'Rifler' },
    ];
    const players3: Player[] = [
      { id: 7, name: 'Bruna Dias', IGN: 'Shadow', role: 'Entry Fragger' },
      { id: 8, name: 'Rafael Alves', IGN: 'Sniper', role: 'AWPer' },
      { id: 9, name: 'Juliana Melo', IGN: 'Storm', role: 'Support' },
    ];
    const teams: Team[] = [
      {
        id: 1,
        name: 'Dragons',
        logoUrl: 'https://via.placeholder.com/40/FF5733/FFFFFF?text=D',
        players: players1,
        wins: 5,
        losses: 1,
        points: 15,
        seed: 1,
      },
      {
        id: 2,
        name: 'Wolves',
        logoUrl: 'https://via.placeholder.com/40/33C7FF/FFFFFF?text=W',
        players: players2,
        wins: 4,
        losses: 2,
        points: 12,
        seed: 2,
      },
      {
        id: 3,
        name: 'Falcons',
        logoUrl: 'https://via.placeholder.com/40/33FF57/FFFFFF?text=F',
        players: players3,
        wins: 3,
        losses: 3,
        points: 9,
        seed: 3,
      },
    ];
    const league: League = {
      id: id,
      name: `Liga Elite CS #${id}`,
      description: 'Liga de Counter-Strike para os melhores times!',
      startDate: new Date('2025-08-01T10:00:00'),
      endDate: new Date('2025-08-30T22:00:00'),
      teams: teams,
      status: 'ongoing',
    };
    return of(league);
  }

  updateTeamsOrder(leagueId: number, teams: Team[]): Observable<any> {
    return of({ success: true }); // Mocked response
  }

  // Adicione outros métodos conforme necessário (ex: adicionar/remover times, atualizar partidas)
} 