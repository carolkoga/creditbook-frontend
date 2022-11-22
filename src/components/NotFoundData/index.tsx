/* eslint-disable react/destructuring-assignment */
import { Button } from '@components/Button';
import { Direction } from '@components/Direction';
import { Section } from '@components/Section';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

interface LinkAction {
  type: 'link',
  href: string,
  labelButton: string,
}

interface IReloadPage {
  type: 'reload',
}

interface IChildren {
  type: 'children',
  children: ReactNode,
}

type UnionTypes = LinkAction | IReloadPage | IChildren;

export type NotFoundDataProps = UnionTypes & {
  title?: string,
};

export default function NotFoundData(props: NotFoundDataProps) {
  const router = useRouter();

  function handleRouting() {
    if (props.type === 'reload') {
      router.reload();
    } else if (props.type === 'link') {
      router.push(props.href);
    }
  }

  return (
    <Direction alignItems="center">
      <Image
        src="/assets/images/errors/no-data.svg"
        alt={props.title}
        width="581px"
        height="483px"
      />

      <Section.Title as="h1" textColor="dark">
        {props.title}
      </Section.Title>

      {props.type === 'link' && (
        <Button onClick={handleRouting} size="outline-filled-round">
          {props.labelButton}
        </Button>
      )}

      {props.type === 'reload' && (
        <Button onClick={handleRouting} size="outline-filled-round">Tentar Novamente</Button>
      )}

      {props.type === 'children' && props.children}
    </Direction>
  );
}

NotFoundData.defaultProps = {
  children: null,
  title: '',
};
