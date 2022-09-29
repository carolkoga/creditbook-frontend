import { setupAPIClient } from '@api/creditbookApi';
import {
  AccordionContainer, AccordionContent, AccordionItem, AccordionTrigger,
} from '@components/Accordion';
import WrapperSupport from '@components/pages/support/WrapperSupport';
import { Section } from '@components/Section';
import { FaqService } from '@services/creditbook/support/faq';
import { AccordionList } from '@styles/AccordionList';
import { GetServerSideProps } from 'next';

const translationSectionFAQ: any = {
  creditbook: 'Creditbook',
  vendaCompraDireitosCreditoórios: 'Venda e Compra de Direitos Creditórios',
  anuncio: 'Anúncio',
  usuarios: 'Usuários',
  lotes: 'Lotes',
  custos: 'Custos',
  outrasPerguntasFrequentes: 'Outras Perguntas Frequentes',
};

export default function FAQ({ questions }: any) {
  return (
    <WrapperSupport>
      <Section.Container style={{ width: '100%' }}>
        {questions?.faq?.map((faq: any) => (
          <AccordionList.Container key={faq.section}>
            <Section.Title textColor="dark">
              {translationSectionFAQ[faq.section]}
            </Section.Title>
            <AccordionList.Wrapper>
              <AccordionContainer type="single" collapsible>
                {faq.questions.map((question: any) => (
                  <AccordionList.Content key={question.title}>
                    <AccordionItem value={question.title}>
                      <AccordionTrigger>
                        {question.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        {question.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </AccordionList.Content>
                ))}
              </AccordionContainer>
            </AccordionList.Wrapper>
          </AccordionList.Container>
        ))}
      </Section.Container>
    </WrapperSupport>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const api = setupAPIClient(req.cookies['nextauth.token']);
  const faqService = new FaqService(api);
  const { data } = await faqService.listAllFAQs();

  return {
    props: {
      questions: data,
    },
  };
};
