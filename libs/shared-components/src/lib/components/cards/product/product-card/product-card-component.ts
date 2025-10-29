import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {ButtonComponent} from "../../../button/button-component";
import {Product} from "../../../../interfaces/product.interface";
import {ImageCarouselComponent} from "../../../carousel/image-carousel-component";
import {ProductService} from "../../../../../../../../apps/admin/src/services/routes/product/product.service";
import {
  ProductLocalService
} from "../../../../../../../../apps/admin/src/services/routes/product/product-local.service";

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

  logoCategoryUrls: string[] | null = null; // Сохраняем URL вместо Blob

  constructor(private productService: ProductService, private productLocalService: ProductLocalService) {
  }

  async ngOnInit(){
    this.logoCategoryUrls = [];
    if(this.productLocalService){
      try {
        const images = await this.productLocalService.getAllProductImages(this.product.id);
        if(images.images.length === 0){
          return;
        }
        for(const image of images.images){
          const blob = await this.productLocalService.getProductImage(this.product.id, image.id);
          this.logoCategoryUrls?.push(URL.createObjectURL(blob));
          // this.product.images.push(URL.createObjectURL(blob));
        }

        console.log(this.logoCategoryUrls);
      } catch (e) {
        console.error('Ошибка загрузки логотипа:', e);
      }
    }
  }

  get adaptedWidth(): string {
    return 'clamp(400px, 583px, 700px)';
  }

  get adaptedHeight(): string {
    return 'clamp(160px, 218px, 300px)';
  }
}
