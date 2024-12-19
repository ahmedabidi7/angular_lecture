import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Car } from '../car';

@Component({
  selector: 'app-add-item',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {
  newItem: Car = {}
  errorMessage: any = {}

  constructor(private apiService: ApiService, private router: Router) {}

  addItem(): void {
    this.apiService.createItem(this.newItem).subscribe({
      next: (res) => this.router.navigate(['/']),
      error: (err) => this.errorMessage = err
    })
  }

}
