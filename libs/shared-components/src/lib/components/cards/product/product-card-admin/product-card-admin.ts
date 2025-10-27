import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../../../interfaces/product.interface";
import {ButtonComponent} from "../../../button/button-component";
import {ImageCarouselComponent} from "../../../carousel/image-carousel-component";
import {NgIf} from "@angular/common";
import {
  PartnersLocalService
} from "../../../../../../../../apps/admin/src/services/routes/partner/partners-local.service";
import {Partner} from "../../../../interfaces/partner.interface";
import {
  ProductLocalService
} from "../../../../../../../../apps/admin/src/services/routes/product/product-local.service";

@Component({
  selector: 'lib-product-card-admin',
  imports: [
    ButtonComponent,
    ImageCarouselComponent,
    NgIf
  ],
  templateUrl: './product-card-admin.html',
  styleUrl: './product-card-admin.css',
  standalone: true
})
export class ProductCardAdmin {
  @Input() product: Product = {id: '', images: [], price: 0, isFavorite: false, title: '', description: ''};
  @Input() productLocalService: ProductLocalService | null = null;
  @Output() onDeleteEvent = new EventEmitter<Product>();
  @Output() onEditEvent = new EventEmitter<Product>();

  get adaptedWidth(): string {
    return 'clamp(400px, 583px, 700px)';
  }

  get adaptedHeight(): string {
    return 'clamp(160px, 218px, 300px)';
  }

  onDelete(){
    this.onDeleteEvent.emit(this.product);
  }

  onEdit(){
    this.onEditEvent.emit(this.product);
  }
}
