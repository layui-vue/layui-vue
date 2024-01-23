import container from "markdown-it-container";
import type Token from "markdown-it/lib/token";
import menus from "../view/utils/menus";
type ContainerArgs = [
  typeof container,
  string,
  {
    render(tokens: Token[], idx: number): string;
  }
];

export default function createContainer(klass: string): ContainerArgs {
  return [
    container,
    klass,
    {
      render(tokens, idx) {
        const token = tokens[idx];
        const info = token.info.trim().slice(klass.length).trim();
        const menusChild = menus.map((item) => item.children).flat(1);
        let prevIndex = 0;
        let nextIndex = 0;
        menusChild.forEach((item, index) => {
          if (item.subTitle === info) {
            prevIndex = index - 1;
            nextIndex = index + 1;
          }
        });
        if (token.nesting === 1) {
          return `<div style="display: flex; justify-content: space-between; margin-top:20px;">
                <div><router-link to="${
                  menusChild[prevIndex]?.path
                }" class="lay-link" style="display: ${
            prevIndex < 0 ? "none" : ""
          }"> <lay-icon type="layui-icon-left"/>${
            menusChild[prevIndex]?.title
          }</router-link></div>
                    <div><router-link to="${
                      menusChild[nextIndex]?.path
                    }" class="lay-link" style="display: ${
            nextIndex >= menusChild.length ? "none" : ""
          }">${
            menusChild[nextIndex]?.title
          } <lay-icon type="layui-icon-right"/></router-link> </div>
                </div>`;
        } else {
          return ``;
        }
      },
    },
  ];
}
