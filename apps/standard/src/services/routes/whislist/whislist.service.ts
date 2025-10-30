import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { ApiRoutes } from '../../../../../../libs/shared-components/src/lib/data/api/api.routes';
import { AuthHeadersService } from '../../../../../admin/src/services/routes/auth/auth-headers.service';

export interface Wishlist {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface WishlistItem {
  id: string;
  wishlist_id: string;
  product_id: string;
  created_at: string;
  updated_at: string;
}

export interface WishlistItemResponse {
  item: WishlistItem;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  constructor(private http: HttpClient) {}

  private async getHeaders(): Promise<any> {
    return await AuthHeadersService.getAuthHeaders();
  }

  /** Получить вишлист пользователя */
  async getWishlist(): Promise<Wishlist> {
    const headers = await this.getHeaders();
    return firstValueFrom(
      this.http.get<Wishlist>(ApiRoutes.STANDARD.WISHLIST.GET_WISHLIST, { headers }).pipe(
        map((response: any) => {
          if (response.id) {
            return response as Wishlist;
          } else if (response.error) {
            throw new Error(response.error);
          } else {
            throw new Error('Некорректный ответ сервера');
          }
        })
      )
    );
  }

  /** Добавить товар в вишлист */
  async addItemToWishlist(wishlistId: string, productId: string): Promise<WishlistItemResponse> {
    const headers = await this.getHeaders();
    const body = { wishlist_id: wishlistId, product_id: productId };
    return firstValueFrom(
      this.http.post<WishlistItemResponse>(ApiRoutes.STANDARD.WISHLIST.ADD_ITEM, body, { headers }).pipe(
        map((response: any) => {
          if (response.item && response.message) {
            return response as WishlistItemResponse;
          } else if (response.error) {
            throw new Error(response.error);
          } else {
            throw new Error('Некорректный ответ сервера');
          }
        })
      )
    );
  }

  /** Получить все элементы вишлиста */
  async getWishlistItems(wishlistId: string): Promise<WishlistItem[]> {
    const headers = await this.getHeaders();
    return firstValueFrom(
      this.http.get<{ items: WishlistItem[] }>(ApiRoutes.STANDARD.WISHLIST.GET_ITEMS(wishlistId), { headers }).pipe(
        map((response: any) => {
          if (response && Array.isArray(response.items)) {
            return response.items as WishlistItem[];
          }
          else if(response && response.items === null){
            return [];
          }
          else if (response.error) {
            throw new Error(response.error);
          } else {
            throw new Error('Некорректный ответ сервера');
          }
        })
      )
    );
  }

  /** Удалить элемент из вишлиста */
  async deleteWishlistItem(itemId: string): Promise<{ message: string }> {
    const headers = await this.getHeaders();
    return firstValueFrom(
      this.http.delete<{ message: string }>(ApiRoutes.STANDARD.WISHLIST.DELETE_ITEM(itemId), { headers }).pipe(
        map((response: any) => {
          if (response.message) {
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
}
