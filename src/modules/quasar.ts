import type { UserModule } from '~/types'
import { Dark, Dialog, Loading, Notify, Quasar } from 'quasar'

export const install: UserModule = ({ app }) => {
  app.use(Quasar, {
    plugins: {
      Notify,
      Dialog,
      Loading,
      Dark,
    },
    config: {
      notify: {
        position: 'top-right',
      },
    },
  })
}
