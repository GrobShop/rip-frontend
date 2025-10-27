import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
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
import {
  PasswordStrengthBarComponent
} from "../../../../../../../libs/shared-components/src/lib/components/bars/password-strength-bar/password-strength-bar-component";
import {
  PasswordGenerator
} from "../../../../../../../libs/shared-components/src/lib/services/password/password-generate.service";

@Component({
  selector: 'app-partners-modal-component',
  imports: [
    ButtonComponent,
    HeaderDescriptionComponent,
    ImageSelectorComponent,
    InputComponent,
    NgIf,
    TextareaComponent,
    PasswordStrengthBarComponent
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
  @Output() updatePartners = new EventEmitter<void>();
  localPartner: Partner = {id: '', address: '', admin_notes: '', company_name: '', inn: '', contact_person: '', email: '', password: '', phone: '', role: 'Partner' };

  passwordGeneratorOptions = {
    lengthPassword: 12,
    minNumbers: 2,
    minSymbol: 2,
    isUpperLetter: true,
    isLowerLetter: true,
    isNumbers: true,
    isSymbols: true,
  }

  private passwordGenerator = new PasswordGenerator();


  protected readonly CategoryModalModes = CategoryModalModes;

  ngOnInit(){
    this.localPartner = this.selectedPartnerEntry !== null ? this.selectedPartnerEntry : {id: '', address: '', admin_notes: '', company_name: '', inn: '', contact_person: '', email: '', password: '', phone: '', role: 'Partner' };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedPartnerEntry']) {
      this.localPartner = this.selectedPartnerEntry !== null ? this.selectedPartnerEntry : {id: '', address: '', admin_notes: '', company_name: '', inn: '', contact_person: '', email: '', password: '', phone: '', role: 'Partner' };
    }
  }

  onClearLocalPartner(){
    this.localPartner = {id: '', address: '', admin_notes: '', company_name: '', inn: '', contact_person: '', email: '', password: '', phone: '', role: 'Partner' };
  }

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
    this.onClearLocalPartner();
    this.closed.emit();
    this.updatePartners.emit();
  }

  onUpdateNewPartner() {
    if(this.localPartner === this.selectedPartnerEntry){
      this.closed.emit();
      return;
    }
    this.partnerLocalService?.updatePartner(this.localPartner);
    this.closed.emit();
    this.updatePartners.emit();
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

  onLengthPasswordChange($event: string) {
    this.passwordGeneratorOptions.lengthPassword = Number($event);
  }

  onMinNumbersChange($event: string) {
    this.passwordGeneratorOptions.minNumbers = Number($event);

  }

  onMinSymbolsChange($event: string) {
    this.passwordGeneratorOptions.minSymbol = Number($event);
  }

  onIsUpperLeterChange() {
    this.passwordGeneratorOptions.isUpperLetter = !this.passwordGeneratorOptions.isUpperLetter;
  }

  onIsLowerLeterChange() {
    this.passwordGeneratorOptions.isLowerLetter = !this.passwordGeneratorOptions.isLowerLetter;
  }

  onIsNumbersChange() {
    this.passwordGeneratorOptions.isNumbers = !this.passwordGeneratorOptions.isNumbers;
  }

  onIsSymbolsChange() {
    this.passwordGeneratorOptions.isSymbols = !this.passwordGeneratorOptions.isSymbols;
  }

  onGeneratePassword() {
    this.localPartner.password = this.passwordGenerator.generatePassword(this.passwordGeneratorOptions.lengthPassword, {minNumbers: this.passwordGeneratorOptions.minNumbers, minSymbols: this.passwordGeneratorOptions.minSymbol, useNumbers: this.passwordGeneratorOptions.isNumbers, useLowerLetters: this.passwordGeneratorOptions.isLowerLetter, useUpperLetters: this.passwordGeneratorOptions.isUpperLetter, useSpecialSymbols: this.passwordGeneratorOptions.isSymbols});
  }
}
