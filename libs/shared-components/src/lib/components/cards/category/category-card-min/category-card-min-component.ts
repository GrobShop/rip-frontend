import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from "../../../../interfaces/category.interface";
import {NgIf} from "@angular/common";
import {CategoryLocalService} from "../../../../../../../../apps/standard/src/services/routes/category/category-local.service";
import {ImageCarouselComponent} from "../../../carousel/image-carousel-component";
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'lib-category-card-min-component',
  imports: [
    NgIf,
    ImageCarouselComponent
  ],
  templateUrl: './category-card-min-component.html',
  styleUrl: './category-card-min-component.css',
  standalone: true
})
export class CategoryCardMinComponent {
  @Input() category: Category = {id: '', title: '', image: ''};
  @Input() categoryLocalService: CategoryLocalService | null = null;
  logoCategoryUrl: string | null = null; // Сохраняем URL вместо Blob

  constructor(private router: Router, private http: HttpClient) {
  }

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
    return 'clamp(150px, 203px, 300px)';
  }

  get adaptedHeight(): string {
    return 'clamp(150px, 198px, 280px)';
  }

  async onNavigateToProductsPage() {
    await this.router.navigate([`/category/${this.category.id}`]);
  }
}
