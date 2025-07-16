// src/app/models/interfaces.ts (ou no league-details.component.ts)

export interface Player {
    id: number;
    name: string;
    IGN: string; // In-Game Name
    role: string; // e.g., 'Entry Fragger', 'AWPer', 'Support'
  }
  
  export interface Team {
    id: number;
    name: string;
    logoUrl?: string; // URL para o logo da equipe
    players: Player[];
    wins: number;
    losses: number;
    points: number;
    seed?: number; // Posição ou seed da equipe no torneio/liga
  }
  
  export interface League {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    teams: Team[]; // Equipes participantes da liga
    status: 'upcoming' | 'ongoing' | 'completed';
    // Adicione outras propriedades relevantes para sua liga, como regras, prêmios, etc.
  }