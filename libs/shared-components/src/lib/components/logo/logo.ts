import {Component, Input} from '@angular/core';

@Component({
  selector: 'lib-logo',
  imports: [],
  templateUrl: './logo.html',
  styleUrl: './logo.css',
  standalone: true
})
export class Logo {
  @Input() color: string = '#FFFFFF';
}
