import { Routes } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { AddItemComponent } from './add-item/add-item.component';
import { ViewItemComponent } from './view-item/view-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';

export const routes: Routes = [
    {path:'', component: ItemListComponent},
    {path:'add', component: AddItemComponent},
    {path:'car/:id', component: ViewItemComponent},
    {path:'car/:id/edit', component: EditItemComponent}
];
