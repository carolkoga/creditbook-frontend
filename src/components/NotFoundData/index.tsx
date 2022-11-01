/* eslint-disable react/destructuring-assignment */
import { Button } from '@components/Button';
import { Direction } from '@components/Direction';
import { Section } from '@components/Section';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

interface LinkAction {
  reloadPage: false,
  href: string,
  labelButton: string,
}

interface IReloadPage {
  reloadPage: true,
}

type UnionTypes = LinkAction | IReloadPage;

export type NotFoundDataProps = UnionTypes & {
  title: string,
  children?: ReactNode,
}

export default function NotFoundData(props: NotFoundDataProps) {
  const router = useRouter();

  function handleRouting() {
    if (props.reloadPage) {
      router.reload();
    } else {
      router.push(props.href);
    }
  }

  return (
    <Direction alignItems="center">
      <Section.Title as="h1" textColor="dark">
        {props.title}
      </Section.Title>

      <Image
        src="/assets/images/errors/no-data.svg"
        alt={props.title}
        width="581px"
        height="483px"
      />

      {(!props.children && !props.reloadPage) && (
        <Button onClick={handleRouting} size="outline-filled-round">
          {props.labelButton}
        </Button>
      )}

      {(!props.children && props.reloadPage) && (
        <Button onClick={handleRouting} size="outline-filled-round">Tentar Novamente</Button>
      )}

      {props.children}
    </Direction>
  );
}

NotFoundData.defaultProps = {
  children: null,
};
