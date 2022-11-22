/* eslint-disable react/no-danger */
import { GetServerSideProps } from 'next';
import WrapperSupport from '@components/pages/support/WrapperSupport';
import { Section } from '@components/Section';
import { termsService } from '@services/creditbook/support/term';
import { TermsParams } from '@type/creditbook/support/term';

interface IProps {
  terms: TermsParams | null,
}

export default function TermsOfService({ terms }: IProps) {
  return (
    <WrapperSupport>
      <Section.Container>
        {!terms && (
          <Section.Title>
            Não há termos de uso
          </Section.Title>
        )}
        {terms && (
          <div
            className="ql-container ql-snow"
            style={{
              border: 'none',
            }}
          >
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{ __html: terms.content }}
            />
          </div>
        )}
      </Section.Container>
    </WrapperSupport>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  let terms = null;
  try {
    const response = await termsService.getTerms();
    terms = response.data;
  } catch {
    console.error('Happened an error');
  }

  return {
    props: {
      terms,
    },
  };
};
