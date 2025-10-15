import {Component, Input} from '@angular/core';
import {Product} from "../../../../interfaces/product.interface";
import {ImageCarouselComponent} from "../../../carousel/image-carousel-component";
import {ButtonComponent} from "../../../button/button-component";
import {NgIf} from "@angular/common";
import {Category} from "../../../../interfaces/category.interface";

@Component({
  selector: 'lib-category-card-admin',
  imports: [
    ImageCarouselComponent,
    ButtonComponent,
    NgIf
  ],
  templateUrl: './category-card-admin.html',
  styleUrl: './category-card-admin.css',
  standalone: true
})
export class CategoryCardAdmin {
  @Input() category: Category = {id: '', title: '', image: '', description: ''};

  get adaptedWidth(): string {
    return 'clamp(400px, 583px, 700px)';
  }

  get adaptedHeight(): string {
    return 'clamp(160px, 218px, 300px)';
  }
}
