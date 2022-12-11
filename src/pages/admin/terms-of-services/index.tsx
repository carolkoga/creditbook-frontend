import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { termsService } from '@services/creditbook/support/term';

import { Section } from '@components/Section';
import { RIchTextEditor } from '@components/pages/admin/RIchTextEditor';
import { TermsParams } from '@type/creditbook/support/term';

export default function TermsOfServices() {
  const [terms, setTerms] = useState<TermsParams>({ content: '', id: '' });
  const [loading, setLoading] = useState(false);

  const loadTerms = useCallback(async () => {
    const { data } = await termsService.getTerms();
    setTerms(data);
  }, []);

  useEffect(() => {
    loadTerms();
  }, [loadTerms]);

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
        defaultValue={terms.content}
        buttonProps={{
          isLoading: loading,
        }}
      />
    </>
  );
}
