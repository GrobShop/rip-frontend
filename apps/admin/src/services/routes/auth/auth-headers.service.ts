import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import {StoreService} from "../../../../../../libs/shared-components/src/lib/services/vault/store.service";
import {StoreKeys} from "../../../../../../libs/shared-components/src/lib/data/vault/store.keys";
@Injectable({
  providedIn: 'root'
})
export class AuthHeadersService {
  static async getAuthHeaders(): Promise<HttpHeaders> {
    const accessToken = await StoreService.get(StoreKeys.ACCESS_TOKEN);
    if (!accessToken) {
      throw new Error('Access token not found');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    });
  }
}
