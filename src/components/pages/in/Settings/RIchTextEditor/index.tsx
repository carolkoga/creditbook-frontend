import { Button, IPropsCommon } from '@components/Button';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { ReactQuillProps } from 'react-quill';
import { Container, WrapperEditor } from './styled';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface IProps extends ReactQuillProps {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: string | unknown) => void,
  // eslint-disable-next-line react/require-default-props
  buttonProps?: Omit<IPropsCommon, 'children'>,
}

export function RIchTextEditor({ onSubmit, buttonProps, ...props }: IProps) {
  const [termsText, setTermsText] = useState(props.defaultValue ?? '');
  const module = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ link: true }],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      [{ align: [false, 'right', 'center', 'justify'] }],
    ],
  };
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
    'link', 'align',
  ];

  function handleChangeTermsText(texting: string | never) {
    setTermsText(texting);
  }

  return (
    <Container>
      <WrapperEditor>
        <ReactQuill
          {...props}
          theme="snow"
          value={termsText}
          onChange={handleChangeTermsText}
          modules={module}
          formats={formats}
        />
      </WrapperEditor>

      <div className="actions">
        <Button
          size="outline-filled-round"
          onClick={() => onSubmit(termsText)}
          {...buttonProps}
        >
          {buttonProps?.isLoading && 'Salvando'}
          {!buttonProps?.isLoading && 'Salvar'}
        </Button>
      </div>
    </Container>
  );
}
