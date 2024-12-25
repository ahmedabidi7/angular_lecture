Here is a README file explaining how to set up and use an interceptor in an Angular app:

---

# Angular Interceptor Setup

This guide explains the steps to add an HTTP interceptor in an Angular application to include an authentication token in API requests.

---

## **1. Create the Interceptor**

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

## **2. Add the Interceptor to the App Configuration**

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

## **3. Use the Interceptor in the API Service**

Make your API service injectable and use the Angular HTTP client. The interceptor will automatically apply to all HTTP requests.

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

## **4. Run and Test the App**

1. Ensure that the `authToken` is stored in the browser's `localStorage` before making API requests:
   ```javascript
   localStorage.setItem('authToken', 'your-jwt-token');
   ```
2. Use the `ApiService` in your Angular components to make HTTP requests. The interceptor will automatically attach the token to the `Authorization` header.

---

## **Notes**

- The interceptor will not add the token if it is `null` or not found in `localStorage`.
- Customize the `Authorization` header or token retrieval logic as needed for your app.
- Ensure your backend server accepts and validates the `Authorization` header.

--- 

This setup ensures secure and consistent handling of the authentication token for all API requests in your Angular app.
