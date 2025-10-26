import { Injectable } from '@angular/core';
import { Partner, PartnerServer } from '../../../../../../libs/shared-components/src/lib/interfaces/partner.interface';
import { PartnersService } from './partners.service';
import { StoreService } from '../../../../../../libs/shared-components/src/lib/services/vault/store.service';
import { StoreKeys } from '../../../../../../libs/shared-components/src/lib/data/vault/store.keys';

@Injectable({
  providedIn: 'root'
})
export class PartnersLocalService {
  private partners: Partner[] = [];

  constructor(private serverPartnersService: PartnersService) {}

  async syncPartners(): Promise<void> {
    try {
      const serverPartners: PartnerServer[] = await this.serverPartnersService.getAllPartners();
      this.partners = serverPartners.map(p => ({
        id: p.id,
        email: p.email,
        password: '', // Пароль не возвращается с сервера, оставляем пустым
        role: p.role,
        company_name: p.company_name,
        inn: p.inn,
        contact_person: p.contact_person,
        phone: p.phone,
        address: p.address,
        admin_notes: p.admin_notes
      }));
    } catch (e) {
      console.error(e);
    }
  }

  async createPartner(partner: Partner): Promise<PartnerServer> {
    const userId = await StoreService.get(StoreKeys.USER_ID);
    if (!userId) {
      throw new Error('User ID not found in storage');
    }
    try {
      const response = await this.serverPartnersService.createPartner(partner);
      const newPartner: Partner = {
        id: response.id,
        email: response.email,
        password: '', // Пароль не возвращается
        role: response.role,
        company_name: response.company_name,
        inn: response.inn,
        contact_person: response.contact_person,
        phone: response.phone,
        address: response.address,
        admin_notes: response.admin_notes
      };
      this.partners.push(newPartner);
      return response;
    } catch (e) {
      throw e;
    }
  }

  // async getPartnerById(partnerId: string): Promise<Partner> {
  //   const localPartner = this.partners.find(p => p.id === partnerId);
  //   if (localPartner) {
  //     return localPartner;
  //   }
  //   try {
  //     const serverPartner: PartnerServer = await this.serverPartnersService.getPartnerById(partnerId); // Предполагаемый метод
  //     const partner: Partner = {
  //       id: serverPartner.id,
  //       email: serverPartner.email,
  //       password: '',
  //       role: serverPartner.role,
  //       company_name: serverPartner.company_name,
  //       inn: serverPartner.inn,
  //       contact_person: serverPartner.contact_person,
  //       phone: serverPartner.phone,
  //       address: serverPartner.address,
  //       admin_notes: serverPartner.admin_notes
  //     };
  //     this.partners.push(partner);
  //     return partner;
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  async updatePartner(partner: Partner): Promise<void> {
    try {
      await this.serverPartnersService.updatePartner(partner);
      const index = this.partners.findIndex(p => p.id === partner.id);
      if (index !== -1) {
        this.partners[index] = { ...partner };
      } else {
        this.partners.push(partner);
      }
    } catch (e) {
      throw e;
    }
  }

  async deletePartner(partnerId: string): Promise<void> {
    try {
      await this.serverPartnersService.deletePartner(partnerId);
      this.partners = this.partners.filter(p => p.id !== partnerId);
    } catch (e) {
      throw e;
    }
  }

  getPartners(): Partner[] {
    return [...this.partners];
  }

  getPartnerNames(): string[] {
    return [...new Set(this.partners.map(p => p.company_name).filter(name => name))];
  }

  addPartnerLocally(partner: Partner): void {
    this.partners.push(partner);
  }
}
