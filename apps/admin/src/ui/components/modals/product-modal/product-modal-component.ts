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
import {SelectComponent} from "../../../../../../../libs/shared-components/src/lib/components/select/select-component";
import {CategoryService} from "../../../../services/routes/category/category.service";

@Component({
  selector: 'app-product-modal-component',
  imports: [
    ButtonComponent,
    HeaderDescriptionComponent,
    ImageSelectorComponent,
    InputComponent,
    NgIf,
    TextareaComponent,
    SelectComponent
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

  optionsCategories: { value: string; label: string }[] = [];

  constructor(private categoryService: CategoryService, private categoryLocalService: CategoryLocalService) {
  }


  async ngOnInit(){
    this.localProducts = this.selectedProductEntry !== null ? this.selectedProductEntry : {id: '', title: '', images: [], description: '', isFavorite: false, price: 0};
    this.selectedImages = this.localProducts.images ? this.localProducts.images : [];

    await this.categoryLocalService.syncCategories();
    this.categories = this.categoryLocalService.getCategories();

    console.log(this.categories);
    this.categories.forEach(category => {
      this.optionsCategories.push({value: category.id, label: category.title});
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCategoryEntry']) {
      this.localProducts = this.selectedProductEntry !== null ? { ...this.selectedProductEntry } : {id: '', title: '', images: [], description: '', isFavorite: false, price: 0};
      this.selectedImages = this.localProducts.images ? this.localProducts.images : [];

      this.categories.forEach(category => {
        this.optionsCategories.push({value: category.id, label: category.title});
      })
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
    console.log('images', images);
    this.selectedImages = images;
    this.localProducts.images = images.length > 0 ? images : [];
    console.log('selectedImages', this.selectedImages);
  }

  protected readonly CategoryModalModes = CategoryModalModes;

  async onAddNewProduct() {
    if(this.localProducts.title === '' || this.localProducts.price === 0){
      return;
    }
    console.log('selectedImages', this.selectedImages);
    const newProductEntry = await this.productLocalService?.createProduct(this.localProducts);
    if (newProductEntry && this.selectedImages.length > 0 && this.categoryLocalService !== null) {
      for(let i = 0; i < this.selectedImages.length; i++) {
        await this.productLocalService?.addProductImage(newProductEntry.id, this.selectedImages[i]);
      }
      // this.localProducts.images = (await this.productLocalService?.getProductImage(newProductEntry.id)).toString();
    }
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

  onCategorySelected($event: string) {
    this.localProducts.category_id = $event;
  }
}
