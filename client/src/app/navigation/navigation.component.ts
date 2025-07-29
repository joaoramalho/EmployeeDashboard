import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule],
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row>
        <span>Employee Dashboard</span>
      </mat-toolbar-row>
    </mat-toolbar>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    
    button {
      margin-left: 8px;
    }
    
    mat-icon {
      margin-right: 4px;
    }
  `]
})
export class NavigationComponent {}