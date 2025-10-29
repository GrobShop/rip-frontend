import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiRoutes } from '../../../../../../libs/shared-components/src/lib/data/api/api.routes';
import { StoreService } from '../../../../../../libs/shared-components/src/lib/services/vault/store.service';
import { StoreKeys } from '../../../../../../libs/shared-components/src/lib/data/vault/store.keys';
import { ToastService } from '../../../../../../libs/shared-components/src/lib/services/notification/toast.service';
import { Router } from '@angular/router';

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
      const response: any = await this.http
        .post(ApiRoutes.STANDARD.LOGIN.LOGIN, data)
        .pipe(
          map((res: any) => {
            console.log('Response:', res);
            if (res.token) {
              console.log('Token:', res.token);
              return res;
            } else {
              throw new Error('Некорректный ответ сервера');
            }
          })
        )
        .toPromise();

      // Обработка успешного ответа
      if (response.token && response.user) {
        await StoreService.save(StoreKeys.ACCESS_TOKEN, response.token);
        await StoreService.save(StoreKeys.USER_ID, response.user.id);
        await StoreService.save(StoreKeys.USER_EMAIL, response.user.email);
        await StoreService.save(StoreKeys.USER_ROLE, response.user.role);
        await StoreService.save(StoreKeys.COMPANY_NAME, response.user.company_name);
        ToastService.success('Вход выполнен успешно!');

        // Перенаправление в зависимости от роли
        setTimeout(async () => {
          if (response.user.role === 'Partner') {
            await this.router.navigate(['/categories']);
          }
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
