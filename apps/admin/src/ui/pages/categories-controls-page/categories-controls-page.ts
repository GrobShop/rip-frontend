import { Component } from '@angular/core';
import {
  CategoryCardMinComponent
} from "../../../../../../libs/shared-components/src/lib/components/cards/category/category-card-min/category-card-min-component";
import {HeaderComponent} from "../../../../../../libs/shared-components/src/lib/components/header/header-component";
import {
  HeaderDescriptionComponent
} from "../../../../../../libs/shared-components/src/lib/components/header-description/header-description-component";

@Component({
  selector: 'app-categories-controls-page',
  imports: [
    CategoryCardMinComponent,
    HeaderComponent,
    HeaderDescriptionComponent
  ],
  templateUrl: './categories-controls-page.html',
  styleUrl: './categories-controls-page.css',
  standalone: true
})
export class CategoriesControlsPage {}
