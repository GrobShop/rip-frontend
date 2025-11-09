// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';
// import { firstValueFrom } from 'rxjs';
// import { ApiRoutes } from '../../../../../../libs/shared-components/src/lib/data/api/api.routes';
// import {AuthHeadersService} from "../../../../../admin/src/services/routes/auth/auth-headers.service";
//
// export interface CategoryPublic {
//   id: string;
//   creator_id: string;
//   creator_type: string;
//   name: string;
//   description: string | null;
//   logo_url: string | null;
//   created_at: string;
//   updated_at: string;
// }
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
//   /** Получить все категории (публичный доступ) */
//   async getAllCategories(): Promise<CategoryPublic[]> {
//     const headers = await this.getHeaders();
//     return firstValueFrom(
//       this.http.get<CategoryPublic[]>(ApiRoutes.STANDARD.CATEGORY.GET_ALL, {headers}).pipe(
//         map((response: any) => {
//           if (Array.isArray(response)) {
//             return response as CategoryPublic[];
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
//   /** Получить категорию по ID */
//   async getCategoryById(categoryId: string): Promise<CategoryPublic> {
//     const headers = await this.getHeaders();
//     return firstValueFrom(
//       this.http.get<CategoryPublic>(ApiRoutes.STANDARD.CATEGORY.GET_BY_ID(categoryId), {headers}).pipe(
//         map((response: any) => {
//           if (response.id) {
//             return response as CategoryPublic;
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
//   /** Получить логотип категории как Blob */
//   async getCategoryLogo(categoryId: string): Promise<Blob> {
//     const headers = await this.getHeaders();
//     return firstValueFrom(
//       this.http.get(ApiRoutes.STANDARD.CATEGORY.GET_LOGO(categoryId), { headers, responseType: 'blob' }).pipe(
//         map((blob: Blob) => blob)
//       )
//     );
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { ApiRoutes } from '../../../../../../libs/shared-components/src/lib/data/api/api.routes';
import { AuthHeadersService } from '../../../../../admin/src/services/routes/auth/auth-headers.service';
import {withTokenRefresh} from "../../../../../../libs/shared-components/src/lib/utils/http.utils";

export interface CategoryPublic {
  id: string;
  creator_id: string;
  creator_type: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  private async getHeaders(): Promise<HttpHeaders> {
    return await AuthHeadersService.getAuthHeaders();
  }

  // 1. GET ALL CATEGORIES (PUBLIC)
  async getAllCategories(): Promise<CategoryPublic[]> {
    return withTokenRefresh(this.http, (headers) =>
      this.http.get<CategoryPublic[]>(ApiRoutes.STANDARD.CATEGORY.GET_ALL, { headers }).pipe(
        map((response: any) => {
          if (Array.isArray(response)) {
            return response as CategoryPublic[];
          } else if (response.error) {
            throw new Error(response.error);
          } else {
            throw new Error('Некорректный ответ сервера');
          }
        })
      )
    );
  }

  // 2. GET CATEGORY BY ID
  async getCategoryById(categoryId: string): Promise<CategoryPublic> {
    return withTokenRefresh(this.http, (headers) =>
      this.http.get<CategoryPublic>(ApiRoutes.STANDARD.CATEGORY.GET_BY_ID(categoryId), { headers }).pipe(
        map((response: any) => {
          if (response.id) {
            return response as CategoryPublic;
          } else if (response.error) {
            throw new Error(response.error);
          } else {
            throw new Error('Некорректный ответ сервера');
          }
        })
      )
    );
  }

  // 3. GET CATEGORY LOGO (BLOB)
  async getCategoryLogo(categoryId: string): Promise<Blob> {
    return withTokenRefresh(this.http, (headers) =>
      this.http.get(ApiRoutes.STANDARD.CATEGORY.GET_LOGO(categoryId), {
        headers,
        responseType: 'blob'
      }).pipe(
        map((blob: Blob) => blob)
      )
    );
  }
}
