export class UiEvent {
    constructor(public readonly type: string) {}
}

// Примеры UI-событий (можно добавлять по мере необходимости)
export class ShowToastEvent extends UiEvent {
    readonly type = 'ShowToastEvent'
    constructor(
        public message: string,
        public severity: 'info' | 'success' | 'error' = 'info',
    ) {
        super('ShowToastEvent')
    }
}

export class NavigateToEvent extends UiEvent {
    readonly type = 'NavigateToEvent'
    constructor(public path: string) {
        super('NavigateToEvent')
    }
}

export class PlaySoundEvent extends UiEvent {
    readonly type = 'PlaySoundEvent'
    constructor(public sound: 'message' | 'notification') {
        super('PlaySoundEvent')
    }
}

type UiEventHandler<T extends UiEvent = UiEvent> = (event: T) => void

class UiEventBus {
    private target = new EventTarget()

    publish(event: UiEvent): void {
        this.target.dispatchEvent(new CustomEvent(event.type, { detail: event }))
    }

    subscribe<T extends UiEvent>(eventType: string, handler: UiEventHandler<T>): () => void {
        const listener = (e: Event) => {
            handler((e as CustomEvent).detail as T)
        }
        this.target.addEventListener(eventType, listener)
        return () => this.target.removeEventListener(eventType, listener)
    }
}

export const uiEventBus = new UiEventBus()
