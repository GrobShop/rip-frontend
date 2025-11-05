import {ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {Product, ProductImage} from "../../../../interfaces/product.interface";
import {ButtonComponent} from "../../../button/button-component";
import {ImageCarouselComponent} from "../../../carousel/image-carousel-component";
import {AsyncPipe, NgIf} from "@angular/common";
import {
  PartnersLocalService
} from "../../../../../../../../apps/admin/src/services/routes/partner/partners-local.service";
import {Partner} from "../../../../interfaces/partner.interface";
import {
  ProductLocalService
} from "../../../../../../../../apps/admin/src/services/routes/product/product-local.service";
import {BehaviorSubject, catchError, Observable, of, shareReplay, switchMap} from "rxjs";
import {
  WishlistLocalService
} from "../../../../../../../../apps/standard/src/services/routes/whislist/whislist-local.service";
import {CartLocalService} from "../../../../../../../../apps/standard/src/services/routes/cart/cart-local.service";

@Component({
  selector: 'lib-product-card-admin',
  imports: [
    ButtonComponent,
    ImageCarouselComponent,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './product-card-admin.html',
  styleUrl: './product-card-admin.css',
  standalone: true
})
export class ProductCardAdmin {
  @Input() product: Product = {id: '', images: [], price: 0, isFavorite: false, title: '', description: ''};
  // @Input() productLocalService: ProductLocalService | null = null;
  @Output() onDeleteEvent = new EventEmitter<Product>();
  @Output() onEditEvent = new EventEmitter<Product>();

  // === Реактивные стримы ===
  private imageUrlsCache = new Map<string, Observable<string[]>>(); // Кэш по product.id
  imageUrls$!: Observable<string[]>;
  isLoadingImages$ = new BehaviorSubject<boolean>(true);

  private blobUrls: string[] = [];

  constructor(
    private productLocalService: ProductLocalService,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
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

  get adaptedWidth(): string {
    return 'clamp(400px, 583px, 700px)';
  }

  get adaptedHeight(): string {
    return 'clamp(160px, 218px, 300px)';
  }

  onDelete(){
    this.onDeleteEvent.emit(this.product);
  }

  onEdit(){
    this.onEditEvent.emit(this.product);
  }
}
