import { Menu } from 'antd';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { Route } from './styled';

export interface TopicProps {
  link: string,
  label: string,
  icon?: ReactNode,
}

interface IProps {
  topics: TopicProps[]
}

export default function TopicsMenu({ topics }: IProps) {
  const [currentRouteSelected, setCurrentRouteSelected] = useState('0');

  return (
    <Menu mode="inline" selectedKeys={[currentRouteSelected]}>
      {topics.map((topic, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Menu.Item key={index} onClick={() => setCurrentRouteSelected(index.toString())}>
          <Link href={topic.link}>
            <Route>
              {topic?.icon && (
                <div className="wrapper__icon">
                  {topic.icon}
                </div>
              )}
              {topic.label}
            </Route>
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
}
