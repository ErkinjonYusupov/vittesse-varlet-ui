import type { UserModule } from '~/types'
import Varlet from '@varlet/ui'

// Setup Pinia
// https://pinia.vuejs.org/
export const install: UserModule = ({ app }) => {
  app.use(Varlet)
}
