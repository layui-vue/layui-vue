import type { App, DefineComponent, Ref } from 'vue';
export declare type StringObject = Record<string, unknown>;
export declare type UnknownObject = Record<string | number, unknown>;
export declare type UnknownFunction = (...arg: unknown[]) => unknown;
export declare type IDefineComponent<Props = UnknownObject> = DefineComponent<Props> & {
    install: (app: App, options?: InstallOptions) => void;
};
export interface InstallOptions extends StringObject {
    pagination?: null;
    menu?: null;
}
export declare type Nullable<T> = T | null;
export declare type MaybeRef<T> = Ref<T> | T;
export declare type Recordable = Record<string, any>;
