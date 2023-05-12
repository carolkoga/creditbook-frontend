import {
  ReactNode,
} from 'react';

import { FunnelSimple } from 'phosphor-react';
import { Drawer } from 'antd';

import { Button } from '@components/Button';

import {
  Title, Header,
} from './styled';

interface IProps {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
}

export function FilterDrawer({
  children, isOpen, onClose, onOpen,
}: IProps) {
  return (
    <>
      <Button onClick={onOpen}>Filtro</Button>
      <Drawer
        title={(
          <Header>
            <FunnelSimple weight="bold" size={32} />
            <Title weight={600}>Filtrar</Title>
          </Header>
        )}
        open={isOpen}
        placement="right"
        closable={false}
        key="right"
        onClose={onClose}
      >
        {children}
      </Drawer>
    </>
  );
}

FilterDrawer.defaultProps = {
  customQuery: null,
};
