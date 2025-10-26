import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../../../interfaces/product.interface";
import {ImageCarouselComponent} from "../../../carousel/image-carousel-component";
import {ButtonComponent} from "../../../button/button-component";
import {NgIf} from "@angular/common";
import {Category} from "../../../../interfaces/category.interface";
import {
  CategoryLocalService
} from "../../../../../../../../apps/admin/src/services/routes/category/category-local.service";

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
  @Input() categoryLocalService: CategoryLocalService | null = null;
  @Output() onDeleteEvent = new EventEmitter<Category>();
  @Output() onEditEvent = new EventEmitter<Category>();
  logoCategoryUrl: string | null = null; // Сохраняем URL вместо Blob

  async ngOnInit(){
    if(this.categoryLocalService){
      try {
        const blob = await this.categoryLocalService.getCategoryLogo(this.category.id);
        this.logoCategoryUrl = URL.createObjectURL(blob); // Преобразуем Blob в URL
        this.category.image = this.logoCategoryUrl;
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

  onDelete(){
    this.onDeleteEvent.emit(this.category);
  }

  onEdit(){
    this.onEditEvent.emit(this.category);
  }
}
