import {ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {ButtonComponent} from "../../../button/button-component";
import {Product, ProductImage} from "../../../../interfaces/product.interface";
import {ImageCarouselComponent} from "../../../carousel/image-carousel-component";
import {ProductService} from "../../../../../../../../apps/standard/src/services/routes/product/product.service";
import {ProductLocalService} from "../../../../../../../../apps/standard/src/services/routes/product/product-local.service";
import {BehaviorSubject, catchError, Observable, of, shareReplay, switchMap} from "rxjs";
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
  // @Input() product!: Product;
  // @Input() showFavoriteBtn: boolean = true;
  // @Input() showQuantity: boolean = false;
  //
  // // Реактивный стрим для URL изображений
  // imageUrls$!: Observable<string[]>;
  //
  // private imageUrlsSubject = new BehaviorSubject<string[]>([]);
  // private blobUrls: string[] = [];
  // isWishlist: boolean = false;
  // isCart: boolean = false;
  // quantity: number = 1;
  //
  // @Output() onQuantityChange = new EventEmitter<{quantity: number, product_id: string, product: Product}>();
  //
  // constructor(private productLocalService: ProductLocalService, private wishlistService: WishlistService, private wishlistLocalService: WishlistLocalService, private cartService: CartService, private cartLocalService: CartLocalService) {}
  //
  // ngOnInit(){
  //   this.isWishlist = this.wishlistLocalService.isInWishlist(this.product.id);
  //   this.isCart = this.cartLocalService.isInCart(this.product.id);
  //   // this.loadProductImages();
  // }
  //
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['product'] && this.product) {
  //     // this.loadProductImages();
  //   }
  // }
  //
  // ngAfterViewInit(){
  //   this.loadProductImages();
  // }
  //
  //
  // private loadProductImages(): void {
  //   if (!this.product.productImages || this.product.productImages.length === 0) {
  //     this.imageUrlsSubject.next([]);
  //     return;
  //   }
  //
  //   // Создаём стрим: ProductImage[] → Promise<string[]> → string[]
  //   this.imageUrls$ = of(this.product.productImages).pipe(
  //     switchMap(images =>
  //       Promise.all(
  //         images.map(async (img: ProductImage) => {
  //           try {
  //             const blob = await this.productLocalService.getProductImage(this.product.id, img.id);
  //             const url = URL.createObjectURL(blob);
  //             this.blobUrls.push(url); // Сохраняем для revoke
  //             return url;
  //           } catch (error) {
  //             console.warn(`Failed to load image ${img.id}`, error);
  //             return '';
  //           }
  //         })
  //       ).then(urls => urls.filter(url => url))
  //     ),
  //     catchError(err => {
  //       console.error('Error loading images:', err);
  //       return of([]);
  //     })
  //   );
  //
  //   // Подписываемся и пушим в subject для async pipe
  //   this.imageUrls$.subscribe(urls => {
  //     this.imageUrlsSubject.next(urls);
  //   });
  // }
  //
  // // Для async pipe в шаблоне
  // get imageUrlsAsync$(): Observable<string[]> {
  //   return this.imageUrlsSubject.asObservable();
  // }
  //
  // ngOnDestroy(): void {
  //   // Освобождаем память
  //   this.blobUrls.forEach(url => URL.revokeObjectURL(url));
  //   this.blobUrls = [];
  // }
  //
  // get adaptedWidth(): string {
  //   return 'clamp(400px, 583px, 700px)';
  // }
  //
  // get adaptedHeight(): string {
  //   return 'clamp(160px, 218px, 300px)';
  // }
  //
  // async onAddWishlist(){
  //   await this.wishlistLocalService.addItem(this.product.id);
  //   this.isWishlist = true;
  // }
  //
  // async onDeleteWishlist(){
  //   const itemId = this.wishlistLocalService.getItemIdByProductId(this.product.id);
  //   if(itemId === null){return;}
  //   await this.wishlistLocalService.removeItem(itemId);
  //   this.isWishlist = false;
  // }
  //
  // async onAddCart(){
  //   await this.cartLocalService.addItem(this.product.id);
  //   this.isCart = true;
  // }
  //
  // async onDeleteCart(){
  //   const itemId = this.cartLocalService.getItemIdByProductId(this.product.id);
  //   if(itemId === null){return;}
  //   await this.cartLocalService.removeItem(itemId);
  //   this.isCart = false;
  // }
  //
  // async onWishlistChangeItem() {
  //   if(this.isWishlist){
  //     await this.onDeleteWishlist();
  //     return;
  //   }
  //   await this.onAddWishlist();
  // }
  //
  // async onCartChangeItem() {
  //   if(this.isCart){
  //     await this.onDeleteCart();
  //     return;
  //   }
  //   await this.onAddCart();
  // }
  //
  // onDownQuantity() {
  //   if(this.quantity === 1){return;}
  //   this.quantity--;
  //   this.onQuantityChange.emit({quantity: this.quantity, product_id: this.product.id, product: this.product});
  // }
  //
  // onUppQuantity() {
  //   this.quantity++;
  //   this.onQuantityChange.emit({quantity: this.quantity, product_id: this.product.id, product: this.product});
  // }

  // @Input() product!: Product;
  // @Input() showFavoriteBtn: boolean = true;
  // @Input() showQuantity: boolean = false;
  //
  // @Output() onQuantityChange = new EventEmitter<{quantity: number, product_id: string, product: Product}>();
  //
  // // Реактивный стрим
  // private imageUrlsSubject = new BehaviorSubject<string[]>([]);
  // imageUrls$ = this.imageUrlsSubject.asObservable();
  //
  // private blobUrls: string[] = [];
  //
  // isWishlist = false;
  // isCart = false;
  // quantity = 1;
  //
  // constructor(
  //   private productLocalService: ProductLocalService,
  //   private wishlistLocalService: WishlistLocalService,
  //   private cartLocalService: CartLocalService
  // ) {}
  //
  // /** Главное: реагируем на изменение product */
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['product'] && this.product) {
  //     this.updateWishlistStatus();
  //     this.updateCartStatus();
  //     this.loadProductImages(); // ← ВЫЗЫВАЕМ ЗДЕСЬ!
  //   }
  // }
  //
  // /** Загрузка изображений */
  // private loadProductImages(): void {
  //   // Очищаем старые blob URL
  //   this.revokeBlobUrls();
  //
  //   if (!this.product?.productImages || this.product.productImages.length === 0) {
  //     this.imageUrlsSubject.next([]);
  //     return;
  //   }
  //
  //   // Стрим: ProductImage[] → string[]
  //   of(this.product.productImages).pipe(
  //     switchMap(images =>
  //       Promise.all(
  //         images.map(async (img: ProductImage) => {
  //           try {
  //             const blob = await this.productLocalService.getProductImage(this.product.id, img.id);
  //             const url = URL.createObjectURL(blob);
  //             this.blobUrls.push(url);
  //             return url;
  //           } catch (error) {
  //             console.warn(`Failed to load image ${img.id}`, error);
  //             return '';
  //           }
  //         })
  //       ).then(urls => urls.filter(Boolean))
  //     ),
  //     catchError(err => {
  //       console.error('Error loading images:', err);
  //       return of([]);
  //     })
  //   ).subscribe(urls => {
  //     this.imageUrlsSubject.next(urls);
  //   });
  // }
  //
  // /** Очистка blob URL */
  // private revokeBlobUrls(): void {
  //   this.blobUrls.forEach(url => URL.revokeObjectURL(url));
  //   this.blobUrls = [];
  // }
  //
  // ngOnDestroy(): void {
  //   this.revokeBlobUrls();
  //   this.imageUrlsSubject.complete();
  // }
  //
  // // ——— Статусы ———
  // private updateWishlistStatus(): void {
  //   this.isWishlist = this.wishlistLocalService.isInWishlist(this.product.id);
  // }
  //
  // private updateCartStatus(): void {
  //   this.isCart = this.cartLocalService.isInCart(this.product.id);
  //   const qty = this.cartLocalService.getQuantity(this.product.id);
  //   this.quantity = qty > 0 ? qty : 1;
  // }
  //
  // // ——— Wishlist ———
  // async onWishlistChangeItem(): Promise<void> {
  //   if (this.isWishlist) {
  //     const itemId = this.wishlistLocalService.getItemIdByProductId(this.product.id);
  //     if (itemId) await this.wishlistLocalService.removeItem(itemId);
  //   } else {
  //     await this.wishlistLocalService.addItem(this.product.id);
  //   }
  //   this.updateWishlistStatus();
  // }
  //
  // // ——— Cart ———
  // async onCartChangeItem(): Promise<void> {
  //   if (this.isCart) {
  //     const itemId = this.cartLocalService.getItemIdByProductId(this.product.id);
  //     if (itemId) await this.cartLocalService.removeItem(itemId);
  //   } else {
  //     await this.cartLocalService.addItem(this.product.id, this.quantity);
  //   }
  //   this.updateCartStatus();
  // }
  //
  // // ——— Количество ———
  // onDownQuantity(): void {
  //   if (this.quantity <= 1) return;
  //   this.quantity--;
  //   this.emitQuantity();
  // }
  //
  // onUppQuantity(): void {
  //   this.quantity++;
  //   this.emitQuantity();
  // }
  //
  // private emitQuantity(): void {
  //   this.onQuantityChange.emit({
  //     quantity: this.quantity,
  //     product_id: this.product.id,
  //     product: this.product
  //   });
  // }
  //
  // // ——— Адаптив ———
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

  @Output() onQuantityChange = new EventEmitter<{quantity: number, product_id: string, product: Product}>();
  @Output() onWishlistChange = new EventEmitter<Product>();
  @Output() onCartChange = new EventEmitter<{product: Product, quantity: number}>();

  // === Реактивные стримы ===
  private imageUrlsCache = new Map<string, Observable<string[]>>(); // Кэш по product.id
  imageUrls$!: Observable<string[]>;
  isLoadingImages$ = new BehaviorSubject<boolean>(true);

  private blobUrls: string[] = [];

  isWishlist = false;
  isCart = false;
  quantity = 1;

  constructor(
    private productLocalService: ProductLocalService,
    private wishlistLocalService: WishlistLocalService,
    private cartLocalService: CartLocalService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.updateWishlistStatus();
      this.updateCartStatus();
      this.loadProductImagesWithCache(); // ← Кэш + Lazy
      this.cdr.detectChanges();
    }
  }

  /** === КЭШИРОВАНИЕ + LAZY LOADING === */
  private loadProductImagesWithCache(): void {
    this.isLoadingImages$.next(true);
    this.revokeBlobUrls();

    const cacheKey = this.product.id;
    if (this.imageUrlsCache.has(cacheKey)) {
      this.imageUrls$ = this.imageUrlsCache.get(cacheKey)!;
    } else {
      const imageStream$ = this.createImageStream().pipe(
        shareReplay(1) // Один раз загрузить — всем подписчикам
      );
      this.imageUrlsCache.set(cacheKey, imageStream$);
      this.imageUrls$ = imageStream$;
    }

    // Подписываемся на завершение
    this.imageUrls$.subscribe({
      next: () => this.isLoadingImages$.next(false),
      error: () => this.isLoadingImages$.next(false)
    });
  }

  private createImageStream(): Observable<string[]> {
    return of(this.product.productImages || []).pipe(
      switchMap(images => {
        if (images.length === 0) return of([]);
        return Promise.all(
          images.map(async (img: ProductImage) => {
            try {
              const blob = await this.productLocalService.getProductImage(this.product.id, img.id);
              const url = URL.createObjectURL(blob);
              this.blobUrls.push(url);
              return url;
            } catch (error) {
              console.warn(`Failed to load image ${img.id}`, error);
              return '';
            }
          })
        ).then(urls => urls.filter(Boolean));
      }),
      catchError(err => {
        console.error('Error loading images:', err);
        return of([]);
      })
    );
  }

  /** === ОЧИСТКА === */
  private revokeBlobUrls(): void {
    this.blobUrls.forEach(url => URL.revokeObjectURL(url));
    this.blobUrls = [];
  }

  ngOnDestroy(): void {
    this.revokeBlobUrls();
    this.imageUrlsCache.clear();
  }

  // === Статусы ===
  private updateWishlistStatus(): void {
    this.isWishlist = this.wishlistLocalService.isInWishlist(this.product.id);
  }

  private updateCartStatus(): void {
    this.isCart = this.cartLocalService.isInCart(this.product.id);
    const qty = this.cartLocalService.getQuantity(this.product.id);
    this.quantity = qty > 0 ? qty : 1;
  }

  // === Wishlist ===
  async onWishlistChangeItem(): Promise<void> {
    if (this.isWishlist) {
      const itemId = this.wishlistLocalService.getItemIdByProductId(this.product.id);
      if (itemId) await this.wishlistLocalService.removeItem(itemId);
    } else {
      await this.wishlistLocalService.addItem(this.product.id);
    }
    this.updateWishlistStatus();
    this.onWishlistChange.emit(this.product);
  }

  // === Cart ===
  async onCartChangeItem(): Promise<void> {
    if (this.isCart) {
      const itemId = this.cartLocalService.getItemIdByProductId(this.product.id);
      if (itemId) await this.cartLocalService.removeItem(itemId);
    } else {
      await this.cartLocalService.addItem(this.product.id, this.quantity);
    }
    this.updateCartStatus();
    this.onCartChange.emit({product: this.product, quantity: this.quantity});
  }

  // === Количество ===
  onDownQuantity(): void {
    if (this.quantity <= 1) return;
    this.quantity--;
    this.emitQuantity();
  }

  onUppQuantity(): void {
    this.quantity++;
    this.emitQuantity();
  }

  private emitQuantity(): void {
    this.onQuantityChange.emit({
      quantity: this.quantity,
      product_id: this.product.id,
      product: this.product
    });
  }

  // === Адаптив ===
  get adaptedWidth(): string {
    return 'clamp(400px, 583px, 700px)';
  }

  get adaptedHeight(): string {
    return 'clamp(160px, 218px, 300px)';
  }
}
