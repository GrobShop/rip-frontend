import {Component, EnvironmentInjector} from '@angular/core';
import {
  ProductCardComponent
} from "../../../../../../libs/shared-components/src/lib/components/cards/product/product-card/product-card-component";
import {
  HeaderDescriptionComponent
} from "../../../../../../libs/shared-components/src/lib/components/header-description/header-description-component";
import {HeaderComponent} from "../../../../../../libs/shared-components/src/lib/components/header/header-component";
import {ButtonComponent} from "../../../../../../libs/shared-components/src/lib/components/button/button-component";
import {ActivatedRoute} from "@angular/router";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Product} from "../../../../../../libs/shared-components/src/lib/interfaces/product.interface";
import {StoreService} from "../../../../../../libs/shared-components/src/lib/services/vault/store.service";
import {StoreKeys} from "../../../../../../libs/shared-components/src/lib/data/vault/store.keys";
import {ProductService} from "../../../services/routes/product/product.service";
import {ProductLocalService} from "../../../services/routes/product/product-local.service";
import {CategoryService} from "../../../services/routes/category/category.service";
import {CategoryLocalService} from "../../../services/routes/category/category-local.service";
import {NgForOf, NgIf} from "@angular/common";
import {Category} from "../../../../../../libs/shared-components/src/lib/interfaces/category.interface";

@Component({
  selector: 'app-product-page',
  imports: [
    ProductCardComponent,
    HeaderDescriptionComponent,
    HeaderComponent,
    ButtonComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css',
  standalone: true
})
export class ProductPage {
  // products: Product[] = [];
  // category: Category | null = null;
  // categoryId: any;
  // categoryDescription: string = '';
  //
  // constructor(private route: ActivatedRoute,private router: Router, private http: HttpClient, private productService: ProductService, protected productLocalService: ProductLocalService, private httpClient: HttpClient, private injector: EnvironmentInjector, private categoryService: CategoryService, protected categoryLocalService: CategoryLocalService) {}
  //
  //
  // async ngOnInit(){
  //   // Подписываемся на изменения параметров маршрута
  //   this.route.paramMap.subscribe(async (params) => {
  //     const id = params.get('categoryId');
  //     if (id) {
  //       this.categoryId = id;
  //       console.log('Category ID:', this.categoryId);
  //       await this.updateProducts();
  //     } else {
  //       console.warn('categoryId не найден в URL');
  //     }
  //   });
  //   await this.getCategoryById();
  //   await this.updateProducts();
  // }
  //
  // async ngAfterViewInit(){
  //   await this.updateProducts();
  // }
  //
  // protected async updateProducts() {
  //   const userId = await StoreService.get(StoreKeys.USER_ID);
  //   console.log(userId);
  //   await this.productLocalService.syncProductsByCategory(this.categoryId);
  //   this.products = this.productLocalService.getProducts();
  //   console.log(this.products);
  // }
  //
  // protected async getCategoryById(){
  //   this.category = await this.categoryLocalService.getCategoryById(this.categoryId);
  //   this.categoryDescription = this.category.description ? this.category.description : '';
  // }
  //
  // async goHomepage(){
  //   await this.router.navigate(['/categories']);
  // }

  products: Product[] = [];
  category: Category | null = null;
  categoryId: string | null = null;
  categoryDescription: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected productLocalService: ProductLocalService,
    private injector: EnvironmentInjector,
    protected categoryLocalService: CategoryLocalService
  ) {}

  async ngOnInit(): Promise<void> {
    // Подписываемся на изменения маршрута
    this.route.paramMap.subscribe(async (params) => {
      const id = params.get('categoryId');
      if (id && id !== this.categoryId) {
        this.categoryId = id;
        console.log('Category ID:', this.categoryId);

        // Последовательно: категория → товары
        await this.loadCategoryAndProducts();
      }
    });
  }

  /** Загружаем категорию и товары */
  private async loadCategoryAndProducts(): Promise<void> {
    if (!this.categoryId) return;

    try {
      // 1. Загружаем категорию
      this.category = await this.categoryLocalService.getCategoryById(this.categoryId);
      this.categoryDescription = this.category?.description || '';

      // 2. Синхронизируем товары
      await this.productLocalService.syncProductsByCategory(this.categoryId);
      this.products = this.productLocalService.getProducts();

      console.log('Products loaded:', this.products);
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      this.products = [];
      this.category = null;
    }
  }

  async goHomepage(): Promise<void> {
    await this.router.navigate(['/categories']);
  }
}
