import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Car } from '../car';

@Component({
  selector: 'app-item-list',
  imports: [CommonModule],
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
}
