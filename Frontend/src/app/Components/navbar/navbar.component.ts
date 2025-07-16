import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav class="navbar">
      <div class="navbar-container">
        <a class="navbar-brand" routerLink="/">CS League</a>
        <ul class="navbar-links">
          <li><a routerLink="/dashboard" routerLinkActive="active">Dashboard</a></li>
          <li><a routerLink="/create-league" routerLinkActive="active">Criar Liga</a></li>
          <li><a routerLink="/create-team" routerLinkActive="active">Criar Time</a></li>
          <li><a routerLink="/profile" routerLinkActive="active">Perfil</a></li>
        </ul>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: #1e293b;
      color: #fff;
      padding: 0.75rem 1.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    }
    .navbar-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 1200px;
      margin: 0 auto;
    }
    .navbar-brand {
      font-size: 1.5rem;
      font-weight: bold;
      color: #38bdf8;
      text-decoration: none;
    }
    .navbar-links {
      list-style: none;
      display: flex;
      gap: 1.5rem;
      margin: 0;
      padding: 0;
    }
    .navbar-links a {
      color: #fff;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
    }
    .navbar-links a.active, .navbar-links a:hover {
      color: #38bdf8;
    }
    @media (max-width: 600px) {
      .navbar-container {
        flex-direction: column;
        align-items: flex-start;
      }
      .navbar-links {
        flex-direction: column;
        gap: 0.75rem;
        width: 100%;
      }
    }
  `]
})
export class NavbarComponent {} 