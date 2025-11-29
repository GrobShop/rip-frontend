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
  private readonly placeholderSvgPath = 'assets/icons/image/image-placeholder.svg';

  ngOnInit(){
    this.localCategory = this.selectedCategoryEntry !== null ? this.selectedCategoryEntry : {id: '', title: '', image: '', description: ''};
    this.selectedImages = this.localCategory.image ? [this.localCategory.image] : [];
    console.log('selectedImages:', this.selectedImages);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCategoryEntry']) {
      this.localCategory = this.selectedCategoryEntry !== null ? { ...this.selectedCategoryEntry } : { id: '', title: '', image: '', description: '' };
      this.selectedImages = this.localCategory.image ? [this.localCategory.image] : [];
      console.log('selectedImages:', this.selectedImages);
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
    if(this.description !== '' && this.description !== null){
      this.localCategory.description = this.description;
    }
    if(this.selectedImages.length === 0){this.localCategory.image = ""}
    console.log(this.localCategory);
    this.categoryLocalService?.updateCategory(this.localCategory);
    this.onClearLocalCategory();
    setTimeout(() => {
      this.updateCategories.emit();
    }, 200)
    this.closed.emit();
  }

  async onClearAllImages() {
    // // if(this.selectedImages.length > 0){
    //   await this.categoryLocalService?.deleteLogoCategory(this.localCategory.id);
    //   this.selectedImages = [];
    //   this.categoryLocalService?.updateCategory(this.localCategory);
    //
    // // Загружаем placeholder как файл
    // const placeholderUrl = (await this.placeholderSvg).default;
    // const blob = await (await fetch(placeholderUrl)).blob();
    // const file = new File([blob], 'placeholder.svg', { type: 'image/svg+xml' });
    //
    // // Конвертируем в data URL (или временный URL)
    // const filePath = URL.createObjectURL(file);
    //
    // // Загружаем как логотип
    // await this.categoryLocalService?.addLogoCategory(this.localCategory.id, filePath);
    //
    // // Опционально: обновляем локально
    // this.selectedImages = [placeholderUrl];
    // this.localCategory.image = placeholderUrl;
    // // }
    await this.setPlaceholderAsLogo();
  }

  async chooseUpdateImage() {
    if(this.mode === CategoryModalModes.CREATE){return;}
    // await this.onClearAllImages();
    if (this.selectedCategoryEntry && this.selectedImages.length > 0 && this.categoryLocalService !== null) {
      await this.categoryLocalService?.addLogoCategory(this.selectedCategoryEntry.id, this.selectedImages[0]);
      this.localCategory.image = (await this.categoryLocalService.getCategoryLogo(this.selectedCategoryEntry.id)).toString();
    }
  }
  async setPlaceholderAsLogo() {
    if (!this.localCategory.id || !this.categoryLocalService) return;

    try {
      await this.categoryLocalService.deleteLogoCategory(this.localCategory.id);
    } catch (e) {
      console.warn('Логотипа не было');
    }

    const fileUrl = this.placeholderSvgPath;

    await this.categoryLocalService.addLogoCategory(this.localCategory.id, fileUrl);

    this.selectedImages = [fileUrl];
    this.localCategory.image = fileUrl;
  }
}
