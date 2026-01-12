import { Component, OnInit } from '@angular/core';
import { Author } from '../../models/author.model';
import { AuthorService } from '../../services/authors.service';

@Component({
  selector: 'app-authors',
  standalone: true,
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.scss'
})
export class AuthorsComponent implements OnInit {
  authors: Author[] = [];
  loading = false;

  constructor(private authorService: AuthorService) {}

  ngOnInit(): void {
    this.loading = true;
    this.authorService.getAuthors().subscribe({
      next: (data) => {
        this.authors = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching authors', err);
        this.loading = false;
      }
    });
  }
}
