import {Component, EnvironmentInjector} from '@angular/core';
import {HeaderComponent} from "../../../../../../libs/shared-components/src/lib/components/header/header-component";
import {
  HeaderDescriptionComponent
} from "../../../../../../libs/shared-components/src/lib/components/header-description/header-description-component";
import {NavBarComponent} from "../../../../../../libs/shared-components/src/lib/components/nav-bar/nav-bar-component";
import {AdminNavLinks} from "../../../../../../libs/shared-components/src/lib/data/navlinks";
import {ButtonComponent} from "../../../../../../libs/shared-components/src/lib/components/button/button-component";
import {InputComponent} from "../../../../../../libs/shared-components/src/lib/components/input/input-component";
import {
  ModalBaseComponent
} from "../../../../../../libs/shared-components/src/lib/components/modals/modal-base/modal-base-component";
import {NgForOf, NgIf} from "@angular/common";
import {
  PartnerCardComponent
} from "../../../../../../libs/shared-components/src/lib/components/cards/partner/partner-card/partner-card-component";
import {PartnersModalComponent} from "../../components/modals/partners-modal/partners-modal-component";
import {HttpClient} from "@angular/common/http";
import {PartnersService} from "../../../services/routes/partner/partners.service";
import {PartnersLocalService} from "../../../services/routes/partner/partners-local.service";
import {Partner} from "../../../../../../libs/shared-components/src/lib/interfaces/partner.interface";
import {CategoryModalModes} from "../../../shared/modes/modals/category-model-modes.enum";
import {
  ConfirmModalService
} from "../../../../../../libs/shared-components/src/lib/services/modals/confirm-modal.service";
import {Product} from "../../../../../../libs/shared-components/src/lib/interfaces/product.interface";
import {ProductService} from "../../../services/routes/product/product.service";
import {ProductLocalService} from "../../../services/routes/product/product-local.service";
import {
  ProductCardAdmin
} from "../../../../../../libs/shared-components/src/lib/components/cards/product/product-card-admin/product-card-admin";
import {ProductModalComponent} from "../../components/modals/product-modal/product-modal-component";
import {Category} from "../../../../../../libs/shared-components/src/lib/interfaces/category.interface";
import {CategoryService} from "../../../services/routes/category/category.service";
import {CategoryLocalService} from "../../../services/routes/category/category-local.service";
import {StoreService} from "../../../../../../libs/shared-components/src/lib/services/vault/store.service";
import {StoreKeys} from "../../../../../../libs/shared-components/src/lib/data/vault/store.keys";

@Component({
  selector: 'app-products-controls-page',
  imports: [
    HeaderComponent,
    HeaderDescriptionComponent,
    NavBarComponent,
    ButtonComponent,
    InputComponent,
    ModalBaseComponent,
    NgForOf,
    NgIf,
    PartnerCardComponent,
    PartnersModalComponent,
    ProductCardAdmin,
    ProductModalComponent
  ],
  templateUrl: './products-controls-page.html',
  styleUrl: './products-controls-page.css',
  standalone: true
})
export class ProductsControlsPage {

  constructor(private http: HttpClient, private productService: ProductService, protected productLocalService: ProductLocalService, private httpClient: HttpClient, private injector: EnvironmentInjector, private categoryService: CategoryService, protected categoryLocalService: CategoryLocalService) {
  }

  filteredProducts: Product[] = [];
  products: Product[] = [];
  categories: Category[] = [];
  selectedProductEntry: Product | null = null;
  searchQuery: string = "";

  modalsControls = {
    createOrEditProduct: {
      isModalOpen: false,
      mode: CategoryModalModes.CREATE,
    }
  }

  async ngOnInit(){
    // await this.partnerLocalService.syncPartners();
    await this.updateCategories();
    await this.updateProducts();
  }

  async ngOnChanges(){
    // await this.partnerLocalService.syncPartners();
    await this.updateCategories();
    await this.updateProducts();
  }

  protected async updateCategories() {
    await this.categoryLocalService.syncCategories();
    this.categories = this.categoryLocalService.getCategories();
  }

  protected async updateProducts() {
    const userId = await StoreService.get(StoreKeys.USER_ID);
    console.log(userId);
    await this.productLocalService.syncProducts(userId ? userId : '');
    this.products = this.productLocalService.getProducts();
    this.filteredProducts = this.products;
  }

  async onDeleteProduct(product: Product) {
    const confirm = await ConfirmModalService.createConfirmModal(this.injector, '', `Вы уверены, что хотите удалить товар "${product.title}"?`);
    if(confirm){
      await this.productLocalService.deleteProduct(product.id);
      await this.updateProducts();
    }
  }

  onEditProduct(product: Product) {
    this.modalsControls.createOrEditProduct.mode = CategoryModalModes.EDIT;
    this.selectedProductEntry = product;
    this.openCreateOrEditPartnerModal();
  }

  onAddProduct() {
    this.modalsControls.createOrEditProduct.mode = CategoryModalModes.CREATE;
    this.openCreateOrEditPartnerModal();
  }

  closeCreateOrEditPartnerModal(){
    this.modalsControls.createOrEditProduct.isModalOpen = false;
    this.selectedProductEntry = null;
  }

  openCreateOrEditPartnerModal(){
    this.modalsControls.createOrEditProduct.isModalOpen = true;
  }

  onChangeSearchQuery(query: string) {
    this.searchQuery = query;
    this.filterProducts();
  }

  filterProducts() {
    if(this.searchQuery === ''){
      this.filteredProducts = this.products;
      return;
    }
    this.filteredProducts = this.filteredProducts.filter((entry) => (entry.title.toLowerCase() ?? '').includes(this.searchQuery.toLowerCase()));
  }

  protected readonly AdminNavLinks = AdminNavLinks;
}
