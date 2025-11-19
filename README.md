# Stream Messenger Cross-Platform

Монорепозиторий проекта Stream Messenger, включающий десктопное, мобильное и веб-приложение.

---

## 📁 Структура проекта

```
.
├── apps/                 # Все приложения
│   ├── stream-desktop/
│   ├── stream-mobile/
│   └── stream-web/
├── packages/             # Общие библиотеки
│   └── core/
├── node_modules/
├── package.json          # Корневой пакет
├── pnpm-workspace.yaml   # PNPM workspace
├── tsconfig.base.json
├── tsconfig.json
├── eslint.config.js
├── prettier.config.cjs
├── turbo.json            # Конфигурация Turborepo
└── README.md
```

---

## ⚡ Требования

- Node.js ≥ 20.x  
- PNPM ≥ 8.x  

---

## Установка

1. Клонируем репозиторий:

```bash
git clone https://github.com/ramilqO/stream-messenger-cross-platform.git
cd stream-messenger-cross-platform
```

2. Устанавливаем зависимости через PNPM:

```bash
pnpm install
```

> Все зависимости будут установлены в корне.  
> Пакеты `apps/*` и `packages/*` используют workspace, поэтому свои `node_modules` не нужны.

---

## Запуск приложений

### Веб-приложение

```bash
pnpm --filter stream-web dev
```

### Десктопное приложение

```bash
pnpm --filter stream-desktop dev
```

### Мобильное приложение

```bash
pnpm --filter stream-mobile dev
```

---

## Скрипты

| Скрипт           | Описание |
|-----------------|----------|
| `pnpm dev`       | Запускает все dev-скрипты через Turborepo |
| `pnpm build`     | Строит все пакеты |
| `pnpm lint`      | Запускает ESLint на всех пакетах |
| `pnpm test`      | Запускает тесты (если настроены) |

Все приложения используют корневые конфиги, отдельные конфиги внутри `apps/*` не требуются(опционально, можно добавить их для кастомизации под отдельынй проект)