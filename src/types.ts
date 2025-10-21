import type { ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export interface ISheetRow {
  name: string
  price: string
}
