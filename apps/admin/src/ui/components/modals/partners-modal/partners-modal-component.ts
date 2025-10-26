import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CategoryLocalService} from "../../../../services/routes/category/category-local.service";
import {Category} from "../../../../../../../libs/shared-components/src/lib/interfaces/category.interface";
import {Partner} from "../../../../../../../libs/shared-components/src/lib/interfaces/partner.interface";
import {CategoryModalModes} from "../../../../shared/modes/modals/category-model-modes.enum";
import {PartnersLocalService} from "../../../../services/routes/partner/partners-local.service";
import {ButtonComponent} from "../../../../../../../libs/shared-components/src/lib/components/button/button-component";
import {
  HeaderDescriptionComponent
} from "../../../../../../../libs/shared-components/src/lib/components/header-description/header-description-component";
import {
  ImageSelectorComponent
} from "../../../../../../../libs/shared-components/src/lib/components/image-selector/image-selector-component";
import {InputComponent} from "../../../../../../../libs/shared-components/src/lib/components/input/input-component";
import {NgIf} from "@angular/common";
import {
  TextareaComponent
} from "../../../../../../../libs/shared-components/src/lib/components/textarea/textarea-component";
import {ToastService} from "../../../../../../../libs/shared-components/src/lib/services/notification/toast.service";

@Component({
  selector: 'app-partners-modal-component',
  imports: [
    ButtonComponent,
    HeaderDescriptionComponent,
    ImageSelectorComponent,
    InputComponent,
    NgIf,
    TextareaComponent
  ],
  templateUrl: './partners-modal-component.html',
  styleUrl: './partners-modal-component.css',
  standalone: true
})
export class PartnersModalComponent {
  @Input() mode: CategoryModalModes = CategoryModalModes.CREATE;
  @Input() partnerLocalService: PartnersLocalService | null = null;
  @Input() selectedPartnerEntry: Partner | null = null;
  @Output() closed = new EventEmitter<void>();
  localPartner: Partner = {id: '', address: '', admin_notes: '', company_name: '', inn: '', contact_person: '', email: '', password: '', phone: '', role: '' };
  protected readonly CategoryModalModes = CategoryModalModes;

  async onAddNewPartner() {
    if(this.localPartner.company_name === ''){
      ToastService.danger('Название компании не может быть пустым!');
      return;
    }
    if(this.localPartner.contact_person === ''){
      ToastService.danger('Контактное лицо не может быть пустым!');
      return;
    }
    if(this.localPartner.email === ''){
      ToastService.danger('Электронная почта не может быть пустым!');
      return;
    }
    if(this.localPartner.password === ''){
      ToastService.danger('Пароль не может быть пустым!');
      return;
    }
    if(this.localPartner.address === ''){
      ToastService.danger('Адрес не может быть пустым!');
      return;
    }
    const newPartnerEntry = await this.partnerLocalService?.createPartner(this.localPartner);
    this.closed.emit();
  }

  onUpdateNewPartner() {
    if(this.localPartner === this.selectedPartnerEntry){
      this.closed.emit();
      return;
    }
    this.partnerLocalService?.updatePartner(this.localPartner);
    this.closed.emit();
  }

  onInnChange($event: string) {
    this.localPartner.inn = $event;
  }

  onContactPersonChange($event: string) {
    this.localPartner.contact_person = $event;
  }

  onPhoneChange($event: string) {
    this.localPartner.phone = $event;
  }

  onEmailChange($event: string) {
    this.localPartner.email = $event;
  }

  onPasswordChange($event: string) {
    this.localPartner.password = $event;
  }

  onAddressChange($event: string) {
    this.localPartner.address = $event;
  }

  onNotesChange($event: string) {
    this.localPartner.admin_notes = $event;
  }

  onCompanyNameChange($event: string) {
    this.localPartner.company_name = $event;
  }
}
