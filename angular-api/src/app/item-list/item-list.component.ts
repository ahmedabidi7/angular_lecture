import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Car } from '../car';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-item-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent {
  items: Car[] = []

  constructor (private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getItems().subscribe({
      next: (data) => this.items = data,
      error: (err) => console.error(err),
      complete: () => console.info('complete')
    })
  }

  deleteItem(id?:string): void {
    this.apiService.deleteItem(id!).subscribe({
      next: () => this.items = this.items.filter(i => i._id !== id),
      error: (err) => console.error(err)
    })
  }
}
