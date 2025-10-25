import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  HeaderDescriptionComponent
} from "../../../../../../../libs/shared-components/src/lib/components/header-description/header-description-component";
import {CategoryModalModes} from "../../../../shared/modes/modals/category-model-modes.enum";
import {InputComponent} from "../../../../../../../libs/shared-components/src/lib/components/input/input-component";
import {
  TextareaComponent
} from "../../../../../../../libs/shared-components/src/lib/components/textarea/textarea-component";
import {ButtonComponent} from "../../../../../../../libs/shared-components/src/lib/components/button/button-component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-categories-modal-component',
  imports: [
    HeaderDescriptionComponent,
    InputComponent,
    TextareaComponent,
    ButtonComponent,
    NgIf
  ],
  templateUrl: './categories-modal-component.html',
  styleUrl: './categories-modal-component.css',
  standalone: true
})
export class CategoriesModalComponent {
  @Input() mode: CategoryModalModes = CategoryModalModes.CREATE;
  @Output() closed = new EventEmitter<void>();

  protected readonly CategoryModalModes = CategoryModalModes;
}
