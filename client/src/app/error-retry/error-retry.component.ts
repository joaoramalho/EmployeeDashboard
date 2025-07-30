import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-error-retry',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './error-retry.component.html',
  styleUrls: ['./error-retry.component.scss'],
})
export class ErrorRetryComponent {
  title = input('Failed to Load Data');
  message = input('There was an error loading the employee data. Please check your connection and try again.');
  retry = output<void>();

  onRetry() {
    this.retry.emit();
  }
}