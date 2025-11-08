import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'lib-fullscreen-viewer-component',
  imports: [
    NgIf
  ],
  templateUrl: './fullscreen-viewer-component.html',
  styleUrl: './fullscreen-viewer-component.css',
  standalone: true
})
export class FullscreenViewerComponent {
  @Input() images: string[] = [];
  @Input() currentIndex = 0;
  @Output() close = new EventEmitter();
  @Output() prev = new EventEmitter();
  @Output() next = new EventEmitter();
  @Output() zoom = new EventEmitter<number>();
  @Output() reset = new EventEmitter();
  @Output() rotateLeft = new EventEmitter();
  @Output() rotateRight = new EventEmitter();

  scale = 1; rotate = 0; tx = 0; ty = 0;
  private startX = 0; private startY = 0; private startScale = 1; private startDist = 0;
  private swipeStartX = 0; private swipeThreshold = 50;

  @ViewChild('img') img!: ElementRef<HTMLImageElement>;

  ngOnDestroy() {
    document.body.style.overflow = '';
  }

  onBackdropClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('fs-backdrop')) {
      this.close.emit();
    }
  }

  onDown(e: PointerEvent) {
    e.preventDefault();
    this.img.nativeElement.setPointerCapture(e.pointerId);
    this.startX = e.clientX - this.tx;
    this.startY = e.clientY - this.ty;
    this.swipeStartX = e.clientX;

    if (e.pointerType === 'touch' && (e as any).touches.length === 2) {
      const t = (e as any).touches;
      this.startDist = Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
      this.startScale = this.scale;
    }
  }

  onMove(e: PointerEvent) {
    if (!this.img.nativeElement.hasPointerCapture(e.pointerId)) return;
    e.preventDefault();

    if ((e as any).touches?.length === 2) {
      const t = (e as any).touches;
      const dist = Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
      this.scale = Math.max(0.5, Math.min(5, this.startScale * (dist / this.startDist)));
    } else {
      this.tx = e.clientX - this.startX;
      this.ty = e.clientY - this.startY;
    }
  }

  onUp(e: PointerEvent) {
    const deltaX = e.clientX - this.swipeStartX;
    if (Math.abs(deltaX) > this.swipeThreshold && this.scale <= 1) {
      deltaX > 0 ? this.prev.emit() : this.next.emit();
    }
  }
}
