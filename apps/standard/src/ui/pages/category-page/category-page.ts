import { Component } from '@angular/core';
import {HeaderComponent} from "../../../../../../libs/shared-components/src/lib/components/header/header-component";
import {
  HeaderDescriptionComponent
} from "../../../../../../libs/shared-components/src/lib/components/header-description/header-description-component";
import {
  CategoryCardMinComponent
} from "../../../../../../libs/shared-components/src/lib/components/cards/category/category-card-min/category-card-min-component";

@Component({
  selector: 'app-category-page',
  imports: [
    HeaderComponent,
    HeaderDescriptionComponent,
    CategoryCardMinComponent
  ],
  templateUrl: './category-page.html',
  styleUrl: './category-page.css',
  standalone: true
})
export class CategoryPage {}
