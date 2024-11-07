import { DataNode } from "antd/es/tree"

export interface ClassesTypes {
  modelTreeClasses: {
    tree: [
      {
        key: string,
        title: string,
        children: [
          {
            key: string,
            title: string,
            children: [
              {
                key: string,
                title: string,
                children: [
                  {
                    key: string,
                    title: string
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}

export interface CurrentClassType extends DataNode {
  description?: string
}