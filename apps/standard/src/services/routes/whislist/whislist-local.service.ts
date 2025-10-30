import { Injectable } from '@angular/core';
import {Wishlist, WishlistItem, WishlistService} from "./whislist.service";
import {StoreService} from "../../../../../../libs/shared-components/src/lib/services/vault/store.service";
import {StoreKeys} from "../../../../../../libs/shared-components/src/lib/data/vault/store.keys";

export interface WishlistItemLocal {
  id: string;
  product_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class WishlistLocalService {
  private wishlistId: string | null = null;
  private items: WishlistItemLocal[] = [];

  constructor(private wishlistService: WishlistService) {}

  /** Синхронизировать вишлист */
  async syncWishlist(): Promise<void> {
    try {
      const wishlist: Wishlist = await this.wishlistService.getWishlist();
      await StoreService.save(StoreKeys.WISHLIST_ID, wishlist.id);
      this.wishlistId = wishlist.id;

      const serverItems: WishlistItem[] = await this.wishlistService.getWishlistItems(wishlist.id);
      this.items = serverItems.map(item => ({
        id: item.id,
        product_id: item.product_id
      }));
    } catch (e) {
      console.error('Ошибка синхронизации вишлиста:', e);
      this.wishlistId = null;
      this.items = [];
    }
  }

  /** Добавить товар */
  async addItem(productId: string): Promise<WishlistItemLocal> {
    if (!this.wishlistId) {
      await this.syncWishlist();
      if (!this.wishlistId) throw new Error('Wishlist not found');
    }

    try {
      const response = await this.wishlistService.addItemToWishlist(this.wishlistId, productId);
      const newItem: WishlistItemLocal = {
        id: response.item.id,
        product_id: response.item.product_id
      };
      this.items.push(newItem);
      return newItem;
    } catch (e) {
      throw e;
    }
  }

  /** Удалить товар */
  async removeItem(itemId: string): Promise<void> {
    try {
      await this.wishlistService.deleteWishlistItem(itemId);
      this.items = this.items.filter(i => i.id !== itemId);
    } catch (e) {
      throw e;
    }
  }

  /** Проверить, есть ли товар в вишлисте */
  isInWishlist(productId: string): boolean {
    return this.items.some(i => i.product_id === productId);
  }

  /** Получить все элементы */
  getItems(): WishlistItemLocal[] {
    return [...this.items];
  }

  /** Получить ID вишлиста */
  getWishlistId(): string | null {
    return this.wishlistId;
  }

  getItemIdByProductId(productId: string){
    let itemId: string | null = null;
    this.items.map((item) => {
      if(item.product_id == productId){
        itemId = item.id;
      }
    })
    return itemId;
  }
}
