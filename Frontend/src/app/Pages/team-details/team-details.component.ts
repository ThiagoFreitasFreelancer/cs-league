import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {
  teamId: string | null = null;
  team = {
    name: 'Time Exemplo',
    members: [
      { id: 1, username: 'Jogador1' },
      { id: 2, username: 'Jogador2' }
    ],
    wins: 10,
    losses: 5,
    description: 'Descrição do time exemplo.'
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.teamId = this.route.snapshot.paramMap.get('id');
    // Aqui você buscaria os dados reais do time pelo ID
  }
} 