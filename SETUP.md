# Monorepo Setup Guide (pnpm + Turborepo)

Этот документ закрепляет финальную и корректную структуру монорепозитория с использованием **pnpm**, **Turborepo**, общей конфигурационной папки **configs/** и минимальным количеством файлов в корне.

---

# Общая концепция
Монорепозиторий состоит из:

- `apps/` — приложения (web, mobile, desktop)
- `packages/` — внутренние библиотеки (например, core)
- `configs/` — глобальные конфиги
- корень репо — только минимальные файлы-переадресации для инструментов

pnpm использует **единый node_modules в корне**, а все остальные пакеты получают **только symlink'и**.

---

# Структура монорепозитория
```
.
├── apps/
│   ├── stream-web/
│   ├── stream-mobile/
│   └── stream-desktop/
│
├── packages/
│   └── core/
│
├── configs/
│   ├── eslint.config.js
│   ├── pnpm-workspace.yaml
│   ├── tsconfig.base.json
│   ├── prettier.config.js
│   └── ...
│
├── package.json          
├── tsconfig.json         # proxy (extends ./configs/tsconfig.base.json)
├── eslint.config.js      # proxy (require('./configs/...'))
├── pnpm-workspace.yaml   # proxy (extends configs/...)
├── prettier.config.js    # proxy
├── pnpm-lock.yaml
└── node_modules/         # единственные реальные node_modules
```

---

# Корневой `package.json`
Корень хранит только **глобальные dev-зависимости** и команду turborepo.

```json
{
  "name": "stream-messenger",
  "version": "0.1.0",
  "private": true,
  "packageManager": "pnpm@9",
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "clean": "turbo run clean"
  },
  "devDependencies": {
    "turbo": "^2.0.0",
    "typescript": "^5.8.3",
    "eslint": "^9.0.0",
    "@typescript-eslint/parser": "^7.0.0",
    "@typescript-eslint/eslint-plugin": "^7.0.0",
    "eslint-plugin-import": "^2.32.0",
    "eslint-plugin-unused-imports": "^4.3.0",
    "eslint-plugin-simple-import-sort": "^12.1.1",
    "eslint-config-prettier": "^10.1.0",
    "prettier": "^3.6.0"
  }
}
```

---

# Принцип конфигураций
## configs хранит:
- `eslint.config.js` — глобальная конфигурация
- `tsconfig.base.json` — общая TS-база
- `pnpm-workspace.yaml` — список workspace-пакетов
- `turbo.json` — pipeline turborepo

## корень хранит только «тонкие экспортные файлы»:
**Корневой `pnpm-workspace.yaml`:**
```yaml
extends: "./configs/pnpm-workspace.yaml"
```

**Корневой turbo.json:**
```json
{
  "extends": "./configs/turbo.json"
}
```

**Корневой tsconfig.json:**
```json
{
  "extends": "./configs/tsconfig.base.json"
}
```

**Корневой eslint.config.js:**
```js
module.exports = require("./configs/eslint.config.js");
```

---

# Стратегия зависимостей
### 1. **root**
Хранит:
- Typescript
- ESLint
- Prettier
- Turborepo
- любые shared devDeps

Корень — никак НЕ хранит app-specific зависимости.

---

### 2. `packages/core`
Хранит только runtime-зависимости core:

```json
{
  "name": "@your/core",
  "version": "0.1.0",
  "type": "module",
  "main": "dist/index.cjs",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "dependencies": {
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.1",
    "tsyringe": "^4.7.0"
  }
}
```

---

### 3. Приложения в `apps/`
Каждый app содержит только **свои runtime и dev зависимости**.

### Пример: apps/web/package.json
```json
{
  "name": "stream-web",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1"
  },
  "devDependencies": {
    "vite": "^7.1.2",
    "@vitejs/plugin-react": "^5.0.0"
  }
}
```

### Важно:
!!! **никаких eslint/ts в apps/** (только при необходимости — обязательно с наследованием из корня)

---

# Установка зависимостей
## Внутри apps и packages:
### Добавить зависимость:
```sh
cd apps/web
pnpm add axios
```

### Добавить dev-зависимость:
```sh
pnpm add -D vite
```

pnpm создаст только ссылку в apps/web/node_modules, настоящие файлы будут в корне.

## Добавить общие devDeps в root:
```sh
pnpm add -w -D typescript
```