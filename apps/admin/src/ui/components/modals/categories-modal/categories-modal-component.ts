import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
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
import {Category} from "../../../../../../../libs/shared-components/src/lib/interfaces/category.interface";
import {CategoryLocalService} from "../../../../services/routes/category/category-local.service";

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
  @Input() categoryLocalService: CategoryLocalService | null = null;
  @Input() selectedCategoryEntry: Category | null = null;
  @Output() closed = new EventEmitter<void>();
  localCategory: Category = {id: '', title: '', image: '', description: ''};

  ngOnInit(){
    this.localCategory = this.selectedCategoryEntry !== null ? this.selectedCategoryEntry : {id: '', title: '', image: '', description: ''};
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.localCategory = this.selectedCategoryEntry !== null ? this.selectedCategoryEntry : {id: '', title: '', image: '', description: ''};
  }

  onChangeName(newName: string){
    this.localCategory.title = newName;
  }

  onChangeDescription(newDescription: string){
    this.localCategory.description = newDescription;
  }

  protected readonly CategoryModalModes = CategoryModalModes;

  onAddNewCategory() {
    if(this.localCategory.title === ''){
      return;
    }
    const newCategoryEntry = this.categoryLocalService?.createCategory(this.localCategory.title, this.localCategory.description ? this.localCategory.description: "");
    this.categoryLocalService?.addLogoCategory()
  }

  onUpdateNewCategory() {
    if(this.localCategory === this.selectedCategoryEntry){
      this.closed.emit();
      return;
    }
    this.categoryLocalService?.updateCategory(this.localCategory);
  }
}
