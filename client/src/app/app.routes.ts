import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  { 
    path: 'user-profile/:email', 
    loadComponent: () => import('./user-profile/user-profile.component').then(m => m.UserProfileComponent)
  },
  { 
    path: 'favourites', 
    loadComponent: () => import('./favourites/favourites.component').then(m => m.FavouritesComponent)
  }
];
