# Angular Lecture: API Consumption with HTTP Client and Services

## Objective
By the end of this session, students will:
- Understand how to set up and use Angular's HTTP Client for API communication.
- Learn how to create and use services for better modularity and reusability.
- Apply these concepts in a practical example.

## Prerequisites
- Basic understanding of Angular.
- Familiarity with TypeScript.
- Experience with React is advantageous but not mandatory.

---

## Section 1: Introduction to HTTP Client

### What is HTTP Client?
HTTP Client is a built-in module in Angular that provides tools to make HTTP requests and handle responses from APIs.

### Why Use HTTP Client?
- Simplifies the process of sending HTTP requests.
- Provides methods for GET, POST, PUT, DELETE, etc.
- Supports Observables for handling asynchronous data.
- Offers built-in error handling and interceptors.

### Setup in Standalone Components
To use the `HttpClientModule` in a standalone Angular application, include it in the `providers` array when bootstrapping your application or directly in the standalone component where it's needed.

#### Example

```typescript
// app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient()
  ]
};
```

---

## Section 2: Creating Services

### What are Services?
Services in Angular are singleton classes designed to share logic across multiple components.

### Why Use Services for API Calls?
- Centralizes the logic for API calls.
- Ensures separation of concerns (keeps components cleaner).
- Promotes code reusability.

### Example: Creating a Service

Run the following command to generate a service:

```bash
ng generate service api
```

This creates two files:
- `api.service.ts`: Contains the logic for the service.
- `api.service.spec.ts`: For unit testing.

#### Sample Code

```typescript
// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://example.com/api';

  constructor(private http: HttpClient) {}

  getItems(): Observable<any> {
    return this.http.get(`${this.baseUrl}/items`).pipe(
      catchError(this.handleError)
    );
  }

  createItem(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/items`, data).pipe(
      catchError(this.handleError)
    );
  }

  updateItem(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/items/${id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  deleteItem(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/items/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }
}
```

---

## Practical Example: Consuming API in a Component

### Step 1: Inject Service into a Component

```typescript
// app.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items: any[] = [];
  errorMessage: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getItems().subscribe({
      next: (data) => {
        this.items = data;
      },
      error: (error) => {
        this.errorMessage = error.message;
        console.error('Error fetching items:', error);
      }
    });
  }
}
```

### Step 2: Update Template to Display Data

```html
<!-- app.component.html -->
<div *ngIf="items.length">
  <ul>
    <li *ngFor="let item of items">{{ item.name }}</li>
  </ul>
</div>
<div *ngIf="!items.length && !errorMessage">
  <p>No items available.</p>
</div>
<div *ngIf="errorMessage">
  <p class="error">Error: {{ errorMessage }}</p>
</div>
```

### Step 3: Add Styles for Error Messages

```css
/* app.component.css */
.error {
  color: red;
  font-weight: bold;
}
