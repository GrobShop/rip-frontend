import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AdminNavLinks, NavLinks} from "../../../../libs/shared-components/src/lib/data/navlinks";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardInverse implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = localStorage.getItem('accessToken');

    if (isAuthenticated) {
      // Если пользователь авторизован, перенаправляем его на страницу /chats
      this.router.navigate([NavLinks[0].link]);
      return false;
    }
    return true;
  }
}
