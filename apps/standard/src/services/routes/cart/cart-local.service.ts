import { Injectable } from '@angular/core';
import { CartService, Cart, CartItem } from './cart.service';
import { StoreService } from '../../../../../../libs/shared-components/src/lib/services/vault/store.service';
import { StoreKeys } from '../../../../../../libs/shared-components/src/lib/data/vault/store.keys';

export interface CartItemLocal {
  id: string;
  product_id: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartLocalService {
  private cartId: string | null = null;
  private items: CartItemLocal[] = [];

  constructor(private cartService: CartService) {}

  /** Синхронизировать корзину с сервером */
  async syncCart(): Promise<void> {
    try {
      const cart: Cart = await this.cartService.getCart();
      await StoreService.save(StoreKeys.CART_ID, cart.id);
      this.cartId = cart.id;

      const serverItems: CartItem[] = await this.cartService.getCartItems(cart.id);
      this.items = serverItems.map(item => ({
        id: item.id,
        product_id: item.product_id,
        quantity: item.quantity
      }));
    } catch (e) {
      console.error('Ошибка синхронизации корзины:', e);
      this.cartId = null;
      this.items = [];
    }
  }

  /** Добавить товар в корзину */
  async addItem(productId: string, quantity: number = 1): Promise<CartItemLocal> {
    if (!this.cartId) {
      await this.syncCart();
      if (!this.cartId) throw new Error('Cart not found');
    }

    try {
      const response = await this.cartService.addItemToCart(this.cartId, productId, quantity);
      const newItem: CartItemLocal = {
        id: response.item.id,
        product_id: response.item.product_id,
        quantity: response.item.quantity
      };
      this.items.push(newItem);
      return newItem;
    } catch (e) {
      throw e;
    }
  }

  /** Обновить количество товара */
  async updateItem(itemId: string, quantity: number): Promise<CartItemLocal> {
    if (quantity <= 0) {
      await this.removeItem(itemId);
      return { id: itemId, product_id: '', quantity: 0 };
    }

    try {
      const response = await this.cartService.updateCartItem(itemId, quantity);
      const index = this.items.findIndex(i => i.id === itemId);
      if (index !== -1) {
        this.items[index] = {
          id: response.item.id,
          product_id: response.item.product_id,
          quantity: response.item.quantity
        };
      }
      return this.items[index];
    } catch (e) {
      throw e;
    }
  }

  /** Удалить товар из корзины */
  async removeItem(itemId: string): Promise<void> {
    try {
      await this.cartService.deleteCartItem(itemId);
      this.items = this.items.filter(i => i.id !== itemId);
    } catch (e) {
      throw e;
    }
  }

  /** Проверить, есть ли товар в корзине */
  isInCart(productId: string): boolean {
    return this.items.some(i => i.product_id === productId);
  }

  /** Получить количество товара в корзине */
  getQuantity(productId: string): number {
    const item = this.items.find(i => i.product_id === productId);
    return item ? item.quantity : 0;
  }

  /** Получить itemId по productId */
  getItemIdByProductId(productId: string): string | null {
    const item = this.items.find(i => i.product_id === productId);
    return item ? item.id : null;
  }

  /** Получить все элементы корзины */
  getItems(): CartItemLocal[] {
    return [...this.items];
  }

  /** Получить ID корзины */
  getCartId(): string | null {
    return this.cartId;
  }

  /** Получить общее количество товаров в корзине */
  getTotalItems(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  /** Получить общую стоимость (если есть цены) */
  getTotalPrice(getPrice: (productId: string) => number): number {
    return this.items.reduce((sum, item) => {
      const price = getPrice(item.product_id);
      return sum + price * item.quantity;
    }, 0);
  }
}
