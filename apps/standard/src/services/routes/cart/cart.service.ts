import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { ApiRoutes } from '../../../../../../libs/shared-components/src/lib/data/api/api.routes';
import { AuthHeadersService } from '../../../../../admin/src/services/routes/auth/auth-headers.service';
import {StoreService} from "../../../../../../libs/shared-components/src/lib/services/vault/store.service";
import {StoreKeys} from "../../../../../../libs/shared-components/src/lib/data/vault/store.keys";
import {ToastService} from "../../../../../../libs/shared-components/src/lib/services/notification/toast.service";

export interface Cart {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface CartItemResponse {
  item: CartItem;
  message: string;
}

export interface CartSubmission {
  cart_id: string;
  items: CartItem[];
  payment_method: string;
  delivery_method: string;
  submitted_at: string;
  email_sent_to: string;
}

export interface SubmitCartOrderResponse {
  message: string;
  submission: CartSubmission;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) {}

  private async getHeaders(): Promise<any> {
    return await AuthHeadersService.getAuthHeaders();
  }

  /** Получить корзину пользователя */
  async getCart(): Promise<Cart> {
    const headers = await this.getHeaders();
    return firstValueFrom(
      this.http.get<Cart>(ApiRoutes.STANDARD.CART.GET_CART, { headers }).pipe(
        map((response: any) => {
          if (response.id) {
            return response as Cart;
          } else if (response.error) {
            throw new Error(response.error);
          } else {
            throw new Error('Некорректный ответ сервера');
          }
        })
      )
    );
  }

  /** Добавить товар в корзину */
  async addItemToCart(cartId: string, productId: string, quantity: number = 1): Promise<CartItemResponse> {
    const headers = await this.getHeaders();
    const body = { cart_id: cartId, product_id: productId, quantity };
    return firstValueFrom(
      this.http.post<CartItemResponse>(ApiRoutes.STANDARD.CART.ADD_ITEM, body, { headers }).pipe(
        map((response: any) => {
          if (response.item && response.message) {
            return response as CartItemResponse;
          } else if (response.error) {
            throw new Error(response.error);
          } else {
            throw new Error('Некорректный ответ сервера');
          }
        })
      )
    );
  }

  /** Получить все элементы корзины */
  async getCartItems(cartId: string): Promise<CartItem[]> {
    const headers = await this.getHeaders();
    return firstValueFrom(
      this.http.get<{ items: CartItem[] | null }>(ApiRoutes.STANDARD.CART.GET_ITEMS(cartId), { headers }).pipe(
        map((response: any) => {
          if (response && response.items !== undefined) {
            if (Array.isArray(response.items)) {
              return response.items as CartItem[];
            } else {
              return []; // items: null
            }
          } else if (response.error) {
            throw new Error(response.error);
          } else {
            throw new Error('Некорректный ответ сервера');
          }
        })
      )
    );
  }

  /** Обновить количество товара */
  async updateCartItem(itemId: string, quantity: number, productId: string): Promise<CartItemResponse> {
    const headers = await this.getHeaders();
    const cartId = await StoreService.get(StoreKeys.CART_ID);
    return firstValueFrom(
      this.http.put<CartItemResponse>(ApiRoutes.STANDARD.CART.UPDATE_ITEM(itemId), {cart_id: cartId, product_id: productId, quantity: quantity}, { headers }).pipe(
        map((response: any) => {
          if (response.item && response.message) {
            return response as CartItemResponse;
          } else if (response.error) {
            throw new Error(response.error);
          } else {
            throw new Error('Некорректный ответ сервера');
          }
        })
      )
    );
  }

  /** Удалить элемент из корзины */
  async deleteCartItem(itemId: string): Promise<{ message: string }> {
    const headers = await this.getHeaders();
    return firstValueFrom(
      this.http.delete<{ message: string }>(ApiRoutes.STANDARD.CART.DELETE_ITEM(itemId), { headers }).pipe(
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

  /** Отправить заказ из корзины */
  async submitCartOrder(
    paymentMethod: string,
    deliveryMethod: string
  ): Promise<SubmitCartOrderResponse> {
    const headers = await this.getHeaders();
    const body = {
      payment_method: paymentMethod,
      delivery_method: deliveryMethod
    };

    return firstValueFrom(
      this.http.post<SubmitCartOrderResponse>(ApiRoutes.STANDARD.CART.SUBMIT_ORDER, body, { headers }).pipe(
        map((response: any) => {
          if (response.submission && response.message) {
            return response as SubmitCartOrderResponse;
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
