import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-books',
  standalone: true,
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnInit {
 books: Book[] = [];
  loading = false;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.loading = true;
    this.booksService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching publishers', err);
        this.loading = false;
      }
    });
  }
}
