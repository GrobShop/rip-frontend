import { Component } from '@angular/core';
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
import {Category} from "../../../../../../libs/shared-components/src/lib/interfaces/category.interface";

@Component({
  selector: 'app-categories-controls-page',
  imports: [
    CategoryCardMinComponent,
    HeaderComponent,
    HeaderDescriptionComponent,
    CategoryCardAdmin,
    NavBarComponent,
    CategoriesModalComponent,
    ModalBaseComponent
  ],
  templateUrl: './categories-controls-page.html',
  styleUrl: './categories-controls-page.css',
  standalone: true
})
export class CategoriesControlsPage {
  categories: Category[] = [];
  selectedCategoryEntry: Category | null = null;


  modalsControls = {
    createOrEditCategory: {
      isModalOpen: false,
      mode: CategoryModalModes.CREATE,
    }
  }

  closeCreateOrEditCategoryModal(){
    this.modalsControls.createOrEditCategory.isModalOpen = false;
  }

  openCreateOrEditCategoryModal(){
    this.modalsControls.createOrEditCategory.isModalOpen = true;
  }

  protected readonly AdminNavLinks = AdminNavLinks;
}
