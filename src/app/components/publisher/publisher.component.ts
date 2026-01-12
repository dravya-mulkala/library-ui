import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';   // for *ngIf, *ngFor
import { FormsModule } from '@angular/forms';     // for [(ngModel)]
import { PublisherService } from '../../services/publisher.service';
import { Publisher } from '../../models/publisher.model';

@Component({
  selector: 'app-publisher',
  standalone: true,
  imports: [CommonModule, FormsModule], // required for template bindings
  templateUrl: './publisher.component.html',
  styleUrl: './publisher.component.scss'
})
export class PublisherComponent implements OnInit {
  publishers: Publisher[] = [];
  newPublisher: Publisher = { publisherId: 0, name: '', books: [] };
  selectedPublisher: Publisher | null = null;

  // 🔹 Search-related variables
  searchId: number | null = null;           // user input
  foundPublisher: Publisher | null = null;  // result from backend
  searchError: string = '';                 // error message

  constructor(private publisherService: PublisherService) {}

  ngOnInit(): void {
    this.loadPublishers();
  }

  // ✅ Load all publishers
  loadPublishers(): void {
    this.publisherService.getPublishers().subscribe({
      next: (data) => this.publishers = data,
      error: (err) => console.error('Error fetching publishers', err)
    });
  }

  // ✅ Create new publisher
  addPublisher(): void {
    if (!this.newPublisher.name.trim()) return;
    this.publisherService.addPublisher(this.newPublisher).subscribe({
      next: () => {
        this.loadPublishers();
        this.newPublisher = { publisherId: 0, name: '', books: [] }; // reset form
      },
      error: (err) => console.error('Error adding publisher', err)
    });
  }

  // ✅ Select publisher for editing
  editPublisher(publisher: Publisher): void {
    this.selectedPublisher = { ...publisher };
  }

  // ✅ Update publisher
  updatePublisher(): void {
    if (!this.selectedPublisher) return;
    this.publisherService.updatePublisher(
      this.selectedPublisher.publisherId,
      this.selectedPublisher
    ).subscribe({
      next: () => {
        this.loadPublishers();
        this.selectedPublisher = null; // reset edit mode
      },
      error: (err) => console.error('Error updating publisher', err)
    });
  }

  // ✅ Delete publisher
  deletePublisher(id: number): void {
    this.publisherService.deletePublisher(id).subscribe({
      next: () => this.loadPublishers(),
      error: (err) => console.error('Error deleting publisher', err)
    });
  }

  // ✅ Search publisher by ID
  searchPublisher(): void {
    if (this.searchId === null) return;

    this.publisherService.getPublisherById(this.searchId).subscribe({
      next: (publisher) => {
        this.foundPublisher = publisher;
        this.searchError = '';
      },
      error: (err) => {
        console.error('Error fetching publisher by ID', err);
        this.foundPublisher = null;
        this.searchError = 'Publisher not found!';
      }
    });
  }
}
