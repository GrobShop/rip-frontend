// import { Injectable } from '@angular/core';
// import {HttpClient, HttpHeaders} from '@angular/common/http';
// import { map } from 'rxjs/operators';
// import { firstValueFrom } from 'rxjs';
// import {AuthHeadersService} from "../auth/auth-headers.service";
// import {Category, CategoryServer} from "../../../../../../libs/shared-components/src/lib/interfaces/category.interface";
// import {ApiRoutes} from "../../../../../../libs/shared-components/src/lib/data/api/api.routes";
// import {ToastService} from "../../../../../../libs/shared-components/src/lib/services/notification/toast.service";
// import {StoreService} from "../../../../../../libs/shared-components/src/lib/services/vault/store.service";
// import {StoreKeys} from "../../../../../../libs/shared-components/src/lib/data/vault/store.keys";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class CategoryService {
//   constructor(private http: HttpClient) {}
//
//   private async getHeaders(): Promise<any> {
//     return await AuthHeadersService.getAuthHeaders();
//   }
//
//   async createCategory(name: string, description: string): Promise<CategoryServer> {
//     const body = { name, description };
//     const headers = await this.getHeaders();
//     return firstValueFrom(
//       this.http.post<CategoryServer>(ApiRoutes.ADMIN.CATEGORY.CREATE_CATEGORY, body, { headers }).pipe(
//         map((response: any) => {
//           if (response.id && response.name) {
//             ToastService.success('Категория успешно создана!');
//             return response as CategoryServer;
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
//   async getAllCategory(): Promise<CategoryServer[]> {
//     const headers = await this.getHeaders();
//     return firstValueFrom(
//       this.http.get<CategoryServer[]>(ApiRoutes.ADMIN.CATEGORY.GET_ALL_CATEGORY, { headers }).pipe(
//         map((response: any) => {
//           if (Array.isArray(response)) {
//             return response as CategoryServer[];
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
//   async getCategoryById(categoryId: string): Promise<CategoryServer> {
//     const headers = await this.getHeaders();
//     return firstValueFrom(
//       this.http.get<CategoryServer>(ApiRoutes.ADMIN.CATEGORY.GET_CATEGORY_BY_ID(categoryId), { headers }).pipe(
//         map((response: any) => {
//           if (response.id) {
//             return response as CategoryServer;
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
//   async updateCategory(category: Category): Promise<void> {
//     const headers = await this.getHeaders();
//     return firstValueFrom(
//       this.http.patch<CategoryServer>(ApiRoutes.ADMIN.CATEGORY.UPDATE_CATEGORY(category.id), { name: category.title, description: category.description }, { headers }).pipe(
//         map(() => {
//           ToastService.success('Категория успешно обновлена!');
//         })
//       )
//     );
//   }
//
//   async deleteCategory(categoryId: string): Promise<void> {
//     const headers = await this.getHeaders();
//     return firstValueFrom(
//       this.http.delete<any>(ApiRoutes.ADMIN.CATEGORY.DELETE_CATEGORY(categoryId), { headers }).pipe(
//         map((response: any) => {
//           if (response.message) {
//             ToastService.success('Категория успешно удалена!');
//           } else if (response.error) {
//             throw new Error(response.error);
//           }
//         })
//       )
//     );
//   }
//
//   async addLogoCategory(categoryId: string, filePath: string): Promise<{ logo_url: string; message: string }> {
//     const fileContent = await (await fetch(filePath)).arrayBuffer(); // Читаем файл как Blob
//     const blob = new Blob([fileContent], { type: 'application/octet-stream' });
//     const fileName = filePath.split('/').pop() || 'logo';
//     const file = new File([blob], fileName, { type: 'application/octet-stream' });
//
//     const formData = new FormData();
//     formData.append('logo', file);
//
//     // Получаем токен вручную, исключая Content-Type
//     const accessToken = await StoreService.get(StoreKeys.ACCESS_TOKEN);
//     if (!accessToken) {
//       throw new Error('Access token not found');
//     }
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${accessToken}`
//     });
//
//     return firstValueFrom(
//       this.http.post<{ logo_url: string; message: string }>(ApiRoutes.ADMIN.CATEGORY.ADD_LOGO_CATEGORY(categoryId), formData, { headers }).pipe(
//         map((response: any) => {
//           if (response.logo_url && response.message) {
//             ToastService.success('Логотип успешно загружен!');
//             return response;
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
//   async getCategoryLogo(categoryId: string): Promise<Blob> {
//     const headers = await this.getHeaders();
//     return firstValueFrom(
//       this.http.get(ApiRoutes.ADMIN.CATEGORY.GET_CATEGORY_LOGO(categoryId), { headers, responseType: 'blob' }).pipe(
//         map((response: Blob) => response)
//       )
//     );
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { AuthHeadersService } from "../auth/auth-headers.service";
import { Category, CategoryServer } from "../../../../../../libs/shared-components/src/lib/interfaces/category.interface";
import { ApiRoutes } from "../../../../../../libs/shared-components/src/lib/data/api/api.routes";
import { ToastService } from "../../../../../../libs/shared-components/src/lib/services/notification/toast.service";
import { StoreService } from "../../../../../../libs/shared-components/src/lib/services/vault/store.service";
import { StoreKeys } from "../../../../../../libs/shared-components/src/lib/data/vault/store.keys";
import {withTokenRefresh} from "../../../../../../libs/shared-components/src/lib/utils/http.utils";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  private async getHeaders(): Promise<HttpHeaders> {
    return await AuthHeadersService.getAuthHeaders();
  }

  // 1. CREATE
  async createCategory(name: string, description: string): Promise<CategoryServer> {
    const body = { name, description };

    return withTokenRefresh(this.http, (headers) =>
      this.http.post<CategoryServer>(
        ApiRoutes.ADMIN.CATEGORY.CREATE_CATEGORY,
        body,
        { headers }
      ).pipe(
        map((response: any) => {
          if (response.id && response.name) {
            ToastService.success('Категория успешно создана!');
            return response as CategoryServer;
          } else if (response.error) {
            throw new Error(response.error);
          } else {
            throw new Error('Некорректный ответ сервера');
          }
        })
      )
    );
  }

  // 2. GET ALL
  async getAllCategory(): Promise<CategoryServer[]> {
    return withTokenRefresh(this.http, (headers) =>
      this.http.get<CategoryServer[]>(
        ApiRoutes.ADMIN.CATEGORY.GET_ALL_CATEGORY,
        { headers }
      ).pipe(
        map((response: any) => {
          if (Array.isArray(response)) {
            return response as CategoryServer[];
          } else if (response.error) {
            throw new Error(response.error);
          } else {
            throw new Error('Некорректный ответ сервера');
          }
        })
      )
    );
  }

  // 3. GET BY ID
  async getCategoryById(categoryId: string): Promise<CategoryServer> {
    return withTokenRefresh(this.http, (headers) =>
      this.http.get<CategoryServer>(
        ApiRoutes.ADMIN.CATEGORY.GET_CATEGORY_BY_ID(categoryId),
        { headers }
      ).pipe(
        map((response: any) => {
          if (response.id) {
            return response as CategoryServer;
          } else if (response.error) {
            throw new Error(response.error);
          } else {
            throw new Error('Некорректный ответ сервера');
          }
        })
      )
    );
  }

  // 4. UPDATE
  async updateCategory(category: Category): Promise<void> {
    return withTokenRefresh(this.http, (headers) =>
      this.http.patch<CategoryServer>(
        ApiRoutes.ADMIN.CATEGORY.UPDATE_CATEGORY(category.id),
        { name: category.title, description: category.description },
        { headers }
      ).pipe(
        map(() => {
          ToastService.success('Категория успешно обновлена!');
        })
      )
    );
  }

  // 5. DELETE
  async deleteCategory(categoryId: string): Promise<void> {
    return withTokenRefresh(this.http, (headers) =>
      this.http.delete<any>(
        ApiRoutes.ADMIN.CATEGORY.DELETE_CATEGORY(categoryId),
        { headers }
      ).pipe(
        map((response: any) => {
          if (response.message) {
            ToastService.success('Категория успешно удалена!');
          } else if (response.error) {
            console.log(response.error);
            throw new Error(response.error);
          }
        })
      )
    );
  }

  // 6. ADD LOGO
  async addLogoCategory(categoryId: string, filePath: string): Promise<{ logo_url: string; message: string }> {
    const fileContent = await (await fetch(filePath)).arrayBuffer();
    const blob = new Blob([fileContent], { type: 'application/octet-stream' });
    const fileName = filePath.split('/').pop() || 'logo';
    const file = new File([blob], fileName, { type: 'application/octet-stream' });
    const formData = new FormData();
    formData.append('logo', file);

    const accessToken = await StoreService.get(StoreKeys.ACCESS_TOKEN);
    if (!accessToken) throw new Error('Access token not found');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return withTokenRefresh(this.http, () =>
      this.http.post<{ logo_url: string; message: string }>(
        ApiRoutes.ADMIN.CATEGORY.ADD_LOGO_CATEGORY(categoryId),
        formData,
        { headers }
      ).pipe(
        map((response: any) => {
          if (response.logo_url && response.message) {
            ToastService.success('Логотип успешно загружен!');
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

  // 7. GET LOGO
  async getCategoryLogo(categoryId: string): Promise<Blob> {
    return withTokenRefresh(this.http, (headers) =>
      this.http.get(
        ApiRoutes.ADMIN.CATEGORY.GET_CATEGORY_LOGO(categoryId),
        { headers, responseType: 'blob' }
      ).pipe(
        map((response: Blob) => response)
      )
    );
  }
}
