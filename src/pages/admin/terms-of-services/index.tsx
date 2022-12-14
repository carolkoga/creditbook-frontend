import { useState } from 'react';
import { toast } from 'react-toastify';

import { termsService } from '@services/creditbook/support/term';

import { Section } from '@components/Section';
import { RIchTextEditor } from '@components/pages/admin/RIchTextEditor';
// import { TermsParams } from '@type/creditbook/support/term';
import { GetServerSideProps } from 'next';

export default function TermsOfServices({ terms }: any) {
  // const [terms, setTerms] = useState<TermsParams>({ content: '', id: '' });
  const [loading, setLoading] = useState(false);

  // const loadTerms = useCallback(async () => {
  //   const { data } = await termsService.getTerms();
  //   setTerms(data);
  //   console.log(data);
  // }, []);

  // useEffect(() => {
  //   loadTerms();
  // }, [loadTerms]);

  async function handleCreateNewTerm(content: string) {
    try {
      setLoading(true);
      await termsService.createTerms({
        content,
        id: terms.id,
      });
      toast.success('Termos de uso atualizado');
      // loadTerms();
    } catch {
      toast.error('Aconteceu algum erro');
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
        defaultValue={terms.content}
        value={terms.content}
        buttonProps={{
          isLoading: loading,
        }}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const terms = { content: '', id: '' };
  try {
    const { data } = await termsService.getTerms();
    Object.assign(terms, data);
  // eslint-disable-next-line no-empty
  } catch {}

  return {
    props: {
      terms,
    },
  };
};
