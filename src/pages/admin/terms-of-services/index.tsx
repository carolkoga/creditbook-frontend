import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { toast } from 'react-toastify';

import { termsService } from '@services/creditbook/support/term';

import { Section } from '@components/Section';
import { RIchTextEditor } from '@components/pages/admin/RIchTextEditor';

import { TermsParams } from '@type/creditbook/support/term';

interface IProps {
  terms: TermsParams,
}

export default function TermsOfServices({ terms }: IProps) {
  const [initialTermContent] = useState<string>(terms.content);
  const [loading, setLoading] = useState(false);

  async function handleCreateNewTerm(content: string) {
    try {
      setLoading(true);
      await termsService.createTerms({
        content,
        id: terms.id,
      });
      toast.success('Termos de uso atualizado');
    } catch (error) {
      handleCreateNewTerm(error as any);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Section.Header>
        <Section.Title as="h1" textColor="dark">Termos de Uso</Section.Title>
      </Section.Header>

      <RIchTextEditor
        onSubmit={(contentTerm) => handleCreateNewTerm(contentTerm as string)}
        defaultValue={initialTermContent}
        buttonProps={{
          isLoading: loading,
        }}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await termsService.getTerms();

  return {
    props: {
      terms: data,
    },
  };
};
