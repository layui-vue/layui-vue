import type { App, DefineComponent, Ref } from "vue";

export type StringObject = Record<string, unknown>;

export type UnknownObject = Record<string | number, unknown>;

export type UnknownFunction = (...arg: unknown[]) => unknown;

export type IDefineComponent<Props = UnknownObject> = DefineComponent<Props> & {
  install: (app: App, options?: InstallOptions) => void;
};

export interface InstallOptions extends StringObject {}

export type Nullable<T> = T | null;

export type MaybeRef<T> = Ref<T> | T;

export type Recordable = Record<string, any>;

export type Number = number;

export type String = string;

export type Boolean = boolean;

export type NumberOrString = number | string;

export type BooleanOrString = boolean | string;
