import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Car } from '../car';
import { ApiService } from '../api.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-edit-item',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-item.component.html',
  styleUrl: './edit-item.component.css'
})
export class EditItemComponent {
  item: Car = {}
  errorMessage: any = {}

  constructor(private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id')
    if (itemId) {
      this.apiService.getItemById(itemId).subscribe({
        next: data => this.item = data,
        error: err => console.error("Error fetching item:", err)
      })
    }
  }

  updateItem(): void {
    this.apiService.editItem(this.item).subscribe({
      next: (res) => this.router.navigate(['/']),
      error: (err) => this.errorMessage = err
    })
  }

}
