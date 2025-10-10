import {Component, Input} from '@angular/core';
import {Category} from "../../../../interfaces/category.interface";
import {NgIf} from "@angular/common";

@Component({
  selector: 'lib-category-card-min-component',
  imports: [
    NgIf
  ],
  templateUrl: './category-card-min-component.html',
  styleUrl: './category-card-min-component.css',
  standalone: true
})
export class CategoryCardMinComponent {
  @Input() category: Category = {id: '', title: '', image: ''};

  get adaptedWidth(): string {
    return 'clamp(150px, 203px, 300px)';
  }

  get adaptedHeight(): string {
    return 'clamp(150px, 198px, 280px)';
  }
}
