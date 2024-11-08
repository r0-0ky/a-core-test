# С-CORE-TEST 🌱

Fackend application with controled tree  
Link - [Click](http://cutletka.ru:2300/)

## Installation

Yarn

```bash
yarn
yarn dev
```

Npm

```bash
npm i
npm run dev
```
## Stack

[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vite.dev/)

[![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[![Ant design](https://img.shields.io/badge/Ant%20Design-1890FF?style=for-the-badge&logo=antdesign&logoColor=white)](https://ant.design/)

[![Apollo](https://img.shields.io/badge/Apollo%20GraphQL-311C87?&style=for-the-badge&logo=Apollo%20GraphQL&logoColor=white)](https://www.apollographql.com/)

## Cases

- Search input finds all matches and displays them in the tree

```tsx find-tree.ts
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
```
```tsx ClasssesPage.tsx
  const treeData = useMemo(() => {
    const defaultData = data?.modelTreeClasses?.tree;
    if (defaultData) {
      const loop = (data: CurrentClassType[]): CurrentClassType[] =>
        data.map((item) => {
          const strTitle = item.title as string;
          const index = strTitle.indexOf(searchValue);
          const beforeStr = strTitle.substring(0, index);
          const afterStr = strTitle.slice(index + searchValue.length);
          const title =
            index > -1 ? (
              <span key={item.key}>
                {beforeStr}
                <span className={cn(classes['site-tree-search-value'])}>{searchValue}</span>
                {afterStr}
              </span>
            ) : (
              <span key={item.key}>{strTitle}</span>
            );
          if (item.children) {
            return { title, key: item.key, children: loop(item.children), description: item.description };
          }
  
          return {
            title,
            key: item.key,
            description: item.description
          };
        });
        
  
      return loop(defaultData);
    }
  }, [searchValue, data]);
```

### UI libary

For UI I used ant design, which contains a lot of useful ready-made solutions 

```tsx
<Flex gap={'10px'} style={{ margin: '20px 0 0 0'}} align="end" >
    <Space direction="vertical">
        <Typography.Title style={{margin: 0}} level={5}>Присвоенные: </Typography.Title>
        <Select onSelect={(value) => value === selectValueAppended ? setSelectValueAppended(undefined) : setSelectValueAppended(value)} value={selectValueAppended} style={{ width: '200px' }} placeholder='Присвоенные' options={[{ value: 'yes', label: 'Да' }, { value: 'no', label: 'Нет' }]} />
    </Space>
    <Space direction="vertical">
        <Typography.Title style={{margin: 0}} level={5}>В библиотеке: </Typography.Title>
        <Select onSelect={(value) => value === selectValueLibary ? setSelectValueLibary(undefined) : setSelectValueLibary(value)} value={selectValueLibary} style={{ width: '200px' }} placeholder='В библиотеке' options={[{ value: 'yes', label: 'Да' }, { value: 'no', label: 'Нет' }]} />
    </Space>
    <Space style={{width: '100%'}} direction="vertical">
        <Typography.Title style={{margin: 0}} level={5}>Поиск: </Typography.Title>
        <Input.Search onSearch={handleSubmitSearch} value={searchValue} onChange={onChange} placeholder="Найти классы"/>
    </Space>
</Flex>
```