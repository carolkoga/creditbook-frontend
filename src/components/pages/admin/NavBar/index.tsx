import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Drawer } from 'antd';
import { List, Power } from 'phosphor-react';

import useAuth from '@hooks/useAuth';

import { Nav } from './styled';
import TopicsMenu, { TopicProps } from '../TopicsMenu';

interface IProps {
  menu: TopicProps[]
}

export default function NavBarAdmin({ menu }: IProps) {
  const [visible, setVisible] = useState(false);
  const { handleSignOut } = useAuth();

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

      <div className="last__content">
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

        <Button
          type="link"
          icon={<Power weight="bold" size={24} />}
          onClick={handleSignOut}
          title="Logout"
        />
      </div>
    </Nav>
  );
}
