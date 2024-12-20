import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Car } from '../car';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-item',
  imports: [CommonModule],
  templateUrl: './view-item.component.html',
  styleUrl: './view-item.component.css'
})
export class ViewItemComponent {
  item: Car = {}

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id')
    if (itemId) {
      this.apiService.getItemById(itemId).subscribe({
        next: data => this.item = data,
        error: err => console.error("Error fetching item:", err)
      })
    }
  }
}
