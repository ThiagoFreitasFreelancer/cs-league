import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, CdkDrag, CdkDropList, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Team } from '../../Models/interfaces';

@Component({
  selector: 'app-league-teams-table',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
  ],
  template: `
    <div class="team-list" cdkDropList (cdkDropListDropped)="onDrop($event)">
      <div class="team-header-row">
        <div class="header-cell">#</div>
        <div class="header-cell">Logo</div>
        <div class="header-cell">Nome</div>
        <div class="header-cell">Vitórias</div>
        <div class="header-cell">Derrotas</div>
        <div class="header-cell">Pontos</div>
        <div class="header-cell">Ações</div>
      </div>
      <div *ngFor="let team of teams; let i = index" class="team-row" cdkDrag>
        <div>{{ i + 1 }}</div>
        <div><img *ngIf="team.logoUrl" [src]="team.logoUrl" alt="Logo" width="32" height="32"></div>
        <div>{{ team.name }}</div>
        <div>{{ team.wins }}</div>
        <div>{{ team.losses }}</div>
        <div>{{ team.points }}</div>
        <div>
          <button (click)="editTeam.emit(team)">Editar</button>
          <button (click)="removeTeam.emit(team.id)">Remover</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./league-details.component.css']
})
export class LeagueTeamsTableComponent {
  @Input() teams: Team[] = [];
  @Output() teamsReordered = new EventEmitter<Team[]>();
  @Output() editTeam = new EventEmitter<Team>();
  @Output() removeTeam = new EventEmitter<number>();

  onDrop(event: CdkDragDrop<Team[]>) {
    moveItemInArray(this.teams, event.previousIndex, event.currentIndex);
    this.teams.forEach((team, idx) => team.seed = idx + 1);
    this.teamsReordered.emit(this.teams);
  }
} 