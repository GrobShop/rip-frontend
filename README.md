# RipShop
- `admin` — панель управления
- `standard` — клиентское приложение

---

## Установка и запуск
```bash
# 1. Клонируем репозиторий
git clone https://github.com/your-org/rip-shop.git
```
```bash
# 2. Переходим в директорию проекта
cd rip-shop
```
```bash
# 3. Устанавливаем зависимости
npm install
```

```bash
# 4. Запускаем административную панель
npx nx serve admin      
```

```bash
# 5. Запускаем клиентское приложение
npx nx serve standard     
```

```bash
Полезные команды
npx nx build admin      # Сборка админки
npx nx build standard   # Сборка клиента

npx nx graph            # Граф зависимостей
npx nx list             # Список плагинов


Структура
apps/
  admin/      → Админ-панель
  standard/   → Публичное приложение
libs/
  shared-components/ → Общие интерфейсы, сервисы, утилиты
```
