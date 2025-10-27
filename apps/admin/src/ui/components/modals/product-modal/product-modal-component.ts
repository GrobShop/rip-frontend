import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {CategoryLocalService} from "../../../../services/routes/category/category-local.service";
import {Category} from "../../../../../../../libs/shared-components/src/lib/interfaces/category.interface";
import {CategoryModalModes} from "../../../../shared/modes/modals/category-model-modes.enum";
import {ProductLocalService} from "../../../../services/routes/product/product-local.service";
import {Product} from "../../../../../../../libs/shared-components/src/lib/interfaces/product.interface";
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

@Component({
  selector: 'app-product-modal-component',
  imports: [
    ButtonComponent,
    HeaderDescriptionComponent,
    ImageSelectorComponent,
    InputComponent,
    NgIf,
    TextareaComponent
  ],
  templateUrl: './product-modal-component.html',
  styleUrl: './product-modal-component.css',
  standalone: true
})
export class ProductModalComponent {
  @Input() mode: CategoryModalModes = CategoryModalModes.CREATE;
  @Input() productLocalService: ProductLocalService | null = null;
  @Input() selectedProductEntry: Product | null = null;
  @Output() closed = new EventEmitter<void>();
  @Output() updateProducts = new EventEmitter<void>();
  localProducts: Product = {id: '', title: '', images: [], description: '', isFavorite: false, price: 0};
  selectedImages: string[] = [];

  @Input() categories: Category[] = [];

  ngOnInit(){
    this.localProducts = this.selectedProductEntry !== null ? this.selectedProductEntry : {id: '', title: '', images: [], description: '', isFavorite: false, price: 0};
    this.selectedImages = this.localProducts.images ? this.localProducts.images : [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCategoryEntry']) {
      this.localProducts = this.selectedProductEntry !== null ? { ...this.selectedProductEntry } : {id: '', title: '', images: [], description: '', isFavorite: false, price: 0};
      this.selectedImages = this.localProducts.images ? this.localProducts.images : [];
    }
  }

  onClearLocalProduct(){
    this.localProducts = {id: '', title: '', images: [], description: '', isFavorite: false, price: 0};
  }

  onChangeName(newName: string){
    this.localProducts.title = newName;
  }

  onChangeDescription(newDescription: string){
    this.localProducts.description = newDescription;
  }

  onChangePrice(price: string){
    this.localProducts.price = Number(price);
  }

  onImagesChanged(images: string[]) {
    this.selectedImages = images;
    // this.localProducts.images = images.length > 0 ? images[0] : '';
  }

  protected readonly CategoryModalModes = CategoryModalModes;

  async onAddNewProduct() {
    if(this.localProducts.title === '' || this.localProducts.price === 0){
      return;
    }
    const newProductEntry = await this.productLocalService?.createProduct(this.localProducts);
    // if (newCategoryEntry && this.selectedImages.length > 0 && this.categoryLocalService !== null) {
    //   await this.categoryLocalService?.addLogoCategory(newCategoryEntry.id, this.selectedImages[0]);
    //   this.localCategory.image = (await this.categoryLocalService.getCategoryLogo(newCategoryEntry.id)).toString();
    // }
    this.closed.emit();
    this.onClearLocalProduct();
    this.updateProducts.emit();
  }

  onUpdateNewProduct() {
    if(this.localProducts === this.selectedProductEntry){
      this.closed.emit();
      return;
    }
    this.productLocalService?.updateProduct(this.localProducts);
    this.closed.emit();
    this.updateProducts.emit();
  }
}
