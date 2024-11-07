import { Button, Checkbox, Flex, Input, Select, Skeleton, Space, Table, Tree, TreeProps, Typography } from "antd"
import { ALL_CLASSSES } from "../../../app/apollo/tree";
import { useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { ClassesTypes, CurrentClassType } from "./types";
import classes from './styles.module.scss';
import cn from 'classnames';
import findTree from "../../../app/utils/find-tree";
import { useNavigate } from "react-router-dom";

export const ClassesPage: React.FC = () => {
  const { data, error, loading }  = useQuery<ClassesTypes>(ALL_CLASSSES);
  const [currentClass, setCurrentClass] = useState<CurrentClassType | undefined>(undefined);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['24473']);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [selectValueAppended, setSelectValueAppended] = useState();
  const [selectValueLibary, setSelectValueLibary] = useState();
  const navigate = useNavigate();

  const dataSource = [
    {
      key: '1',
      name: 'Давление номинальное',
      default: '-',
      units: '-'
    },
    {
      key: '2',
      name: 'Пожаробезопасный',
      default: '-',
      units: '-'
    },
    {
      key: '3',
      name: 'Температура среды',
      default: '-',
      units: '-'
    },
    {
      key: '4',
      name: 'Функциональный признак прибора',
      default: '-',
      units: '-'
    },
  ]

  const columns = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Значение по умолчанию',
      dataIndex: 'default',
      key: 'default',
    },
    {
      title: 'Единица измерения',
      dataIndex: 'units',
      key: 'units',
    },
  ]

  const onExpand: TreeProps['onExpand'] = (expandedKeysValue) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onOpenAll = () => {
    if (data && data.modelTreeClasses && data.modelTreeClasses.tree) {
      const keys: React.Key[] = [];
      data.modelTreeClasses.tree.forEach((item) => {
        keys.push(item.key)
        if (item.children) {
          item.children.forEach((child) => {
            keys.push(child.key)
            if (child.children) {
              child.children.forEach((grandChild) => {
                keys.push(grandChild.key)
              })
            }
          })
        }
      })
      setExpandedKeys(keys);
    }
  }

  const onCloseAll = () => {
    setExpandedKeys([]);
  }

  const onSelect: TreeProps['onSelect'] = (selectedKeysValue, info) => {
    setCurrentClass(info.selectedNodes[0])
    setSelectedKeys(selectedKeysValue);
  };
    
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const defaultData = data?.modelTreeClasses?.tree;
    if (defaultData) {
      const res: React.Key[] = [];
      const newExpandedKeys = findTree(value, defaultData, res);
      setExpandedKeys(newExpandedKeys);
      setAutoExpandParent(true);
    }
    setSearchValue(value);
  };

  const handleSubmitSearch = () => {
    const defaultData = data?.modelTreeClasses?.tree;
    if (defaultData) {
      const res: React.Key[] = [];
      const newExpandedKeys = findTree(searchValue, defaultData, res);
      setExpandedKeys(newExpandedKeys);
      setAutoExpandParent(true);
    }
  }

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

  useEffect(() => {
    if (error?.message === "Unauthenticated.") {
      navigate('/login')
    }
  }, [error])

  console.log(data);
  
  return (
    <div className={cn(classes.wrapper)}>
      <aside className={cn(classes.aside)}>
        <Space direction="vertical">
          <Typography.Title level={4}>Классы</Typography.Title>
          <Space>
            <Button onClick={onCloseAll}>Свернуть все</Button>
            <Button onClick={onOpenAll}>Развернуть все</Button>
          </Space>
        </Space>
        <div className={cn(classes.tree)}>
          {loading ? 
            Array(5).fill('').map(() => (
              <Skeleton active={true} />
            ))
          :
            <Tree
              selectedKeys={selectedKeys}
              expandedKeys={expandedKeys}
              checkable
              treeData={treeData}
              onExpand={onExpand}
              onSelect={onSelect}
              autoExpandParent={autoExpandParent}
            />
          }
        </div>
      </aside>
      <main>
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
        <Typography.Title level={4}>Описание</Typography.Title>
        <Input.TextArea autoSize={{ maxRows: 4, minRows: 4 }} value={currentClass?.description} />
        <Typography.Title level={4}>Свойства</Typography.Title>
        <Table pagination={false} columns={columns} dataSource={dataSource} />
        <Typography.Title level={4}>Связи</Typography.Title>
        <Space style={{borderBottom: '1px solid #d9d9d9', width: '100%', padding: '0 0 10px 0'}} direction="vertical">
          <Checkbox>Название класса</Checkbox>
        </Space>
      </main>
    </div>
  )
}