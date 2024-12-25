Here is an updated README file with the additional step for generating the interceptor file using the Angular CLI:

---

# Angular Interceptor Setup

This guide explains the steps to add an HTTP interceptor in an Angular application to include an authentication token in API requests.

---

## **1. Generate the Interceptor File**

Use the Angular CLI to generate the interceptor file. This will create the file with the basic structure for an interceptor.

Run the following command:

```bash
ng generate interceptor interceptors/token
```

This will create two files:
- `src/app/interceptors/token.interceptor.ts`
- `src/app/interceptors/token.interceptor.spec.ts`

---

## **2. Implement the Interceptor Logic**

Update the generated `token.interceptor.ts` file with the following logic:

### File: `interceptors/token.interceptor.ts`

```typescript
import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('authToken'); // Retrieve token from localStorage

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}` // Add the token to the Authorization header
      }
    });
  }

  return next(req);
};
```

---

## **3. Add the Interceptor to the App Configuration**

Update your application's configuration to include the interceptor.

### File: `app.config.ts` (or equivalent configuration file)

```typescript
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { routes } from './app.routes';

export const appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor])) // Attach the interceptor
  ]
};
```

---

## **4. Use the Interceptor in the API Service**

Create or update your API service to make HTTP requests. The interceptor will automatically apply to all HTTP requests.

### File: `services/api.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://api.example.com'; // Base URL of your API

  constructor(private http: HttpClient) {}

  // Example: GET request
  getData(endpoint: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${endpoint}`);
  }

  // Example: POST request
  postData(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${endpoint}`, data);
  }
}
```

---

## **5. Run and Test the App**

1. Ensure that the `authToken` is stored in the browser's `localStorage` before making API requests:
   ```javascript
   localStorage.setItem('authToken', 'your-jwt-token');
   ```
2. Use the `ApiService` in your Angular components to make HTTP requests. The interceptor will automatically attach the token to the `Authorization` header.

---

This setup ensures secure and consistent handling of the authentication token for all API requests in your Angular app.
