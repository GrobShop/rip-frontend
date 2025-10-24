import {NavLink} from "../interfaces/navlinks.interface";

export const NavLinks: NavLink[] = [
  { id: "categories", title: "Категории", link: '/categories' },
  { id: "favorites", title: "Избранное", link: '/favorites' },
  { id: "cart", title: "Корзина", link: '/cart' },
];


export const AdminNavLinks: NavLink[] = [
  { id: "categories-control", title: "Категории", link: '/categories-controls', icon: 'assets/icons/nav/category-icon.svg'},
  { id: "partners-control", title: "Партнеры", link: '/partners-controls', icon: 'assets/icons/nav/partners-icon.svg'},
  { id: "products-control", title: "Товары", link: '/products-controls', icon: 'assets/icons/nav/products-icon.svg' },
];
