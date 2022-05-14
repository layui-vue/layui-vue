import { LayIcon as Component } from "@layui/icons-vue";
import { withInstall, WithInstallType } from "../../utils";

const component: WithInstallType<typeof Component> = withInstall(Component);
export default component;
