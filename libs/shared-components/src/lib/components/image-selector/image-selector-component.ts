import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ImageCarouselComponent} from "../carousel/image-carousel-component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'lib-image-selector-component',
  imports: [
    ImageCarouselComponent,
    NgIf
  ],
  templateUrl: './image-selector-component.html',
  styleUrl: './image-selector-component.css',
  standalone: true
})
export class ImageSelectorComponent {
  @Input() multiple: boolean = false; // Позволяет выбрать одно или несколько изображений
  @Input() selectedImages: string[] = []; // Текущие выбранные изображения
  @Output() imagesChanged = new EventEmitter<string[]>(); // Эмитит обновлённый массив изображений

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  croppedImages: string[] = [];

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);
      const allowedImages = files.filter(file => file.type.startsWith('image/'));
      if (allowedImages.length === 0) {
        alert('Пожалуйста, выберите изображения.');
        return;
      }

      const maxFiles = this.multiple ? allowedImages.length : 1;
      const selectedFiles = allowedImages.slice(0, maxFiles);

      this.croppedImages = selectedFiles.map(file => URL.createObjectURL(file));
      this.imagesChanged.emit(this.croppedImages);

      this.croppedImages = this.croppedImages.map(img => {
        return img;
      });

      input.value = '';
    }
  }

  clearSelection(): void {
    this.croppedImages = [];
    this.imagesChanged.emit(this.croppedImages);
    if (this.fileInput) this.fileInput.nativeElement.value = '';
  }

  triggerFileInput(): void {
    if (this.fileInput) this.fileInput.nativeElement.click();
  }
}
