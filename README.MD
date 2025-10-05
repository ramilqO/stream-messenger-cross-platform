---

```md
# Core-Driven Messenger Architecture

Архитектура и базовый каркас для кроссплатформенных приложений (мессенджеров, социальных сервисов, realtime-систем), построенных на принципах **чистой архитектуры**, **Domain-Driven Design** и **реактивного взаимодействия** модулей.

---

## 1. Идея

Цель проекта — отделить бизнес-логику и модель данных от UI-фреймворка.  
React, React Native, Vue или другой рендерер здесь рассматриваются как “тонкий слой отображения”, а не как место, где решаются задачи домена.

Core живёт отдельно, предоставляет публичное API через фасады и общается между модулями через реактивную шину событий (`RxEventBus`).

---

## 2. Структура проекта

```

/core
/kernel # ядро системы (DI, EventBus)
/modules/messaging # пример доменного модуля
/modules/user
/modules/notification
/modules/sync-network
bootstrap.ts # сборка runtime и регистрация модулей

/app
/runtime # React-контекст с runtime и фасадами
/ui # экраны, компоненты

```

**Kernel** содержит минимум инфраструктуры, необходимой всем модулям:

- `DomainEvent` — базовый класс событий;
- `IEventBus` / `RxEventBus` — реактивная шина pub/sub;
- `CoreRuntime` — контейнер зависимостей и точка регистрации модулей.

---

## 3. Жизненный цикл приложения

1. При старте (`App.tsx` или `index.tsx`) создаётся общий `CoreRuntime`.
2. В runtime регистрируются доменные модули (`UserModule`, `MessageModule` и т.д.).
3. Каждый модуль регистрирует свои use-case, сервисы, репозитории и подписки на события.
4. UI получает доступ к фасадам, которые предоставляют простое API для бизнес-операций.

---

## 4. Messaging Module — пример

```

/core/messaging
/domain
entities/Message.ts
events/MessageSentEvent.ts
/application
useCases/SendMessageUseCase.ts
interfaces/IMessageRepository.ts
/infrastructure
MessageRepositoryInMemory.ts
facade.ts
module.ts

```

**Domain** — чистые сущности и события, не зависящие от платформы.
**Application** — use case-ы, координирующие доменные объекты и инфраструктуру.
**Infrastructure** — реализации репозиториев (in-memory, REST, WebSocket и т.д.).
**Facade** — публичное API, с которым работает UI.

---

## 5. EventBus и реактивность

Все модули общаются через `RxEventBus`.
Это реактивная шина, основанная на `rxjs.Subject`, с фильтрацией событий по имени.
Например:

```ts
await eventBus.publish(new MessageSentEvent(message));
```

Любой модуль может подписаться:

```ts
eventBus.subscribe("MessageSent", (event) => {
  // например, NotificationModule показывает уведомление
});
```

Так достигается слабая связанность и возможность подключать/отключать модули без изменений остального кода.

---

## 6. Работа с CoreRuntime

```ts
import { createAppRuntime } from "@/core/bootstrap";
import { createMessagingFacade } from "@/core/messaging/facade";

export const runtime = createAppRuntime();
export const messaging = createMessagingFacade(runtime);
```

Runtime создаётся **один раз** при запуске и хранит:

- контейнер зависимостей (`tsyringe`);
- event-bus;
- зарегистрированные модули и их состояние.

---

## 7. Пример интеграции в React / React Native

```tsx
// App.tsx
import { RuntimeProvider } from "@/app/runtime/runtimeProvider";
import { ChatScreen } from "@/app/ui/screens/ChatScreen";

export default function App() {
  return (
    <RuntimeProvider>
      <ChatScreen />
    </RuntimeProvider>
  );
}
```

```tsx
// ChatScreen.tsx
import { useApp } from "@/app/runtime/runtimeProvider";

export function ChatScreen() {
  const { messaging } = useApp();
  const [messages, setMessages] = useState(messaging.getAllMessages());

  useEffect(() => {
    const unsub = messaging.onMessageSent((m) => setMessages((p) => [...p, m]));
    return unsub;
  }, [messaging]);

  return (
    <>
      {messages.map((m) => (
        <div key={m.id}>{m.content}</div>
      ))}
      <button onClick={() => messaging.sendMessage("chat", "me", "Привет!")}>
        Отправить
      </button>
    </>
  );
}
```

---

## 8. Масштабирование

- Каждый модуль автономен и может быть вынесен в отдельный пакет.
- UI может быть web, mobile, desktop — core остаётся тем же.
- Можно заменять репозитории (in-memory → API / SQLite) без изменения use case-ов.
- Добавление нового модуля — только регистрация в `bootstrap.ts`.

---

## 9. Потенциал для open-source

Архитектура подойдёт для:

- Realtime-мессенджеров;
- Систем уведомлений и событий;
- Offline-first приложений;
- Любых проектов, где важна модульность и реактивность.

---

## 10. Планы и развитие

- [ ] Добавить NotificationModule и SyncNetworkModule;
- [ ] Реализовать persistent-repository (IndexedDB / SQLite);
- [ ] Примеры интеграции с WebSocket / REST API;
- [ ] CLI-генератор модулей;
- [ ] Тесты use case-ов и событий.

---

## 11. Лицензия

MIT
Автор архитектуры придерживается принципа: _“UI — это лишь способ взглянуть на домен.”_
