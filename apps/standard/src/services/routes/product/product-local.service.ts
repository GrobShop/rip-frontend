import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import {Product, ProductServer} from "../../../../../../libs/shared-components/src/lib/interfaces/product.interface";

@Injectable({
  providedIn: 'root'
})
export class ProductLocalService {
  private products: Product[] = [];

  constructor(private publicProductService: ProductService) {}

  /** Синхронизация продуктов по категории */
  async syncProductsByCategory(categoryId: string): Promise<void> {
    try {
      const serverProducts: ProductServer[] = await this.publicProductService.getAllProductsByCategory(categoryId);

      this.products = serverProducts.map(p => ({
        id: p.id,
        title: p.name,
        description: p.description || '',
        price: p.price,
        stock: p.stock,
        images: [],
        category_id: p.category_id,
        isFavorite: false
      }));

      // Загружаем изображения для каждого продукта
      for (const product of this.products) {
        try {
          const productObject = await this.publicProductService.getAllImages(product.id);
          product.productImages = productObject.images;
        } catch (imgError) {
          console.warn(`Не удалось загрузить изображения для продукта ${product.id}`, imgError);
          product.images = [];
        }
      }

      // // В syncProductsByCategory
      // for (const product of this.products) {
      //   try {
      //     const { images } = await this.publicProductService.getAllImages(product.id);
      //     product.images = images.map(img => img.image_url); // ← сразу URL
      //   } catch (imgError) {
      //     console.warn(`Не удалось загрузить изображения для продукта ${product.id}`, imgError);
      //     product.images = [];
      //   }
      // }
    } catch (e) {
      console.error('Ошибка синхронизации продуктов:', e);
      this.products = [];
    }
  }

  /** Получить продукт по ID (с кэшем) */
  async getProductById(productId: string): Promise<Product> {
    const localProduct = this.products.find(p => p.id === productId);
    if (localProduct) {
      return localProduct;
    }

    try {
      const serverProduct: ProductServer = await this.publicProductService.getProductById(productId);
      const { images } = await this.publicProductService.getAllImages(productId);

      const product: Product = {
        id: serverProduct.id,
        title: serverProduct.name,
        description: serverProduct.description || '',
        price: serverProduct.price,
        stock: serverProduct.stock,
        images: images.map(img => img.image_url), // ← ВОТ СЮДА!
        category_id: serverProduct.category_id,
        isFavorite: false
      };

      this.products.push(product);
      return product;
    } catch (e) {
      throw e;
    }
  }

  /** Получить изображение как Blob */
  async getProductImage(productId: string, imageId: string): Promise<Blob> {
    return this.publicProductService.getImageById(productId, imageId);
  }

  /** Получить все продукты из кэша */
  getProducts(): Product[] {
    return [...this.products];
  }

  /** Получить названия продуктов */
  getProductNames(): string[] {
    return [...new Set(this.products.map(p => p.title).filter(Boolean))];
  }
}
