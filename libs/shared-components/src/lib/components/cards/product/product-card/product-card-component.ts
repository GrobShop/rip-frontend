import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {ButtonComponent} from "../../../button/button-component";
import {Product, ProductImage} from "../../../../interfaces/product.interface";
import {ImageCarouselComponent} from "../../../carousel/image-carousel-component";
import {ProductService} from "../../../../../../../../apps/standard/src/services/routes/product/product.service";
import {ProductLocalService} from "../../../../../../../../apps/standard/src/services/routes/product/product-local.service";
import {BehaviorSubject, catchError, Observable, of, switchMap} from "rxjs";
import {WishlistService} from "../../../../../../../../apps/standard/src/services/routes/whislist/whislist.service";
import {
  WishlistLocalService
} from "../../../../../../../../apps/standard/src/services/routes/whislist/whislist-local.service";
import {CartService} from "../../../../../../../../apps/standard/src/services/routes/cart/cart.service";
import {CartLocalService} from "../../../../../../../../apps/standard/src/services/routes/cart/cart-local.service";
import {InputComponent} from "../../../input/input-component";

@Component({
  selector: 'lib-product-card-component',
  imports: [
    NgIf,
    ButtonComponent,
    ImageCarouselComponent,
    AsyncPipe,
    InputComponent
  ],
  templateUrl: './product-card-component.html',
  styleUrl: './product-card-component.css',
  standalone: true
})
export class ProductCardComponent {
  // @Input() product: Product = {id: '', images: [], price: 0, isFavorite: false, title: '', description: ''};
  //
  // logoCategoryUrls: string[] | null = null; // Сохраняем URL вместо Blob
  //
  // constructor(private productService: ProductService, private productLocalService: ProductLocalService) {
  // }
  //
  // async ngOnInit(){
  //   this.logoCategoryUrls = [];
  //   // if(this.productLocalService){
  //       console.log(this.product.productImages);
  //       if(this.product.productImages !== undefined){
  //         for(const image of this.product.productImages){
  //           const blob = await this.productLocalService.getProductImage(this.product.id, image.id);
  //           this.logoCategoryUrls?.push(URL.createObjectURL(blob));
  //         }
  //       }
  //   // }
  // }
  //
  // get adaptedWidth(): string {
  //   return 'clamp(400px, 583px, 700px)';
  // }
  //
  // get adaptedHeight(): string {
  //   return 'clamp(160px, 218px, 300px)';
  // }

  @Input() product!: Product;
  @Input() showFavoriteBtn: boolean = true;
  @Input() showQuantity: boolean = false;

  // Реактивный стрим для URL изображений
  imageUrls$!: Observable<string[]>;

  private imageUrlsSubject = new BehaviorSubject<string[]>([]);
  private blobUrls: string[] = [];
  isWishlist: boolean = false;
  isCart: boolean = false;
  quantity: number = 1;

  @Output() onQuantityChange = new EventEmitter<{quantity: number, product_id: string}>();

  constructor(private productLocalService: ProductLocalService, private wishlistService: WishlistService, private wishlistLocalService: WishlistLocalService, private cartService: CartService, private cartLocalService: CartLocalService) {}

  ngOnInit(){
    this.isWishlist = this.wishlistLocalService.isInWishlist(this.product.id);
    this.isCart = this.cartLocalService.isInCart(this.product.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.loadProductImages();
    }
  }

  private loadProductImages(): void {
    if (!this.product.productImages || this.product.productImages.length === 0) {
      this.imageUrlsSubject.next([]);
      return;
    }

    // Создаём стрим: ProductImage[] → Promise<string[]> → string[]
    this.imageUrls$ = of(this.product.productImages).pipe(
      switchMap(images =>
        Promise.all(
          images.map(async (img: ProductImage) => {
            try {
              const blob = await this.productLocalService.getProductImage(this.product.id, img.id);
              const url = URL.createObjectURL(blob);
              this.blobUrls.push(url); // Сохраняем для revoke
              return url;
            } catch (error) {
              console.warn(`Failed to load image ${img.id}`, error);
              return '';
            }
          })
        ).then(urls => urls.filter(url => url))
      ),
      catchError(err => {
        console.error('Error loading images:', err);
        return of([]);
      })
    );

    // Подписываемся и пушим в subject для async pipe
    this.imageUrls$.subscribe(urls => {
      this.imageUrlsSubject.next(urls);
    });
  }

  // Для async pipe в шаблоне
  get imageUrlsAsync$(): Observable<string[]> {
    return this.imageUrlsSubject.asObservable();
  }

  ngOnDestroy(): void {
    // Освобождаем память
    this.blobUrls.forEach(url => URL.revokeObjectURL(url));
    this.blobUrls = [];
  }

  get adaptedWidth(): string {
    return 'clamp(400px, 583px, 700px)';
  }

  get adaptedHeight(): string {
    return 'clamp(160px, 218px, 300px)';
  }

  async onAddWishlist(){
    await this.wishlistLocalService.addItem(this.product.id);
    this.isWishlist = true;
  }

  async onDeleteWishlist(){
    const itemId = this.wishlistLocalService.getItemIdByProductId(this.product.id);
    if(itemId === null){return;}
    await this.wishlistLocalService.removeItem(itemId);
    this.isWishlist = false;
  }

  async onAddCart(){
    await this.cartLocalService.addItem(this.product.id);
    this.isCart = true;
  }

  async onDeleteCart(){
    const itemId = this.cartLocalService.getItemIdByProductId(this.product.id);
    if(itemId === null){return;}
    await this.cartLocalService.removeItem(itemId);
    this.isCart = false;
  }

  async onWishlistChangeItem() {
    if(this.isWishlist){
      await this.onDeleteWishlist();
      return;
    }
    await this.onAddWishlist();
  }

  async onCartChangeItem() {
    if(this.isCart){
      await this.onDeleteCart();
      return;
    }
    await this.onAddCart();
  }

  onDownQuantity() {
    if(this.quantity === 1){return;}
    this.quantity--;
    this.onQuantityChange.emit({quantity: this.quantity, product_id: this.product.id});
  }

  onUppQuantity() {
    this.quantity++;
    this.onQuantityChange.emit({quantity: this.quantity, product_id: this.product.id});
  }
}
