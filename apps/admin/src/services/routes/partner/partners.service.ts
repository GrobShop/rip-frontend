// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { map } from 'rxjs/operators';
// import { firstValueFrom } from 'rxjs';
// import { AuthHeadersService } from '../auth/auth-headers.service';
// import { Partner, PartnerServer } from '../../../../../../libs/shared-components/src/lib/interfaces/partner.interface';
// import { ApiRoutes } from '../../../../../../libs/shared-components/src/lib/data/api/api.routes';
// import { ToastService } from '../../../../../../libs/shared-components/src/lib/services/notification/toast.service';
// import { StoreService } from '../../../../../../libs/shared-components/src/lib/services/vault/store.service';
// import { StoreKeys } from '../../../../../../libs/shared-components/src/lib/data/vault/store.keys';
//
// @Injectable({
//     providedIn: 'root'
// })
// export class PartnersService {
//     constructor(private http: HttpClient) {}
//
//     private async getHeaders(): Promise<any> {
//         return await AuthHeadersService.getAuthHeaders();
//     }
//
//     async createPartner(partner: Partner): Promise<PartnerServer> {
//         const body = {
//             email: partner.email,
//             password: partner.password,
//             role: partner.role,
//             company_name: partner.company_name,
//             inn: partner.inn,
//             contact_person: partner.contact_person,
//             phone: partner.phone,
//             address: partner.address,
//             admin_notes: partner.admin_notes
//         };
//         const headers = await this.getHeaders();
//         return firstValueFrom(
//             this.http.post<PartnerServer>(ApiRoutes.ADMIN.PARTNER.CREATE_PARTNER, body, { headers }).pipe(
//                 map((response: any) => {
//                     if (response.user && response.user.id) {
//                         ToastService.success('Партнёр успешно создан!');
//                         return response.user as PartnerServer;
//                     } else if (response.error) {
//                         throw new Error(response.error);
//                     } else {
//                         throw new Error('Некорректный ответ сервера');
//                     }
//                 })
//             )
//         );
//     }
//
//     async getAllPartners(): Promise<PartnerServer[]> {
//         const headers = await this.getHeaders();
//         return firstValueFrom(
//             this.http.get<{ partners: PartnerServer[] }>(ApiRoutes.ADMIN.PARTNER.GET_ALL_PARTNERS, { headers }).pipe(
//                 map((response: any) => {
//                     if (Array.isArray(response.partners)) {
//                         return response.partners as PartnerServer[];
//                     } else if (response.error) {
//                         throw new Error(response.error);
//                     } else {
//                         throw new Error('Некорректный ответ сервера');
//                     }
//                 })
//             )
//         );
//     }
//
//     async updatePartner(partner: Partner): Promise<void> {
//         const body = {
//             email: partner.email,
//             role: partner.role,
//             company_name: partner.company_name,
//             inn: partner.inn,
//             contact_person: partner.contact_person,
//             phone: partner.phone,
//             address: partner.address,
//             admin_notes: partner.admin_notes
//         };
//         const headers = await this.getHeaders();
//         return firstValueFrom(
//             this.http.put<PartnerServer>(ApiRoutes.ADMIN.PARTNER.UPDATE_PARTNER(partner.id), body, { headers }).pipe(
//                 map(() => {
//                     ToastService.success('Партнёр успешно обновлён!');
//                 })
//             )
//         );
//     }
//
//     async deletePartner(partnerId: string): Promise<void> {
//         const headers = await this.getHeaders();
//         return firstValueFrom(
//             this.http.delete<any>(ApiRoutes.ADMIN.PARTNER.DELETE_PARTNER(partnerId), { headers }).pipe(
//                 map((response: any) => {
//                     if (response.message) {
//                         ToastService.success('Партнёр успешно удалён!');
//                     } else if (response.error) {
//                         throw new Error(response.error);
//                     }
//                 })
//             )
//         );
//     }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { AuthHeadersService } from '../auth/auth-headers.service';
import { Partner, PartnerServer } from '../../../../../../libs/shared-components/src/lib/interfaces/partner.interface';
import { ApiRoutes } from '../../../../../../libs/shared-components/src/lib/data/api/api.routes';
import { ToastService } from '../../../../../../libs/shared-components/src/lib/services/notification/toast.service';
import { StoreService } from '../../../../../../libs/shared-components/src/lib/services/vault/store.service';
import { StoreKeys } from '../../../../../../libs/shared-components/src/lib/data/vault/store.keys';
import {withTokenRefresh} from "../../../../../../libs/shared-components/src/lib/utils/http.utils";

@Injectable({
  providedIn: 'root'
})
export class PartnersService {
  constructor(private http: HttpClient) {}

  private async getHeaders(): Promise<HttpHeaders> {
    return await AuthHeadersService.getAuthHeaders();
  }

  // 1. CREATE PARTNER
  async createPartner(partner: Partner): Promise<PartnerServer> {
    const body = {
      email: partner.email,
      password: partner.password,
      role: partner.role,
      company_name: partner.company_name,
      inn: partner.inn,
      contact_person: partner.contact_person,
      phone: partner.phone,
      address: partner.address,
      admin_notes: partner.admin_notes
    };

    return withTokenRefresh(this.http, (headers) =>
      this.http.post<PartnerServer>(
        ApiRoutes.ADMIN.PARTNER.CREATE_PARTNER,
        body,
        { headers }
      ).pipe(
        map((response: any) => {
          if (response.user && response.user.id) {
            ToastService.success('Партнёр успешно создан!');
            return response.user as PartnerServer;
          } else if (response.error) {
            throw new Error(response.error);
          } else {
            throw new Error('Некорректный ответ сервера');
          }
        })
      )
    );
  }

  // 2. GET ALL PARTNERS
  async getAllPartners(): Promise<PartnerServer[]> {
    return withTokenRefresh(this.http, (headers) =>
      this.http.get<{ partners: PartnerServer[] }>(
        ApiRoutes.ADMIN.PARTNER.GET_ALL_PARTNERS,
        { headers }
      ).pipe(
        map((response: any) => {
          if (Array.isArray(response.partners)) {
            return response.partners as PartnerServer[];
          } else if (response.error) {
            throw new Error(response.error);
          } else {
            throw new Error('Некорректный ответ сервера');
          }
        })
      )
    );
  }

  // 3. UPDATE PARTNER
  async updatePartner(partner: Partner): Promise<void> {
    const body = {
      email: partner.email,
      role: partner.role,
      company_name: partner.company_name,
      inn: partner.inn,
      contact_person: partner.contact_person,
      phone: partner.phone,
      address: partner.address,
      admin_notes: partner.admin_notes
    };

    return withTokenRefresh(this.http, (headers) =>
      this.http.put<PartnerServer>(
        ApiRoutes.ADMIN.PARTNER.UPDATE_PARTNER(partner.id),
        body,
        { headers }
      ).pipe(
        map(() => {
          ToastService.success('Партнёр успешно обновлён!');
        })
      )
    );
  }

  // 4. DELETE PARTNER
  async deletePartner(partnerId: string): Promise<void> {
    return withTokenRefresh(this.http, (headers) =>
      this.http.delete<any>(
        ApiRoutes.ADMIN.PARTNER.DELETE_PARTNER(partnerId),
        { headers }
      ).pipe(
        map((response: any) => {
          if (response.message) {
            ToastService.success('Партнёр успешно удалён!');
          } else if (response.error) {
            throw new Error(response.error);
          }
        })
      )
    );
  }
}
