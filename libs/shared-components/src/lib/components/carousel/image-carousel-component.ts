import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'lib-image-carousel-component',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './image-carousel-component.html',
  styleUrl: './image-carousel-component.css',
  standalone: true
})
export class ImageCarouselComponent {
  @Input() images: string[] = [];
  currentIndex = 0;
  imageError = false;

  nextImage() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
      this.imageError = false;
    }
  }

  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.imageError = false;
    }
  }

  goToImage(index: number) {
    this.currentIndex = index;
    this.imageError = false;
  }

  handleImageError() {
    this.imageError = true;
  }
}
