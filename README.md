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
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient()
  ]
}).catch(err => console.error(err));
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
    return throwError(()=>error.error.errors);
  }
}
```

---

## Practical Example: Consuming API in a Component

### Step 1: Create a Component to Display Items
Run the following command to create a new component:

```bash
ng generate component item-list --standalone
```

This creates the following files:
- `item-list.component.ts`: Contains the logic for the component.
- `item-list.component.html`: Contains the template for the component.
- `item-list.component.css`: Contains the styles for the component.

#### Sample Code

```typescript
// item-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-item-list',
  standalone: true,
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getItems().subscribe({
      next: (data) => {
        this.items = data;
      }
    });
  }
}
```

### Step 2: Update Template to Display Data

```html
<!-- item-list.component.html -->
<div *ngIf="items.length">
  <ul>
    <li *ngFor="let item of items">{{ item.name }}</li>
  </ul>
</div>
<div *ngIf="!items.length">
  <p>No items available.</p>
</div>
```

---

### Step 4: Create a Component to Add Data
Run the following command to create a new component:

```bash
ng generate component add-item --standalone
```

This creates the following files:
- `add-item.component.ts`: Contains the logic for the component.
- `add-item.component.html`: Contains the template for the component.
- `add-item.component.css`: Contains the styles for the component.

#### Sample Code

```typescript
// add-item.component.ts
import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  standalone: true,
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {
  newItem: any = {};
  successMessage: string = '';
  errorMessage: any = {};

  constructor(private apiService: ApiService) {}

  addItem(): void {
    this.apiService.createItem(this.newItem).subscribe({
      next: (response) => {
        this.successMessage = 'Item added successfully!';
        this.newItem = {};
      },
      error: (error) => {
        this.errorMessage = error;
        console.error('Error adding item:', error);
      }
    });
  }
}
```

### Step 5: Update Template to Add Data

```html
<!-- add-item.component.html -->
<div>
  <form (ngSubmit)="addItem()">
    <label for="name">Name:</label>
    <input type="text" [(ngModel)]="newItem.name" name="name" required>
    <p *ngIf="errorMessage.name" class="error">Error: {{ errorMessage.name.message }}</p> <br>

    <button type="submit">Add Item</button>
  </form>

  <p *ngIf="successMessage" class="success">{{ successMessage }}</p>
</div>
```

### Step 6: Add Styles for Success and Error Messages

```css
/* add-item.component.css */
.success {
  color: green;
  font-weight: bold;
}

.error {
  color: red;
  font-weight: bold;
}
```

---

### Step 7: Integrate the New Component
Update `app.component.html` to include the `add-item` component:

```html
<!-- app.component.html -->
<app-add-item></app-add-item>
<app-item-list></app-item-list>
```
