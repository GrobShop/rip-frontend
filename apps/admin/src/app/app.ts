import {ApplicationRef, Component, EnvironmentInjector} from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import { NxWelcome } from './nx-welcome';
import {NavBarComponent} from "../../../../libs/shared-components/src/lib/components/nav-bar/nav-bar-component";
import {AdminNavLinks} from "../../../../libs/shared-components/src/lib/data/navlinks";
import {ToastService} from "../../../../libs/shared-components/src/lib/services/notification/toast.service";
import {HttpClientModule} from "@angular/common/http";
import {WishlistService} from "../../../standard/src/services/routes/whislist/whislist.service";
import {WishlistLocalService} from "../../../standard/src/services/routes/whislist/whislist-local.service";

@Component({
  imports: [RouterModule, NavBarComponent, RouterOutlet, HttpClientModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true
})
export class App {
  protected title = 'RIP - Административная панель';
  protected readonly AdminNavLinks = AdminNavLinks;

  constructor(appRef: ApplicationRef, injector: EnvironmentInjector, private wishlistService: WishlistService, private wishlistLocalService: WishlistLocalService) {
    ToastService.initialize(appRef, injector);
    this.startSessionTimer();
    this.setupUnloadCleanup();
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
