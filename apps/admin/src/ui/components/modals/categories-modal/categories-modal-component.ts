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
import {
  ImageSelectorComponent
} from "../../../../../../../libs/shared-components/src/lib/components/image-selector/image-selector-component";

@Component({
  selector: 'app-categories-modal-component',
  imports: [
    HeaderDescriptionComponent,
    InputComponent,
    TextareaComponent,
    ButtonComponent,
    NgIf,
    ImageSelectorComponent
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
  @Output() updateCategories = new EventEmitter<void>();
  localCategory: Category = {id: '', title: '', image: '', description: ''};
  selectedImages: string[] = [];
  description: string = '';

  ngOnInit(){
    this.localCategory = this.selectedCategoryEntry !== null ? this.selectedCategoryEntry : {id: '', title: '', image: '', description: ''};
    this.selectedImages = this.localCategory.image ? [this.localCategory.image] : [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCategoryEntry']) {
      this.localCategory = this.selectedCategoryEntry !== null ? { ...this.selectedCategoryEntry } : { id: '', title: '', image: '', description: '' };
      this.selectedImages = this.localCategory.image ? [this.localCategory.image] : [];
    }
  }

  onClearLocalCategory(){
    this.localCategory = {id: '', title: '', image: '', description: ''};
    this.description = '';
    this.selectedImages = [];
  }

  onChangeName(newName: string){
    this.localCategory.title = newName;
    console.log(this.localCategory.title);
  }

  onChangeDescription(newDescription: string){
    this.localCategory.description = newDescription;
    this.description = newDescription;
  }

  onImagesChanged(images: string[]) {
    this.selectedImages = images;
    this.localCategory.image = images.length > 0 ? images[0] : '';
  }

  protected readonly CategoryModalModes = CategoryModalModes;

  async onAddNewCategory() {
    if(this.localCategory.title === ''){
      return;
    }
    const newCategoryEntry = await this.categoryLocalService?.createCategory(this.localCategory.title, this.description);
    console.log(newCategoryEntry);
    if (newCategoryEntry && this.selectedImages.length > 0 && this.categoryLocalService !== null) {
      await this.categoryLocalService?.addLogoCategory(newCategoryEntry.id, this.selectedImages[0]);
      this.localCategory.image = (await this.categoryLocalService.getCategoryLogo(newCategoryEntry.id)).toString();
    }
    this.onClearLocalCategory();
    this.closed.emit();
    this.updateCategories.emit();
  }

  onUpdateNewCategory() {
    if(this.localCategory === this.selectedCategoryEntry){
      this.closed.emit();
      return;
    }
    this.categoryLocalService?.updateCategory(this.localCategory);
    this.onClearLocalCategory();
    this.closed.emit();
    this.updateCategories.emit();
  }
}
