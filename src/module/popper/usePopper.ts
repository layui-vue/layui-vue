import { h, render} from "vue";
import popper from "./index.vue";
import { once } from "../../tools/domUtil";
const EVENT_MAP : any = {
    'hover': 'mouseenter',
    'click': 'click'
}
const usePopper = {
    createPopper(el: HTMLElement, props: any, trigger : string) {
        const _this = this;
        once(el, EVENT_MAP[trigger], () => {
            const _props = {...props};
            _props.el = el;
            _this.renderPopper(_props);
        })
    },
    renderPopper(props: any) {
        const container: HTMLDivElement = document.createElement("div");
        // container.setAttribute("class", "lay-div");
        const node = h(popper, props);
        render(h(popper, props), container);
        container.firstElementChild && document.body.appendChild(container.firstElementChild);
        return node;
    }
} 
export default usePopper;