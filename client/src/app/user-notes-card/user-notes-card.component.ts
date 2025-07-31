import { Component, input, signal, inject, OnInit, DestroyRef, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { EmployeeService } from '../services/employee.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-notes-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatListModule, CommonModule, ReactiveFormsModule],
  templateUrl: './user-notes-card.component.html',
  styleUrls: ['./user-notes-card.component.scss']
})
export class UserNotesCardComponent implements OnInit {
  userEmail = input.required<string>();
  notes = signal<string[]>([]);
  isLoading = signal(true);
  newNoteInput = signal(false);
  private employeeService = inject(EmployeeService);
  private destroyRef = inject(DestroyRef);
  newNoteInputControl = new FormControl('');

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    this.isLoading.set(true);
    this.employeeService.getEmployeeNotes(this.userEmail())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (notes) => {
          this.notes.set(notes);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error loading notes:', error);
          this.notes.set([]);
          this.isLoading.set(false);
        }
      });
  }

  refreshNotes() {
    this.loadNotes();
  }

  newNote(){
    this.newNoteInput.set(true);
  }

  saveNote(){
    this.employeeService.saveNote(this.userEmail(), this.newNoteInputControl.value!).subscribe(updatedNotes => {
      this.notes.set(updatedNotes)
    });
  }
}