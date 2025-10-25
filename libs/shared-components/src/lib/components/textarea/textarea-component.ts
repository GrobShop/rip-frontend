import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ClipboardService} from "../../services/clipboard.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'lib-textarea-component',
  imports: [
    NgIf
  ],
  templateUrl: './textarea-component.html',
  styleUrl: './textarea-component.css',
  standalone: true
})
export class TextareaComponent {
  @Input() width: string = '312px';
  @Input() height: string = '100px'; // Начальная высота для textarea
  @Input() placeholderText: string = '';
  @Input() icon: string = '';
  @Input() copyBtn: boolean = false;
  @Input() labelText: string = '';
  @Input() value: string = '';

  @Output() valueChange = new EventEmitter<string>();

  inputValue: string = '';

  @ViewChild('textareaElement') textareaElement!: ElementRef<HTMLTextAreaElement>;

  constructor(private copyService: ClipboardService) {}

  get adaptedWidth(): string {
    return this.width ? `clamp(200px, ${this.width}, 400px)` : 'clamp(200px, 312px, 400px)';
  }

  get adaptedHeight(): string {
    return this.height ? `clamp(80px, ${this.height}, 200px)` : 'clamp(80px, 100px, 200px)';
  }

  async copyValue() {
    const value = this.textareaElement.nativeElement.value;
    if (value) {
      await this.copyService.copyToClipboard(value);
    }
  }

  onInputChange(event: Event) {
    this.inputValue = (event.target as HTMLTextAreaElement).value;
    this.valueChange.emit(this.inputValue);
  }
}
