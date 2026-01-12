import { Routes } from '@angular/router';
import { PublisherComponent } from './components/publisher/publisher.component';
import { BooksComponent } from './components/books/books.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth-guard';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'publishers', component: PublisherComponent, canActivate: [AuthGuard] },
  { path: 'books', component: BooksComponent, canActivate: [AuthGuard] },
  { path: 'authors', component: AuthorsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'publishers', pathMatch: 'full' },
  { path: '**', redirectTo: 'publishers' }
];

