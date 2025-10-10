import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'lib-logo',
  imports: [
    NgIf
  ],
  templateUrl: './logo.html',
  styleUrl: './logo.css',
  standalone: true
})
export class Logo {
  @Input() color: string = '#FFFFFF';
  @Input() annotationText: string = '';
}
