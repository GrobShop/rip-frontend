import {Component, EnvironmentInjector, Input} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {NavLink} from "../../interfaces/navlinks.interface";
import {ConfirmModalService} from "../../services/modals/confirm-modal.service";

@Component({
  selector: 'lib-nav-links-component',
  imports: [
    RouterLink,
    NgForOf,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './nav-links-component.html',
  styleUrl: './nav-links-component.css',
  standalone: true
})
export class NavLinksComponent {
  @Input() links: NavLink[] = [];

  constructor(private injector: EnvironmentInjector) {
  }

  async onClickItem(item: NavLink) {
    if(item.id !== 'quit'){return;}
    const confirm = await ConfirmModalService.createConfirmModal(this.injector, '', `Вы уверены, что хотите выйти"?`);
    if(!confirm){return;}
    if(item.id === 'quit'){
      localStorage.clear();
      setTimeout(() => location.reload(), 100);
    }
  }
}
