import {Component, EnvironmentInjector} from '@angular/core';
import {HeaderComponent} from "../../../../../../libs/shared-components/src/lib/components/header/header-component";
import {
  HeaderDescriptionComponent
} from "../../../../../../libs/shared-components/src/lib/components/header-description/header-description-component";
import {
  CategoryCardMinComponent
} from "../../../../../../libs/shared-components/src/lib/components/cards/category/category-card-min/category-card-min-component";
import {HttpClient} from "@angular/common/http";
import {Category} from "../../../../../../libs/shared-components/src/lib/interfaces/category.interface";
import {CategoryService} from "../../../services/routes/category/category.service";
import {CategoryLocalService} from "../../../services/routes/category/category-local.service";
import {NgForOf} from "@angular/common";
import {
  CategoryCardAdmin
} from "../../../../../../libs/shared-components/src/lib/components/cards/category/category-card-admin/category-card-admin";

@Component({
  selector: 'app-category-page',
  imports: [
    HeaderComponent,
    HeaderDescriptionComponent,
    CategoryCardMinComponent,
    NgForOf,
    CategoryCardAdmin
  ],
  templateUrl: './category-page.html',
  styleUrl: './category-page.css',
  standalone: true
})
export class CategoryPage {

  constructor(private http: HttpClient, private categoryService: CategoryService, protected categoryLocalService: CategoryLocalService, private httpClient: HttpClient, private injector: EnvironmentInjector) {
  }

  categories: Category[] = [];

  async ngOnInit(){
    await this.updateCategories();
  }

  protected async updateCategories() {
    await this.categoryLocalService.syncCategories();
    this.categories = this.categoryLocalService.getCategories();
  }
}
