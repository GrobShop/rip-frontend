import { Injectable } from '@angular/core';
import { Product, ProductServer, ProductImage } from '../../../../../../libs/shared-components/src/lib/interfaces/product.interface';
import { ProductService } from './product.service';
import { StoreService } from '../../../../../../libs/shared-components/src/lib/services/vault/store.service';
import { StoreKeys } from '../../../../../../libs/shared-components/src/lib/data/vault/store.keys';

@Injectable({
  providedIn: 'root'
})
export class ProductLocalService {
  private products: Product[] = [];

  constructor(private serverProductService: ProductService) {}

  async syncProducts(creatorId: string): Promise<void> {
    try {
      const serverProducts: ProductServer[] = await this.serverProductService.getAllProducts(creatorId);
      this.products = serverProducts.map(p => ({
        id: p.id,
        title: p.name,
        description: p.description,
        isFavorite: false, // По умолчанию
        price: p.price,
        images: [] // Инициализируем пустым массивом, будем заполнять через getAllImages
      }));
      // Синхронизация изображений
      for (const product of this.products) {
        const { images } = await this.serverProductService.getAllImages(product.id);
        product.images = images.map(img => img.image_url);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async createProduct(product: Product): Promise<ProductServer> {
    const userId = await StoreService.get(StoreKeys.USER_ID);
    if (!userId) {
      throw new Error('User ID not found in storage');
    }
    try {
      const response = await this.serverProductService.createProduct(product);
      const newProduct: Product = {
        id: response.id,
        title: response.name,
        description: response.description,
        isFavorite: false,
        price: response.price,
        images: []
      };
      this.products.push(newProduct);
      return response;
    } catch (e) {
      throw e;
    }
  }

  async getProductById(productId: string): Promise<Product> {
    const localProduct = this.products.find(p => p.id === productId);
    if (localProduct) {
      return localProduct;
    }
    try {
      const serverProduct: ProductServer = await this.serverProductService.getProductById(productId);
      const { images } = await this.serverProductService.getAllImages(productId);
      const product: Product = {
        id: serverProduct.id,
        title: serverProduct.name,
        description: serverProduct.description,
        isFavorite: false,
        price: serverProduct.price,
        images: images.map(img => img.image_url)
      };
      this.products.push(product);
      return product;
    } catch (e) {
      throw e;
    }
  }

  async updateProduct(product: Product): Promise<void> {
    try {
      await this.serverProductService.updateProduct(product);
      const index = this.products.findIndex(p => p.id === product.id);
      if (index !== -1) {
        this.products[index] = { ...product };
      } else {
        this.products.push(product);
      }
    } catch (e) {
      throw e;
    }
  }

  async deleteProduct(productId: string): Promise<void> {
    try {
      await this.serverProductService.deleteProduct(productId);
      this.products = this.products.filter(p => p.id !== productId);
    } catch (e) {
      throw e;
    }
  }

  async addProductImage(productId: string, filePath: string): Promise<{ image: ProductImage; message: string }> {
    try {
      const response = await this.serverProductService.addProductImage(productId, filePath);
      const index = this.products.findIndex(p => p.id === productId);
      if (index !== -1) {
        this.products[index] = {
          ...this.products[index],
          images: [...this.products[index].images, response.image.image_url]
        };
      }
      return response;
    } catch (e) {
      throw e;
    }
  }

  async getProductImage(productId: string, imageId: string): Promise<Blob> {
    return this.serverProductService.getImageById(productId, imageId);
  }

  async getAllProductImages(productId: string): Promise<{ images: ProductImage[]; product: ProductServer }> {
    return this.serverProductService.getAllImages(productId);
  }

  getProducts(): Product[] {
    return [...this.products];
  }

  getProductNames(): string[] {
    return [...new Set(this.products.map(p => p.title).filter(title => title))];
  }

  addProductLocally(product: Product): void {
    this.products.push(product);
  }
}
