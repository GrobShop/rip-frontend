import {Component, EnvironmentInjector, Input} from '@angular/core';
import {
  CategoryCardMinComponent
} from "../../../../../../libs/shared-components/src/lib/components/cards/category/category-card-min/category-card-min-component";
import {HeaderComponent} from "../../../../../../libs/shared-components/src/lib/components/header/header-component";
import {
  HeaderDescriptionComponent
} from "../../../../../../libs/shared-components/src/lib/components/header-description/header-description-component";
import {
  CategoryCardAdmin
} from "../../../../../../libs/shared-components/src/lib/components/cards/category/category-card-admin/category-card-admin";
import {NavBarComponent} from "../../../../../../libs/shared-components/src/lib/components/nav-bar/nav-bar-component";
import {AdminNavLinks} from "../../../../../../libs/shared-components/src/lib/data/navlinks";
import {CategoriesModalComponent} from "../../components/modals/categories-modal/categories-modal-component";
import {
  ModalBaseComponent
} from "../../../../../../libs/shared-components/src/lib/components/modals/modal-base/modal-base-component";
import {CategoryModalModes} from "../../../shared/modes/modals/category-model-modes.enum";
import {Category, CategoryServer} from "../../../../../../libs/shared-components/src/lib/interfaces/category.interface";
import {CategoryService} from "../../../services/routes/category/category.service";
import {CategoryLocalService} from "../../../services/routes/category/category-local.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";
import {
  ConfirmModalService
} from "../../../../../../libs/shared-components/src/lib/services/modals/confirm-modal.service";
import {ButtonComponent} from "../../../../../../libs/shared-components/src/lib/components/button/button-component";
import {InputComponent} from "../../../../../../libs/shared-components/src/lib/components/input/input-component";

@Component({
  selector: 'app-categories-controls-page',
  imports: [
    CategoryCardMinComponent,
    HeaderComponent,
    HeaderDescriptionComponent,
    CategoryCardAdmin,
    NavBarComponent,
    CategoriesModalComponent,
    ModalBaseComponent,
    HttpClientModule,
    NgForOf,
    NgIf,
    ButtonComponent,
    InputComponent
  ],
  templateUrl: './categories-controls-page.html',
  styleUrl: './categories-controls-page.css',
  standalone: true
})
export class CategoriesControlsPage {

  constructor(private http: HttpClient, private categoryService: CategoryService, protected categoryLocalService: CategoryLocalService, private httpClient: HttpClient, private injector: EnvironmentInjector) {
  }

  filteredCategories: Category[] = [];
  categories: Category[] = [];
  selectedCategoryEntry: Category | null = null;
  searchQuery: string = "";

  async ngOnInit(){
    await this.categoryLocalService.syncCategories();
    await this.updateCategories();
  }

  protected async updateCategories() {
    this.categories = this.categoryLocalService.getCategories();
    this.filteredCategories = this.categories;
  }

  modalsControls = {
    createOrEditCategory: {
      isModalOpen: false,
      mode: CategoryModalModes.CREATE,
    }
  }

  closeCreateOrEditCategoryModal(){
    this.modalsControls.createOrEditCategory.isModalOpen = false;
    this.selectedCategoryEntry = null;
  }

  openCreateOrEditCategoryModal(){
    this.modalsControls.createOrEditCategory.isModalOpen = true;
  }

  protected readonly AdminNavLinks = AdminNavLinks;

  async onDeleteCategory(category: Category) {
    const confirm = await ConfirmModalService.createConfirmModal(this.injector, '', `Вы уверены, что хотите удалить категорию "${category.title}"?`);
    if(confirm){
      await this.categoryLocalService.deleteCategory(category.id);
      await this.updateCategories();
    }
  }

  onEditCategory(category: Category) {
    this.modalsControls.createOrEditCategory.mode = CategoryModalModes.EDIT;
    this.openCreateOrEditCategoryModal();
    this.selectedCategoryEntry = category;
  }

  onAddCategory(){
    this.modalsControls.createOrEditCategory.mode = CategoryModalModes.CREATE;
    this.openCreateOrEditCategoryModal();
  }

  onChangeSearchQuery(query: string) {
    this.searchQuery = query;
    this.filterCategories();
  }

  filterCategories() {
    if(this.searchQuery === ''){
      this.filteredCategories = this.categories;
      return;
    }
    this.filteredCategories = this.filteredCategories.filter((entry) => (entry.title.toLowerCase() ?? '').includes(this.searchQuery.toLowerCase()));
  }
}
