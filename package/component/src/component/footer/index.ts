import { withInstall, WithInstallType } from "../../utils";
import Component from "./index.vue";

const component: WithInstallType<typeof Component> = withInstall(Component);
export default component;