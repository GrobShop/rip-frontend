import { Injectable } from '@angular/core';
import { CategoryService, CategoryPublic } from './category.service';
import {Category} from "../../../../../../libs/shared-components/src/lib/interfaces/category.interface";

@Injectable({
  providedIn: 'root'
})
export class CategoryLocalService {
  private categories: Category[] = [];

  constructor(private publicCategoryService: CategoryService) {}

  /** Синхронизация всех категорий */
  async syncCategories(): Promise<void> {
    try {
      const serverCategories: CategoryPublic[] = await this.publicCategoryService.getAllCategories();

      this.categories = serverCategories.map(c => ({
        id: c.id,
        title: c.name,
        image: c.logo_url || '',
        description: c.description || ''
      }));
    } catch (e) {
      console.error('Ошибка синхронизации категорий:', e);
      this.categories = [];
    }
  }

  /** Получить категорию по ID (с кэшем) */
  async getCategoryById(categoryId: string): Promise<Category> {
    const localCategory = this.categories.find(c => c.id === categoryId);
    if (localCategory) {
      return localCategory;
    }

    try {
      const serverCategory: CategoryPublic = await this.publicCategoryService.getCategoryById(categoryId);
      const category: Category = {
        id: serverCategory.id,
        title: serverCategory.name,
        image: serverCategory.logo_url || '',
        description: serverCategory.description || ''
      };

      this.categories.push(category);
      return category;
    } catch (e) {
      throw e;
    }
  }

  /** Получить логотип категории как Blob */
  async getCategoryLogo(categoryId: string): Promise<Blob> {
    return this.publicCategoryService.getCategoryLogo(categoryId);
  }

  /** Получить все категории (из кэша) */
  getCategories(): Category[] {
    return [...this.categories];
  }

  /** Получить названия категорий */
  getCategoryNames(): string[] {
    return [...new Set(this.categories.map(c => c.title).filter(Boolean))];
  }
}
