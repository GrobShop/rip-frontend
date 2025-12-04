import {Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild} from '@angular/core';
import { ImageCarouselComponent } from "../carousel/image-carousel-component";
import { NgIf } from "@angular/common";

@Component({
  selector: 'lib-image-selector-component',
  imports: [ImageCarouselComponent, NgIf],
  templateUrl: './image-selector-component.html',
  styleUrl: './image-selector-component.css',
  standalone: true
})
export class ImageSelectorComponent {
  @Input() multiple: boolean = false;
  @Input() selectedImages: string[] = []; // ← Только для отображения (не трогаем!)
  @Output() imagesChanged = new EventEmitter<string[]>();
  @Output() clearImagesEvent = new EventEmitter<void>();
  @Output() chooseImagesEvent = new EventEmitter<void>();
  @Input() showImageSelectBtn: boolean = true;
  @Output() deleteCurrentImage = new EventEmitter<number>();
  @Input() showClearSelectBtn: boolean = true;
  @Input() showClearCurrentSelectBtn: boolean = false;
  @Input() clearImagesCount: number = 0;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  currentImageIndex: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clearImagesCount']) {
      this._croppedImages = [];
    }
  }

  // Показываемые изображения (с учётом приоритета: новые > старые)
  get displayImages(): string[] {
    return this._croppedImages.length > 0 ? this._croppedImages : this.selectedImages;
  }

  // ← ВНУТРЕННЕЕ состояние — НЕ зависит от selectedImages
  private _croppedImages: string[] = [];

  // Геттер/сеттер, чтобы контролировать
  get croppedImages(): string[] {
    return this._croppedImages;
  }

  // При инициализации — синхронизируем с selectedImages
  ngOnInit() {
    this._croppedImages = [...this.selectedImages];
  }

  // Больше НЕ используем ngOnChanges для сброса!
  // ngOnChanges() { ... } ← УДАЛИТЬ!

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const files = Array.from(input.files);
    const imageFiles = files.filter(f => f.type.startsWith('image/'));

    if (imageFiles.length === 0) {
      alert('Пожалуйста, выберите изображения.');
      return;
    }

    // Если НЕ multiple — только один файл
    const filesToAdd = this.multiple ? imageFiles : [imageFiles[0]];

    // Создаём URL
    const newUrls = filesToAdd.map(file => URL.createObjectURL(file));

    // Добавляем к текущим
    this._croppedImages = this.multiple
      ? [...this._croppedImages, ...newUrls]
      : newUrls;

    // Эмитим
    this.imagesChanged.emit(this._croppedImages);

    // Очистка input
    input.value = '';

    this.chooseImagesEvent.emit();
  }

  clearSelection(): void {
    // Освобождаем память
    this.clearImagesEvent.emit();
    this._croppedImages.forEach(url => URL.revokeObjectURL(url));
    this._croppedImages = [];
    this.imagesChanged.emit(this._croppedImages);
    this.fileInput.nativeElement.value = '';
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  // Освобождаем URL при уничтожении
  ngOnDestroy() {
    this._croppedImages.forEach(url => URL.revokeObjectURL(url));
  }

  deleteCurrent(): void {
    if (this.displayImages.length === 0) return;

    const indexToDelete = this.currentImageIndex;

    // Если это новое изображение (из _croppedImages)
    if (this._croppedImages.length > 0) {
      const urlToRevoke = this._croppedImages[indexToDelete];
      URL.revokeObjectURL(urlToRevoke);
      this._croppedImages.splice(indexToDelete, 1);
      this.imagesChanged.emit(this._croppedImages);
    }

    // Эмитим индекс в массиве отображаемых изображений
    this.deleteCurrentImage.emit(indexToDelete);

    // Корректируем индекс, если удалили последний
    if (this.currentImageIndex >= this.displayImages.length) {
      this.currentImageIndex = Math.max(0, this.displayImages.length - 1);
    }
  }
}
