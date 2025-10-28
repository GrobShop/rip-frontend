import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { AuthHeadersService } from '../auth/auth-headers.service';
import { Product, ProductServer, ProductImage } from '../../../../../../libs/shared-components/src/lib/interfaces/product.interface';
import { ApiRoutes } from '../../../../../../libs/shared-components/src/lib/data/api/api.routes';
import { ToastService } from '../../../../../../libs/shared-components/src/lib/services/notification/toast.service';
import { StoreService } from '../../../../../../libs/shared-components/src/lib/services/vault/store.service';
import { StoreKeys } from '../../../../../../libs/shared-components/src/lib/data/vault/store.keys';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  private async getHeaders(): Promise<any> {
    return await AuthHeadersService.getAuthHeaders();
  }

  async createProduct(product: Product): Promise<ProductServer> {
    const body = {
      name: product.title,
      description: product.description,
      category_id: product.category_id || '', // Предполагается добавление category_id в интерфейс Product
      price: product.price,
      stock: product.stock || 0
    };
    const headers = await this.getHeaders();
    return firstValueFrom(
      this.http.post<{ message: string; product: ProductServer }>(ApiRoutes.ADMIN.PRODUCT.CREATE_PRODUCT, body, { headers }).pipe(
        map((response: any) => {
          if (response.product && response.product.id) {
            ToastService.success('Продукт успешно создан!');
            return response.product as ProductServer;
          } else if (response.error) {
            throw new Error(response.error);
          } else {
            throw new Error('Некорректный ответ сервера');
          }
        })
      )
    );
  }

  async getProductById(productId: string): Promise<ProductServer> {
    const headers = await this.getHeaders();
    return firstValueFrom(
      this.http.get<{ product: ProductServer }>(ApiRoutes.ADMIN.PRODUCT.GET_PRODUCT_BY_ID(productId), { headers }).pipe(
        map((response: any) => {
          if (response.product && response.product.id) {
            return response.product as ProductServer;
          } else if (response.error) {
            throw new Error(response.error);
          } else {
            throw new Error('Некорректный ответ сервера');
          }
        })
      )
    );
  }

  // async getAllProducts(categoryId: string): Promise<ProductServer[]> {
  //   const headers = await this.getHeaders();
  //   return firstValueFrom(
  //     this.http.get<ProductServer[]>(ApiRoutes.ADMIN.PRODUCT.GET_ALL_PRODUCTS(categoryId), { headers }).pipe(
  //       map((response: any) => {
  //         if (Array.isArray(response)) {
  //           return response as ProductServer[];
  //         } else if (response.error) {
  //           throw new Error(response.error);
  //         } else {
  //           throw new Error('Некорректный ответ сервера');
  //         }
  //       })
  //     )
  //   );
  // }

  async getAllProducts(creatorId: string): Promise<ProductServer[]> {
    const headers = await this.getHeaders();
    return firstValueFrom(
      this.http.get<ProductServer[]>(ApiRoutes.ADMIN.PRODUCT.GET_ALL_PRODUCTS(creatorId), { headers }).pipe(
        map((response: any) => {
          if(response.products === null){
            return [];
          }
          if (Array.isArray(response.products)) {
            return response as ProductServer[];
          } else if (response.error) {
            throw new Error(response.error);
          } else {
            throw new Error('Некорректный ответ сервера');
          }
        })
      )
    );
  }

  async updateProduct(product: Product): Promise<void> {
    const body = {
      name: product.title,
      description: product.description,
      category_id: product.category_id || '', // Предполагается добавление category_id
      price: product.price,
      stock: product.stock || 0
    };
    const headers = await this.getHeaders();
    return firstValueFrom(
      this.http.put<ProductServer>(ApiRoutes.ADMIN.PRODUCT.UPDATE_PRODUCT(product.id), body, { headers }).pipe(
        map(() => {
          ToastService.success('Продукт успешно обновлён!');
        })
      )
    );
  }

  async deleteProduct(productId: string): Promise<void> {
    const headers = await this.getHeaders();
    return firstValueFrom(
      this.http.delete<any>(ApiRoutes.ADMIN.PRODUCT.DELETE_PRODUCT(productId), { headers }).pipe(
        map((response: any) => {
          if (response.message) {
            ToastService.success('Продукт успешно удалён!');
          } else if (response.error) {
            throw new Error(response.error);
          }
        })
      )
    );
  }

  async addProductImage(productId: string, filePath: string): Promise<{ image: ProductImage; message: string }> {
    const fileContent = await (await fetch(filePath)).arrayBuffer();
    const blob = new Blob([fileContent], { type: 'application/octet-stream' });
    const fileName = filePath.split('/').pop() || 'image';
    const file = new File([blob], fileName, { type: 'application/octet-stream' });

    const formData = new FormData();
    formData.append('product_id', productId);
    formData.append('image', file);

    const accessToken = await StoreService.get(StoreKeys.ACCESS_TOKEN);
    if (!accessToken) {
      throw new Error('Access token not found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return firstValueFrom(
      this.http.post<{ image: ProductImage; message: string }>(ApiRoutes.ADMIN.PRODUCT.ADD_PRODUCT_IMAGE, formData, { headers }).pipe(
        map((response: any) => {
          if (response.image && response.message) {
            ToastService.success('Изображение успешно добавлено!');
            return response;
          } else if (response.error) {
            throw new Error(response.error);
          } else {
            throw new Error('Некорректный ответ сервера');
          }
        })
      )
    );
  }

  async getImageById(productId: string, imageId: string): Promise<Blob> {
    const headers = await this.getHeaders();
    return firstValueFrom(
      this.http.get(ApiRoutes.ADMIN.PRODUCT.GET_IMAGE_BY_ID(productId, imageId), { headers, responseType: 'blob' }).pipe(
        map((response: Blob) => response)
      )
    );
  }

  async getAllImages(productId: string): Promise<{ images: ProductImage[]; product: ProductServer }> {
    const headers = await this.getHeaders();
    return firstValueFrom(
      this.http.get<{ images: ProductImage[]; product: ProductServer }>(ApiRoutes.ADMIN.PRODUCT.GET_ALL_IMAGES(productId), { headers }).pipe(
        map((response: any) => {
          if (response.images && response.product) {
            return response as { images: ProductImage[]; product: ProductServer };
          } else if (response.error) {
            throw new Error(response.error);
          } else {
            throw new Error('Некорректный ответ сервера');
          }
        })
      )
    );
  }
}
