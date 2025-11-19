// import {Component, Input} from '@angular/core';
// import {NgForOf, NgIf} from "@angular/common";
//
// @Component({
//   selector: 'lib-image-carousel-component',
//   imports: [
//     NgIf,
//     NgForOf
//   ],
//   templateUrl: './image-carousel-component.html',
//   styleUrl: './image-carousel-component.css',
//   standalone: true
// })
// export class ImageCarouselComponent {
//   @Input() images: string[] = [];
//   currentIndex = 0;
//   imageError = false;
//
//   nextImage() {
//     if (this.currentIndex < this.images.length - 1) {
//       this.currentIndex++;
//       this.imageError = false;
//     }
//   }
//
//   prevImage() {
//     if (this.currentIndex > 0) {
//       this.currentIndex--;
//       this.imageError = false;
//     }
//   }
//
//   goToImage(index: number) {
//     this.currentIndex = index;
//     this.imageError = false;
//   }
//
//   handleImageError() {
//     this.imageError = true;
//   }
// }


import { Component, Input, HostListener, ElementRef, ViewChild } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";
import {FullscreenService} from "../../services/fullscreen.service";

@Component({
  selector: 'lib-image-carousel-component',
  imports: [NgIf, NgForOf],
  templateUrl: './image-carousel-component.html',
  styleUrl: './image-carousel-component.css',
  standalone: true
})
export class ImageCarouselComponent {
  @Input() images: string[] = [];
  currentIndex = 0;
  imageError = false;

  // === Полноэкранный режим ===
  isFullscreen = false;
  scale = 1;
  rotate = 0;
  translateX = 0;
  translateY = 0;

  private startX = 0;
  private startY = 0;
  private startScale = 1;
  private startDistance = 0;

  @ViewChild('fullscreenImage') fullscreenImage!: ElementRef<HTMLImageElement>;

  constructor(private fs: FullscreenService) {}

  // === Навигация ===
  nextImage() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
      this.imageError = false;
      this.resetTransform();
    }
  }

  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.imageError = false;
      this.resetTransform();
    }
  }

  goToImage(index: number) {
    this.currentIndex = index;
    this.imageError = false;
    this.resetTransform();
  }

  handleImageError() {
    this.imageError = true;
  }

  // === Полноэкранный режим ===
  openFullscreen() {
    if(this.images[0] !== ''){
      this.isFullscreen = true;
      this.resetTransform();
      document.body.style.overflow = 'hidden';
    }
  }

  closeFullscreen() {
    this.isFullscreen = false;
    document.body.style.overflow = '';
    this.resetTransform();
  }

  resetTransform() {
    this.scale = 1;
    this.rotate = 0;
    this.translateX = 0;
    this.translateY = 0;
  }

  // === Жесты (Touch + Mouse) ===
  onPointerDown(e: PointerEvent) {
    if (!this.isFullscreen) return;
    e.preventDefault();

    const img = this.fullscreenImage.nativeElement;
    img.setPointerCapture(e.pointerId);

    this.startX = e.clientX - this.translateX;
    this.startY = e.clientY - this.translateY;

    if (e.pointerType === 'touch' && (e as any).touches?.length === 2) {
      const touches = (e as any).touches;
      this.startDistance = Math.hypot(
        touches[0].clientX - touches[1].clientX,
        touches[0].clientY - touches[1].clientY
      );
      this.startScale = this.scale;
    }
  }

  onPointerMove(e: PointerEvent) {
    if (!this.isFullscreen || !this.fullscreenImage?.nativeElement?.hasPointerCapture(e.pointerId)) return;
    e.preventDefault();

    if ((e as any).touches?.length === 2) {
      // Pinch to zoom
      const touches = (e as any).touches;
      const distance = Math.hypot(
        touches[0].clientX - touches[1].clientX,
        touches[0].clientY - touches[1].clientY
      );
      this.scale = Math.max(0.5, Math.min(5, this.startScale * (distance / this.startDistance)));
    } else {
      // Drag
      this.translateX = e.clientX - this.startX;
      this.translateY = e.clientY - this.startY;
    }
  }

  // === Кнопки управления ===
  zoomIn() {
    this.scale = Math.min(5, this.scale + 0.5);
  }

  zoomOut() {
    this.scale = Math.max(0.5, this.scale - 0.5);
  }

  rotateLeft() {
    this.rotate -= 90;
  }

  rotateRight() {
    this.rotate += 90;
  }

  // // === Закрытие по ESC ===
  // @HostListener('document:keydown.escape', ['$event'])
  // onEscape(e: KeyboardEvent) {
  //   if (this.isFullscreen) {
  //     this.closeFullscreen();
  //   }
  // }

  // === Закрытие по клику вне изображения ===
  onBackdropClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('fullscreen-backdrop')) {
      this.closeFullscreen();
    }
  }
}
