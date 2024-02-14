import { Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
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
  const router = useRouter();
  const [currentRouteSelected, setCurrentRouteSelected] = useState(topics[0].link);

  useEffect(() => {
    setCurrentRouteSelected(router.pathname);
  }, [router.pathname]);

  return (
    <Menu mode="inline" selectedKeys={[currentRouteSelected]}>
      {topics.map((topic) => (
        // eslint-disable-next-line react/no-array-index-key
        <Menu.Item
          key={topic.link}
          onClick={() => setCurrentRouteSelected(topic.link)}
        >
          <Link legacyBehavior href={topic.link}>
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
