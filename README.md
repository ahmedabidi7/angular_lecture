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

## Additional Resources
- [Angular HTTP Client Documentation](https://angular.io/guide/http)
- [RxJS Operators](https://rxjs.dev/guide/operators)
- [Angular CLI Documentation](https://angular.io/cli)

---

**Happy Coding!**

