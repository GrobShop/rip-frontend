// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';
// import { firstValueFrom } from 'rxjs';
// import { ApiRoutes } from '../../../../../../libs/shared-components/src/lib/data/api/api.routes';
// import { ProductServer, ProductImage } from '../../../../../../libs/shared-components/src/lib/interfaces/product.interface';
// import {AuthHeadersService} from "../../../../../admin/src/services/routes/auth/auth-headers.service";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {
//
//   constructor(private http: HttpClient) {}
//
//
//   private async getHeaders(): Promise<any> {
//     return await AuthHeadersService.getAuthHeaders();
//   }
//
//   /** Получить все продукты по категории (публичный доступ) */
//   async getAllProductsByCategory(categoryId: string): Promise<ProductServer[]> {
//     const headers = await this.getHeaders();
//     return firstValueFrom(
//       this.http.get<{ products: ProductServer[] }>(ApiRoutes.STANDARD.PRODUCT.GET_ALL_BY_CATEGORY(categoryId), { headers }).pipe(
//         map((response: any) => {
//           if (response && response.products !== undefined) {
//             if (Array.isArray(response.products)) {
//               return response.products as ProductServer[];
//             } else {
//               return [];
//             }
//           } else if (response.error) {
//             throw new Error(response.error);
//           } else {
//             throw new Error('Некорректный ответ сервера');
//           }
//         })
//       )
//     );
//   }
//
//   /** Получить продукт по ID */
//   async getProductById(productId: string): Promise<ProductServer> {
//     const headers = await this.getHeaders();
//     return firstValueFrom(
//       this.http.get<{ product: ProductServer }>(ApiRoutes.STANDARD.PRODUCT.GET_BY_ID(productId), {headers}).pipe(
//         map((response: any) => {
//           if (response && response.product && response.product.id) {
//             return response.product as ProductServer;
//           } else if (response.error) {
//             throw new Error(response.error);
//           } else {
//             throw new Error('Некорректный ответ сервера');
//           }
//         })
//       )
//     );
//   }
//
//   /** Получить изображение продукта по ID (одинаково для всех) */
//   async getImageById(productId: string, imageId: string): Promise<Blob> {
//     const headers = await this.getHeaders();
//     return firstValueFrom(
//       this.http.get(ApiRoutes.STANDARD.PRODUCT.GET_IMAGE_BY_ID(productId, imageId), { headers, responseType: 'blob' }).pipe(
//         map((blob: Blob) => blob)
//       )
//     );
//   }
//
//   /** Получить все изображения продукта (одинаково для всех) */
//   async getAllImages(productId: string): Promise<{ images: ProductImage[]; product: ProductServer }> {
//     const headers = await this.getHeaders();
//     return firstValueFrom(
//       this.http.get<{ images: ProductImage[]; product: ProductServer }>(ApiRoutes.STANDARD.PRODUCT.GET_ALL_IMAGES(productId), { headers }).pipe(
//         map((response: any) => {
//           if (response.images !== undefined && response.product) {
//             return response as { images: ProductImage[]; product: ProductServer };
//           } else if (response.error) {
//             throw new Error(response.error);
//           } else {
//             throw new Error('Некорректный ответ сервера');
//           }
//         })
//       )
//     );
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { ApiRoutes } from '../../../../../../libs/shared-components/src/lib/data/api/api.routes';
import { ProductServer, ProductImage } from '../../../../../../libs/shared-components/src/lib/interfaces/product.interface';
import { AuthHeadersService } from '../../../../../admin/src/services/routes/auth/auth-headers.service';
import {withTokenRefresh} from "../../../../../../libs/shared-components/src/lib/utils/http.utils";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  private async getHeaders(): Promise<HttpHeaders> {
    return await AuthHeadersService.getAuthHeaders();
  }

  // 1. GET ALL PRODUCTS BY CATEGORY (PUBLIC)
  async getAllProductsByCategory(categoryId: string): Promise<ProductServer[]> {
    return withTokenRefresh(this.http, (headers) =>
      this.http.get<{ products: ProductServer[] }>(
        ApiRoutes.STANDARD.PRODUCT.GET_ALL_BY_CATEGORY(categoryId),
        { headers }
      ).pipe(
        map((response: any) => {
          if (response && response.products !== undefined) {
            return Array.isArray(response.products) ? response.products as ProductServer[] : [];
          } else if (response.error) {
            throw new Error(response.error);
          } else {
            throw new Error('Некорректный ответ сервера');
          }
        })
      )
    );
  }

  // 2. GET PRODUCT BY ID
  async getProductById(productId: string): Promise<ProductServer> {
    return withTokenRefresh(this.http, (headers) =>
      this.http.get<{ product: ProductServer }>(
        ApiRoutes.STANDARD.PRODUCT.GET_BY_ID(productId),
        { headers }
      ).pipe(
        map((response: any) => {
          if (response && response.product && response.product.id) {
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

  // 3. GET IMAGE BY ID (BLOB)
  async getImageById(productId: string, imageId: string): Promise<Blob> {
    return withTokenRefresh(this.http, (headers) =>
      this.http.get(
        ApiRoutes.STANDARD.PRODUCT.GET_IMAGE_BY_ID(productId, imageId),
        { headers, responseType: 'blob' }
      ).pipe(
        map((blob: Blob) => blob)
      )
    );
  }

  // 4. GET ALL IMAGES
  async getAllImages(productId: string): Promise<{ images: ProductImage[]; product: ProductServer }> {
    return withTokenRefresh(this.http, (headers) =>
      this.http.get<{ images: ProductImage[]; product: ProductServer }>(
        ApiRoutes.STANDARD.PRODUCT.GET_ALL_IMAGES(productId),
        { headers }
      ).pipe(
        map((response: any) => {
          if (response.images !== undefined && response.product) {
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
