import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'lib-header-description-component',
  imports: [
    NgIf
  ],
  templateUrl: './header-description-component.html',
  styleUrl: './header-description-component.css',
  standalone: true
})
export class HeaderDescriptionComponent {
  @Input() title: string = '';
  @Input() description: string = '';
}
