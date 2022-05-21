declare const usePopper: {
    createPopper(el: HTMLElement, props: any, trigger: string): void;
    renderPopper(props: any): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
};
export default usePopper;
