/* eslint-disable no-return-assign */
import {
  ReactNode, useEffect, useState, useRef,
} from 'react';
import ReactDOM from 'react-dom';

interface IProps {
  // eslint-disable-next-line react/require-default-props
  containerId: string,
  children: ReactNode,
}

export default function ReactPortal({ containerId, children }: IProps) {
  const ref = useRef<any>();
  const [mounted, setMounted] = useState(false);

  if (mounted) {
    const alreadyHasElement = document.querySelector(`#${containerId}`);
    if (alreadyHasElement) {
      ref.current = alreadyHasElement;
    } else if (!ref.current) {
      ref.current = document.createElement('div');
      ref.current.setAttribute('id', containerId);
      document.body.appendChild(ref.current);
    }
  }

  useEffect(() => {
    ref.current = document.querySelector(containerId);
    setMounted(true);
  }, [containerId]);

  return mounted ? ReactDOM.createPortal(children, ref.current) : null;
}

ReactPortal.defaultProps = {
  containerId: 'portal-root',
};
