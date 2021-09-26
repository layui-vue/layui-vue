import type { App, DefineComponent } from 'vue'
export type StringObject = Record<string, unknown>

export type UnknownObject = Record<string | number, unknown>

export type UnknownFunction = (...arg: unknown[]) => unknown

export type IDefineComponent<Props = UnknownObject> = DefineComponent<Props> & {
  install: (app: App, options?: InstallOptions) => void
}

export interface InstallOptions extends StringObject {
  /** Pagination Attributes */
  pagination?: null
  /** Menu Attributes */
  menu?: null
}