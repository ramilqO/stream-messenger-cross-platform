import { useEffect } from 'react'

import { ShowToastEvent, uiEventBus } from '../lib/uiEventBus'

export const ToastListener = () => {
    useEffect(() => {
        const unsub = uiEventBus.subscribe('ShowToastEvent', (event: ShowToastEvent) => {
            // Здесь можно интегрироваться с любой библиотекой тостов (например, react-toastify)
            console.log(`[Toast] ${event.severity}: ${event.message}`)
            // Пример: toast[event.severity](event.message);
        })
        return unsub
    }, [])

    return null
}
