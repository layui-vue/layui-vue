/**
 * 根据 id 查找节点
 *
 * @param root 目标集合
 * @param id   节点编号
 */
export function getNode(root: any, id: string) {
  let resultNode = null;
  findNode(root, id);
  function findNode(root: any, id: string) {
    if (!!root) {
      let type = Object.prototype.toString.call(root);
      if (type === "[object Object]") {
        if (root.id && root.id === id) {
          resultNode = root;
        } else {
          let node = root.children || null;
          findNode(node, id);
        }
      } else if (type === "[object Array]") {
        let needNode = root.find((i: any) => !!i === true && i.id === id);
        if (!!needNode) {
          resultNode = needNode;
        } else {
          if (root.length) {
            root.forEach((item: any) => {
              if (item && item.children) {
                let node = item.children;
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
