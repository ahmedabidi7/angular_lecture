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
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://example.com/api';

  constructor(private http: HttpClient) {}

  getItems(): Observable<any> {
    return this.http.get(`${this.baseUrl}/items`);
  }

  createItem(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/items`, data);
  }

  updateItem(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/items/${id}`, data);
  }

  deleteItem(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/items/${id}`);
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

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getItems().subscribe((data) => {
      this.items = data;
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
<div *ngIf="!items.length">
  <p>No items available.</p>
</div>
```

---

# Angular Project: CRUD App

## Objective
Build a fully functional Angular CRUD application using an existing API.

## Detailed Steps

### Step 1: Create a New Angular Project

Run the following command to create a new project:

```bash
ng new crud-app --standalone
cd crud-app
```

### Step 2: Install Dependencies and Setup HTTP Client

Ensure `HttpClientModule` is included by providing it during application bootstrap.

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

### Step 3: Create a Service for API Communication

Generate a service:

```bash
ng generate service api
```

Update the service with CRUD methods:

```typescript
// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://example.com/api';

  constructor(private http: HttpClient) {}

  getItems(): Observable<any> {
    return this.http.get(`${this.baseUrl}/items`);
  }

  createItem(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/items`, data);
  }

  updateItem(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/items/${id}`, data);
  }

  deleteItem(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/items/${id}`);
  }
}
```

### Step 4: Create Components

#### Item List Component

```bash
ng generate component ItemList --standalone
```

Update the `ItemListComponent` to fetch and display items:

```typescript
// item-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-item-list',
  standalone: true,
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
  providers: [ApiService]
})
export class ItemListComponent implements OnInit {
  items: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getItems().subscribe((data) => {
      this.items = data;
    });
  }
}
```

#### Template for Item List

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

#### Item Form Component

```bash
ng generate component ItemForm --standalone
```

Update the `ItemFormComponent` for creating and updating items:

```typescript
// item-form.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-item-form',
  standalone: true,
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css'],
  providers: [ApiService]
})
export class ItemFormComponent {
  itemForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.itemForm = this.fb.group({
      name: ['']
    });
  }

  submit(): void {
    this.apiService.createItem(this.itemForm.value).subscribe(() => {
      alert('Item created successfully!');
      this.itemForm.reset();
    });
  }
}
```

#### Template for Item Form

```html
<!-- item-form.component.html -->
<form [formGroup]="itemForm" (ngSubmit)="submit()">
  <label for="name">Item Name:</label>
  <input id="name" formControlName="name" />
  <button type="submit">Submit</button>
</form>
```

---

### Step 5: Integrate Components

Update the `AppComponent` to include both `ItemListComponent` and `ItemFormComponent`.

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemFormComponent } from './item-form/item-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ItemListComponent, ItemFormComponent],
  template: `
    <div>
      <h1>CRUD Application</h1>
      <app-item-form></app-item-form>
      <app-item-list></app-item-list>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
```

---

With these steps completed, your Angular CRUD application will be functional and capable of interacting with the provided API.

