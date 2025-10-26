import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Partner} from "../../../../interfaces/partner.interface";
import {NgIf} from "@angular/common";
import {InputComponent} from "../../../input/input-component";
import {TextareaComponent} from "../../../textarea/textarea-component";
import {ButtonComponent} from "../../../button/button-component";
import {
  CategoryLocalService
} from "../../../../../../../../apps/admin/src/services/routes/category/category-local.service";
import {Category} from "../../../../interfaces/category.interface";
import {
  PartnersLocalService
} from "../../../../../../../../apps/admin/src/services/routes/partner/partners-local.service";

@Component({
  selector: 'lib-partner-card-component',
  imports: [
    NgIf,
    InputComponent,
    TextareaComponent,
    ButtonComponent
  ],
  templateUrl: './partner-card-component.html',
  styleUrl: './partner-card-component.css',
  standalone: true
})
export class PartnerCardComponent {
  @Input() partner: Partner = {id: '', address: '', admin_notes: '', company_name: '', inn: '', contact_person: '', email: '', password: '', phone: '', role: '' };
  @Input() partnerLocalService: PartnersLocalService | null = null;
  @Output() onDeleteEvent = new EventEmitter<Partner>();
  @Output() onEditEvent = new EventEmitter<Partner>();

  get adaptedWidth(): string {
    return 'clamp(380px, 430px, 480px)';
  }

  get adaptedHeight(): string {
    return 'clamp(580px, 640px, 730px)';
  }

  onDelete(){
    this.onDeleteEvent.emit(this.partner);
  }

  onEdit(){
    this.onEditEvent.emit(this.partner);
  }
}
