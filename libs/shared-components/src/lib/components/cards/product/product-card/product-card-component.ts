import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {ButtonComponent} from "../../../button/button-component";
import {Product} from "../../../../interfaces/product.interface";
import {ImageCarouselComponent} from "../../../carousel/image-carousel-component";

@Component({
  selector: 'lib-product-card-component',
  imports: [
    NgIf,
    ButtonComponent,
    ImageCarouselComponent
  ],
  templateUrl: './product-card-component.html',
  styleUrl: './product-card-component.css',
  standalone: true
})
export class ProductCardComponent {
  @Input() product: Product = {id: '', images: [], price: 0, isFavorite: false, title: '', description: ''};

  get adaptedWidth(): string {
    return 'clamp(400px, 583px, 700px)';
  }

  get adaptedHeight(): string {
    return 'clamp(160px, 218px, 300px)';
  }
}
