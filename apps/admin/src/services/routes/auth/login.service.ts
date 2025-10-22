import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";
import {ApiRoutes} from "../../../../../../libs/shared-components/src/lib/data/api/api.routes";
import {StoreService} from "../../../../../../libs/shared-components/src/lib/services/vault/store.service";
import {StoreKeys} from "../../../../../../libs/shared-components/src/lib/data/vault/store.keys";
import {ToastService} from "../../../../../../libs/shared-components/src/lib/services/notification/toast.service";
import {Router, RouterModule} from "@angular/router";
import {AdminNavLinks} from "../../../../../../libs/shared-components/src/lib/data/navlinks";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  async login(email: string, password: string): Promise<any> {
    const data = { email, password };
    try {
      const response = await this.http.post(ApiRoutes.ADMIN.LOGIN.LOGIN, data).pipe(
        map((response: any) => {
          if (response.message) {
            return response;
          } else if (response.error) {
            throw new Error(response.error);
          } else {
            throw new Error('Некорректный ответ сервера');
          }
        })
      ).toPromise();

      // Обработка успешного ответа
      if (response.accessToken && response.refreshToken) {
        await StoreService.save(StoreKeys.ACCESS_TOKEN, response.token);
        await StoreService.save(StoreKeys.USER_ID, response.user.id);
        await StoreService.save(StoreKeys.USER_EMAIL, response.user.email);
        await StoreService.save(StoreKeys.USER_ROLE, response.user.role);
        ToastService.success('Вход выполнен успешно!');
        setTimeout(async () => {
          await this.router.navigate([AdminNavLinks[0].link]);
        }, 200);
      } else {
        ToastService.danger('Неизвестный ответ сервера');
      }

      return response;
    } catch (err) {
      const errorMessage = 'Ошибка при входе!';
      ToastService.danger(errorMessage);
      throw err;
    }
  }
}
