import {ApplicationRef, Component, EnvironmentInjector} from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import { NxWelcome } from './nx-welcome';
import {Logo} from "@rip-shop/shared-components";
import {
  SwitchThemeComponent
} from "../../../../libs/shared-components/src/lib/components/switch-theme/switch-theme-component";
import {
  HeaderDescriptionComponent
} from "../../../../libs/shared-components/src/lib/components/header-description/header-description-component";
import {NavLinksComponent} from "../../../../libs/shared-components/src/lib/components/nav-links/nav-links-component";
import {HeaderComponent} from "../../../../libs/shared-components/src/lib/components/header/header-component";
import {InputComponent} from "../../../../libs/shared-components/src/lib/components/input/input-component";
import {ButtonComponent} from "../../../../libs/shared-components/src/lib/components/button/button-component";
import {LoginPage} from "../../../../libs/shared-components/src/lib/pages/login-page/login-page";
import {CategoryPage} from "../ui/pages/category-page/category-page";
import {ProductPage} from "../ui/pages/product-page/product-page";
import {FavoritePage} from "../ui/pages/favorite-page/favorite-page";
import {CartPage} from "../ui/pages/cart-page/cart-page";
import {ToastService} from "../../../../libs/shared-components/src/lib/services/notification/toast.service";
import {WishlistService} from "../services/routes/whislist/whislist.service";
import {WishlistLocalService} from "../services/routes/whislist/whislist-local.service";

@Component({
  imports: [NxWelcome, RouterModule, Logo, SwitchThemeComponent, HeaderDescriptionComponent, NavLinksComponent, HeaderComponent, InputComponent, ButtonComponent, LoginPage, CategoryPage, ProductPage, FavoritePage, CartPage, RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true
})
export class App {
  protected title = 'RIP - Магазин';

  constructor(appRef: ApplicationRef, injector: EnvironmentInjector, private wishlistService: WishlistService, private wishlistLocalService: WishlistLocalService) {
    ToastService.initialize(appRef, injector);
    // this.startSessionTimer();
    // this.setupUnloadCleanup();
  }

  private sessionTimer: any = null;
  private readonly SESSION_DURATION = 50 * 60 * 1000; // 50 минут

  /** Запуск жёсткого таймера на 50 минут */
  private startSessionTimer(): void {
    // Очищаем, если вдруг уже есть
    this.clearSessionTimer();

    this.sessionTimer = setTimeout(() => {
      this.expireSession();
    }, this.SESSION_DURATION);

    console.log('Сессия истекает через 50 минут...');
  }

  /** Очистка таймера */
  private clearSessionTimer(): void {
    if (this.sessionTimer) {
      clearTimeout(this.sessionTimer);
      this.sessionTimer = null;
    }
  }

  /** Истечение сессии: очистка + перезагрузка */
  private expireSession(): void {
    console.log('Сессия истекла — очистка и перезагрузка');
    localStorage.clear();
    location.reload();
  }

  /** Очистка localStorage при закрытии вкладки */
  private setupUnloadCleanup(): void {
    const cleanup = () => {
      localStorage.clear();
    };

    window.addEventListener('beforeunload', cleanup);
    window.addEventListener('pagehide', cleanup);
  }

  /** Очистка при уничтожении компонента */
  ngOnDestroy(): void {
    this.clearSessionTimer();
    // Слушатели beforeunload/pagehide автоматически удаляются
  }
}
