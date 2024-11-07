import { CurrentClassType } from "../../pages/classes-page/ui/types";

const findTree = (value: string, tree: CurrentClassType[], res: React.Key[]): React.Key[] => {
  for (const node of tree) {
    if (node.title) {
      const title = node.title as string;
      if (title.indexOf(value) > -1) {
        res.push(node.key);
      }
    }
    if (node.children) {
      findTree(value, node.children, res);
    }
  }
  return res;
};

export default findTree