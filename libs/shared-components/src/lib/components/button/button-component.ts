import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'lib-button-component',
  imports: [
    NgIf
  ],
  templateUrl: './button-component.html',
  styleUrl: './button-component.css',
  standalone: true
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() width: string = '170px';
  @Input() height: string = '46px';
  @Input() color: string = '#111111';
  @Input() icon: string = '';

  get adaptedWidth(): string {
    return this.width ? `clamp(120px, ${this.width}, 300px)` : 'clamp(120px, 170px, 300px)';
  }

  get adaptedHeight(): string {
    return this.height ? `clamp(36px, ${this.height}, 56px)` : 'clamp(36px, 46px, 56px)';
  }
}
