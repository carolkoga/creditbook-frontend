/* eslint-disable react/no-danger */
import { GetServerSideProps } from 'next';
import WrapperSupport from '@components/pages/support/WrapperSupport';
import { Section } from '@components/Section';
import { termsService } from '@services/creditbook/support/term';
import { TermsParams } from '@type/creditbook/support/term';

interface IProps {
  terms: TermsParams,
}

export default function TermsOfService({ terms: { content } }: IProps) {
  return (
    <WrapperSupport>
      <Section.Container>
        <div
          className="ql-container ql-snow"
          style={{
            border: 'none',
          }}
        >
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </Section.Container>
    </WrapperSupport>
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
