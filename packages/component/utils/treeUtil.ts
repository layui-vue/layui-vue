import { ReplaceFieldsOptions } from "../component/tree/tree.type";

/**
 * 根据 id 查找节点
 *
 * @param root 目标集合
 * @param id   节点编号
 * @param replaceFields   自定义字段集合
 */
export function getNode(
  root: any,
  id: string,
  replaceFields: ReplaceFieldsOptions
) {
  const { id: idKey, children } = replaceFields;
  let resultNode = null;
  findNode(root, id);
  function findNode(root: any, id: string) {
    if (!!root) {
      const type = Object.prototype.toString.call(root);
      if (type === "[object Object]") {
        if (root[idKey] && root[idKey] === id) {
          resultNode = root;
        } else {
          const node = root[children] || null;
          findNode(node, id);
        }
      } else if (type === "[object Array]") {
        const needNode = root.find((i: any) => !!i === true && i[idKey] === id);
        if (!!needNode) {
          resultNode = needNode;
        } else {
          if (root.length) {
            root.forEach((item: any) => {
              if (item && item[children]) {
                const node = item[children];
                if (node && node.length) {
                  findNode(node, id);
                }
              }
            });
          }
        }
      }
    }
  }
  return resultNode;
}
