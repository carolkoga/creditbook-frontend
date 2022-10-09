import { List } from 'phosphor-react';
import { Button, Drawer } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Nav } from './styled';
import TopicsMenu, { TopicProps } from '../TopicsMenu';

interface IProps {
  menu: TopicProps[]
}

export default function NavBarAdmin({ menu }: IProps) {
  const [visible, setVisible] = useState(false);

  function handleShowDrawer() {
    setVisible(true);
  }

  function handleCloseDrawer() {
    setVisible(false);
  }

  return (
    <Nav>
      <Button
        type="default"
        className="menu__button"
        icon={<List weight="bold" size={24} />}
        onClick={handleShowDrawer}
      />

      <Drawer
        title="Painel do Admin"
        placement="left"
        onClose={handleCloseDrawer}
        open={visible}

      >
        <TopicsMenu topics={menu} />
      </Drawer>

      <Link href="/admin/manage-announcements">
        <a>
          <Image
            width="150px"
            height="35px"
            layout="intrinsic"
            src="/assets/images/logo.svg"
          />
        </a>
      </Link>
    </Nav>
  );
}
