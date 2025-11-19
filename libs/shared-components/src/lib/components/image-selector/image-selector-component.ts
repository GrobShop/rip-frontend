// import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
// import {ImageCarouselComponent} from "../carousel/image-carousel-component";
// import {NgIf} from "@angular/common";
//
// @Component({
//   selector: 'lib-image-selector-component',
//   imports: [
//     ImageCarouselComponent,
//     NgIf
//   ],
//   templateUrl: './image-selector-component.html',
//   styleUrl: './image-selector-component.css',
//   standalone: true
// })
// export class ImageSelectorComponent {
//   @Input() multiple: boolean = false; // Позволяет выбрать одно или несколько изображений
//   @Input() selectedImages: string[] = []; // Текущие выбранные изображения
//   @Output() imagesChanged = new EventEmitter<string[]>(); // Эмитит обновлённый массив изображений
//
//   @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
//
//   croppedImages: string[] = [];
//
//   ngOnChanges(){
//     if(this.selectedImages.length === 0){
//       this.croppedImages = [];
//     }
//   }
//
//   onFileSelected(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files.length > 0) {
//       const files = Array.from(input.files);
//       const allowedImages = files.filter(file => file.type.startsWith('image/'));
//       if (allowedImages.length === 0) {
//         alert('Пожалуйста, выберите изображения.');
//         return;
//       }
//
//       const maxFiles = this.multiple ? allowedImages.length : 1;
//       const selectedFiles = allowedImages.slice(0, maxFiles);
//
//       this.croppedImages = selectedFiles.map(file => URL.createObjectURL(file));
//       this.imagesChanged.emit(this.croppedImages);
//
//       this.croppedImages = this.croppedImages.map(img => {
//         return img;
//       });
//
//       input.value = '';
//     }
//   }
//
//   clearSelection(): void {
//     this.croppedImages = [];
//     this.imagesChanged.emit(this.croppedImages);
//     if (this.fileInput) this.fileInput.nativeElement.value = '';
//   }
//
//   triggerFileInput(): void {
//     if (this.fileInput) this.fileInput.nativeElement.click();
//   }
// }

import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
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
  @Input() showImageSelectBtn: boolean = true;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

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
}
