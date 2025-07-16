import { Routes } from '@angular/router';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { CreateLeagueComponent } from './Pages/create-league/create-league.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { CreateTeamComponent } from './Pages/create-team/create-team.component';
import { LeagueDetailsComponent } from './Pages/league-details/league-details.component';
import { TeamDetailsComponent } from './Pages/team-details/team-details.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create-league', component: CreateLeagueComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'create-team', component: CreateTeamComponent },
  { path: 'league-details/:id', component: LeagueDetailsComponent },
  { path: 'team-details/:id', component: TeamDetailsComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];
