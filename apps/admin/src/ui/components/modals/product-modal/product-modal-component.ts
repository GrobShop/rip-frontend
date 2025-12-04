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
  defaultSelectedCategoryLabel: string = '';
  blobUrls: string[] = [];
  logoProductsUrl: string[] | [] = []; // Сохраняем URL вместо Blob

  @Input() categories: Category[] = [];

  optionsCategories: { value: string; label: string }[] = [];

  private readonly placeholderSvgPath = 'assets/icons/image/image-placeholder.svg';


  constructor(private categoryService: CategoryService, private categoryLocalService: CategoryLocalService) {
  }


  async ngOnInit(){
    console.log(this.selectedProductEntry);
    this.localProducts = this.selectedProductEntry !== null ? this.selectedProductEntry : {id: '', title: '', images: [], description: '', isFavorite: false, price: 0};
    // this.selectedImages = this.localProducts.images ? this.localProducts.images : [];
    // this.selectedImages = this.localProducts.images ? this.localProducts.images : [];
    this.selectedImages = this.selectedProductEntry !== null && this.selectedProductEntry.images ? this.selectedProductEntry.images : [];

    console.log(this.localProducts.productImages);
    this.localProducts.images.forEach((item) => {
    })
    await this.categoryLocalService.syncCategories();
    this.categories = this.categoryLocalService.getCategories();

    // console.log(this.categories);
    // this.categories.forEach(category => {
    //   this.optionsCategories.push({value: category.id, label: category.title});
    //   if(category.id === this.localProducts.category_id){
    //     this.defaultSelectedCategoryLabel = category.title;
    //     console.log('default', this.defaultSelectedCategoryLabel);
    //   }
    // })

    this.optionsCategories = [];
    this.categories.forEach(category => {
      this.optionsCategories.push({value: category.id, label: category.title});
      if(category.id === this.localProducts.category_id){
        this.defaultSelectedCategoryLabel = category.title;
        console.log('default', this.defaultSelectedCategoryLabel);
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.selectedProductEntry);
    console.log(this.localProducts.productImages);
    if (changes['selectedProductEntry']) {
      this.localProducts = this.selectedProductEntry !== null ? { ...this.selectedProductEntry } : {id: '', title: '', images: [], description: '', isFavorite: false, price: 0};
      this.selectedImages = this.selectedProductEntry !== null && this.selectedProductEntry.images ? this.selectedProductEntry.images : [];
      // this.selectedImages = this.localProducts.images ? this.localProducts.images : [];


      this.categories.forEach(category => {
          if(category.id === this.selectedProductEntry?.category_id){
            this.defaultSelectedCategoryLabel = category.title;
            console.log('default', this.defaultSelectedCategoryLabel);
          }
      })
    }
  }

  onClearLocalProduct(){
    this.localProducts = {id: '', title: '', images: [], description: '', isFavorite: false, price: 0};
    this.categories = [];
    this.defaultSelectedCategoryLabel = '';
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
      this.selectedImages.reverse();
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
    setTimeout(() => {
      this.updateProducts.emit();
    }, 200)
  }

  onCategorySelected($event: string) {
    this.localProducts.category_id = $event;
  }

  async onClearAllImages() {
    // let currentId = null;
    // if(this.mode === CategoryModalModes.CREATE){return;}
    //
    // if (this.selectedImages.length > 0 && this.selectedProductEntry !== null) {
    //   const prImages = this.selectedProductEntry.productImages || [];
    //   if(prImages.length === 0){return;}
    //   currentId = prImages[0].id;
    //   if(currentId !== null){
    //     await this.productLocalService?.deleteProductImage(this.localProducts.id, currentId);
    //     await this.setPlaceholderAsLogo();
    //   }
    //   this.productLocalService?.updateProduct(this.localProducts);
    // }
  }

  async deleteCurrentImage(currentImageIndex: number) {
    let currentId = null;
    if(this.mode === CategoryModalModes.CREATE){return;}

    if (this.selectedImages.length > 0 && this.selectedProductEntry !== null) {
      const prImages = this.selectedProductEntry.productImages || [];
      currentId = prImages[currentImageIndex].id;
      if(currentId !== null){
        await this.productLocalService?.deleteProductImage(this.localProducts.id, currentId);
      }

      setTimeout(() => {
        this.updateProducts.emit();
      }, 200)
      // this.productLocalService?.updateProduct(this.localProducts);
    }
  }

  // async setPlaceholderAsLogo() {
  //   if (this.productLocalService === null) return;
  //
  //   const fileUrl = this.placeholderSvgPath;
  //
  //   await this.productLocalService.addProductImage(this.localProducts.id, fileUrl);
  //
  //   this.selectedImages.push(fileUrl);
  // }
}
