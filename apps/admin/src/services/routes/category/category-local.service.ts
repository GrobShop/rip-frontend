import { Injectable } from '@angular/core';
import {Category, CategoryServer} from "../../../../../../libs/shared-components/src/lib/interfaces/category.interface";
import {CategoryService} from "./category.service";
import {StoreService} from "../../../../../../libs/shared-components/src/lib/services/vault/store.service";
import {StoreKeys} from "../../../../../../libs/shared-components/src/lib/data/vault/store.keys";

@Injectable({
  providedIn: 'root'
})
export class CategoryLocalService {
  private categories: Category[] = [];

  constructor(private serverCategoryService: CategoryService) {}

  async syncCategories(): Promise<void> {
    try {
      const serverCategories: CategoryServer[] = await this.serverCategoryService.getAllCategory();
      this.categories = serverCategories.map(c => ({
        id: c.id,
        title: c.name,
        image: c.logo_url || '',
        description: c.description
      }));
    } catch (e) {
      // ToastService.danger('Не удалось синхронизировать категории с сервером!');
      console.error(e);
    }
  }

  async createCategory(name: string, description: string): Promise<CategoryServer> {
    const userId = await StoreService.get(StoreKeys.USER_ID);
    if (!userId) {
      throw new Error('User ID not found in storage');
    }
    try {
      const response = await this.serverCategoryService.createCategory(name, description);
      const newCategory: Category = {
        id: response.id,
        title: response.name,
        image: response.logo_url || '',
        description: response.description
      };
      this.categories.push(newCategory);
      return response;
    } catch (e) {
      throw e;
    }
  }

  async getCategoryById(categoryId: string): Promise<Category> {
    const localCategory = this.categories.find(c => c.id === categoryId);
    if (localCategory) {
      return localCategory;
    }
    try {
      const serverCategory: CategoryServer = await this.serverCategoryService.getCategoryById(categoryId);
      const category: Category = {
        id: serverCategory.id,
        title: serverCategory.name,
        image: serverCategory.logo_url || '',
        description: serverCategory.description
      };
      this.categories.push(category);
      return category;
    } catch (e) {
      throw e;
    }
  }

  async updateCategory(category: Category): Promise<void> {
    try {
      await this.serverCategoryService.updateCategory(category);
      const index = this.categories.findIndex(c => c.id === category.id);
      if (index !== -1) {
        this.categories[index] = { ...category };
      } else {
        this.categories.push(category);
      }
    } catch (e) {
      throw e;
    }
  }

  async deleteCategory(categoryId: string): Promise<void> {
    try {
      await this.serverCategoryService.deleteCategory(categoryId);
      this.categories = this.categories.filter(c => c.id !== categoryId);
    } catch (e) {
      throw e;
    }
  }

  async addLogoCategory(categoryId: string, filePath: string): Promise<{ logo_url: string; message: string }> {
    try {
      const response = await this.serverCategoryService.addLogoCategory(categoryId, filePath);
      const index = this.categories.findIndex(c => c.id === categoryId);
      if (index !== -1) {
        this.categories[index] = { ...this.categories[index], image: response.logo_url };
      }
      return response;
    } catch (e) {
      throw e;
    }
  }

  async deleteLogoCategory(categoryId: string): Promise<void> {
    try {
      await this.serverCategoryService.deleteLogoCategory(categoryId);
      const index = this.categories.findIndex(c => c.id === categoryId);
      if (index !== -1) {
        this.categories[index] = { ...this.categories[index], image: '' };
      }
    } catch (e) {
      throw e;
    }
  }

  async getCategoryLogo(categoryId: string): Promise<Blob> {
    return this.serverCategoryService.getCategoryLogo(categoryId);
  }

  getCategories(): Category[] {
    return [...this.categories];
  }

  getCategoryNames(): string[] {
    return [...new Set(this.categories.map(c => c.title).filter(title => title))];
  }

  addCategoryLocally(category: Category): void {
    this.categories.push(category);
  }
}
