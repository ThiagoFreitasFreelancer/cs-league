import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common'; // Import NgIf and NgFor
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

interface Game {
  id: number;
  team1: string;
  team2: string;
  date: Date;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor], // Add NgIf and NgFor here
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isAdmin: boolean = false; // This should be determined by your authentication service
  games: Game[] = [];
  showGameModal: boolean = false;
  editingGame: boolean = false;
  currentGame: Game = { id: 0, team1: '', team2: '', date: new Date() };

  constructor() { }

  ngOnInit(): void {
    // In a real application, you would check the user's role here
    // For demonstration, let's assume isAdmin is true for now
    this.isAdmin = true; // Replace with actual admin check
    this.fetchGames();
  }

  fetchGames(): void {
    // In a real application, fetch games from your backend API
    // For demonstration purposes, use mock data:
    this.games = [
      { id: 1, team1: 'Team A', team2: 'Team B', date: new Date('2025-07-20T18:00:00') },
      { id: 2, team1: 'Team C', team2: 'Team D', date: new Date('2025-07-21T20:00:00') },
    ];
  }

  openAddGameModal(): void {
    this.editingGame = false;
    this.currentGame = { id: 0, team1: '', team2: '', date: new Date() };
    this.showGameModal = true;
  }

  editGame(game: Game): void {
    this.editingGame = true;
    this.currentGame = { ...game }; // Create a copy to avoid modifying the original directly
    this.showGameModal = true;
  }

  saveGame(): void {
    if (this.editingGame) {
      // Logic to update an existing game in your backend
      console.log('Updating game:', this.currentGame);
      const index = this.games.findIndex(g => g.id === this.currentGame.id);
      if (index !== -1) {
        this.games[index] = { ...this.currentGame }; // Update the game in the local array
      }
    } else {
      // Logic to add a new game to your backend
      console.log('Adding new game:', this.currentGame);
      // Assign a new ID (in a real app, this would come from the backend)
      this.currentGame.id = this.games.length > 0 ? Math.max(...this.games.map(g => g.id)) + 1 : 1;
      this.games.push({ ...this.currentGame }); // Add the new game to the local array
    }
    this.closeGameModal();
    // After saving, you might want to re-fetch games from the backend
    // this.fetchGames();
  }

  deleteGame(id: number): void {
    if (confirm('Tem certeza que deseja excluir este jogo?')) {
      // Logic to delete the game from your backend
      console.log('Deleting game with ID:', id);
      this.games = this.games.filter(game => game.id !== id); // Remove from local array
      // After deleting, you might want to re-fetch games from the backend
      // this.fetchGames();
    }
  }

  closeGameModal(): void {
    this.showGameModal = false;
  }
}
