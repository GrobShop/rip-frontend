import {Component, Input} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'lib-toast-component',
  imports: [
    NgClass,
    NgIf
  ],
  templateUrl: './toast-component.html',
  styleUrl: './toast-component.css',
  standalone: true
})
export class ToastComponent {
  @Input() type: 'success' | 'warning' | 'danger' = 'success';
  @Input() title?: string;
  @Input() description?: string;
  @Input() duration: number = 3000;

  isVisible = true;

  ngOnInit() {
    setTimeout(() => {
      this.isVisible = false;
    }, this.duration);
  }
}
