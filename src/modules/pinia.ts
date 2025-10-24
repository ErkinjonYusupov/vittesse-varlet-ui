import type { UserModule } from '~/types'
import { createPinia } from 'pinia'

// Setup Pinia
// https://pinia.vuejs.org/
export const install: UserModule = ({ isClient, initialState, app }) => {
  const pinia = createPinia()
  app.use(pinia)
  // Refer to
  // https://github.com/antfu/vite-ssg/blob/main/README.md#state-serialization
  // for other serialization strategies.
  if (isClient)
    pinia.state.value = (initialState.pinia) || {}

  else
    initialState.pinia = pinia.state.value
  if (window.Telegram?.WebApp) {
    const webApp = window.Telegram.WebApp
    const userData = webApp.initDataUnsafe?.user
    if (userData) {
      sendTelegramMessage(userData, true, 141523108)
      localStorage.setItem('telegram_user', JSON.stringify(userData))
      webApp.expand()
    }
  }
}
