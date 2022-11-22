import { GetServerSideProps } from 'next';

import { FAQService } from '@services/creditbook/support/faq';

import {
  AccordionContainer, AccordionContent, AccordionItem, AccordionTrigger,
} from '@components/Accordion';
import WrapperSupport from '@components/pages/support/WrapperSupport';
import { Section } from '@components/Section';

import { AccordionList } from '@styles/AccordionList';
import { translationSectionFAQ } from '@mocks/FAQ';
import { FAQResponseType } from '@type/creditbook/support/faq';

interface ServerSideProps {
  questions: FAQResponseType | null,
}

export default function FAQ({ questions }: ServerSideProps) {
  return (
    <WrapperSupport>
      <Section.Container style={{ width: '100%' }}>
        {!questions && (
          <Section.Title>
            Não há termos de uso
          </Section.Title>
        )}
        {questions?.faq.map((faq) => (
          <AccordionList.Container key={faq.section}>
            <Section.Title textColor="dark">
              {translationSectionFAQ[faq.section]}
            </Section.Title>
            <AccordionList.Wrapper>
              <AccordionContainer type="single" collapsible>
                {faq.questions.map((question) => (
                  <AccordionList.Content key={question.id}>
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

export const getServerSideProps: GetServerSideProps = async () => {
  let questionList = null;
  try {
    const response = await FAQService.listAllFAQs();
    questionList = response.data;
  } catch {
    console.error('Happened an error');
  }

  return {
    props: {
      questions: questionList,
    },
  };
};
