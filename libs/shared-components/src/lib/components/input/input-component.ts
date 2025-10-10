import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {NgIf} from "@angular/common";
import {ClipboardService} from "../../services/clipboard.service";

@Component({
  selector: 'lib-input-component',
  imports: [
    NgIf
  ],
  templateUrl: './input-component.html',
  styleUrl: './input-component.css',
  standalone: true
})
export class InputComponent {
  @Input() width: string = '312px';
  @Input() height: string = '40px';
  @Input() placeholderText: string = '';
  @Input() icon: string = '';
  @Input() copyBtn: boolean = false;
  @Input() labelText: string = '';
  @Input() type: string = 'text';

  @ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>;

  constructor(private copyService: ClipboardService) {}

  get adaptedWidth(): string {
    return this.width ? `clamp(200px, ${this.width}, 400px)` : 'clamp(200px, 312px, 400px)';
  }

  get adaptedHeight(): string {
    return this.height ? `clamp(32px, ${this.height}, 48px)` : 'clamp(32px, 40px, 48px)';
  }

  async copyValue() {
    const value = this.inputElement.nativeElement.value;
    if (value) {
      await this.copyService.copyToClipboard(value);
    }
  }
}
