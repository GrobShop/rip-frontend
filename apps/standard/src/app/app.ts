import { Component } from '@angular/core';
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

@Component({
  imports: [NxWelcome, RouterModule, Logo, SwitchThemeComponent, HeaderDescriptionComponent, NavLinksComponent, HeaderComponent, InputComponent, ButtonComponent, LoginPage, CategoryPage, ProductPage, FavoritePage, CartPage, RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true
})
export class App {
  protected title = 'standard';
}
