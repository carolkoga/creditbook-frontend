/* eslint-disable no-nested-ternary */
import dynamic from 'next/dynamic';
import {
  AccordionContainer, AccordionContent, AccordionItem,
} from '@components/Accordion';

import { Button } from '@components/Button';
import { StructureSettings } from '@components/pages/in/Settings/StructureSettings';
import { Section } from '@components/Section';
import { Direction } from '@components/Direction';
import { useState } from 'react';
import FAQForm from '@components/pages/in/Settings/FAQ/FAQForm';
import { FaqService, FAQService } from '@services/creditbook/support/faq';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';
import { GetServerSideProps } from 'next';
import { setupAPIClient } from '@api/creditbookApi';
import AlertModal from '@components/AlertModal';
import { AccordionList } from '@styles/AccordionList';

const AccordionTriggerSetting = dynamic(() => import('@components/pages/in/Settings/FAQ/AccordionTriggerSetting'), { ssr: false });

const translationSectionFAQ: any = {
  creditbook: 'Creditbook',
  vendaCompraDireitosCreditoórios: 'Venda e Compra de Direitos Creditórios',
  anuncio: 'Anúncio',
  usuarios: 'Usuários',
  lotes: 'Lotes',
  custos: 'Custos',
  outrasPerguntasFrequentes: 'Outras Perguntas Frequentes',
};

interface QuestionResponseType {
  title: string,
  answer: string,
}

interface FAQResponseType {
  faq: {
    section: string,
    questions: QuestionResponseType[]
  }[]
}

interface IProps {
  questions: FAQResponseType;
}

type QuestionBeignParams = QuestionResponseType & { section: string };

export default function FAQ({ questions }: IProps) {
  const [newFAQIsVisible, setNewFAQIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line max-len
  const [questionBeignEdited, setQuestionBeignEdited] = useState<null | QuestionBeignParams>(null);
  const [questionIdBeignDeleted, setQuestionIdBeignDeleted] = useState<null | string>(null);

  function handleOpenModalNewFAQ() {
    setNewFAQIsVisible(true);
  }

  function handleCloseModalNewFAQ() {
    setQuestionBeignEdited(null);
    setNewFAQIsVisible(false);
  }

  function handleOpenModalEditFAQ(question: QuestionBeignParams) {
    setQuestionBeignEdited(question);
    setNewFAQIsVisible(true);
  }

  function handleOpenModalDeletedtFAQ(questionID: string) {
    setQuestionIdBeignDeleted(questionID);
  }

  function handleCloseModalDeletedtFAQ() {
    setQuestionIdBeignDeleted(null);
  }

  async function handleRegisterNewFAQ(data: any) {
    try {
      setLoading(true);
      await FAQService.storeFAQ(data);
      setNewFAQIsVisible(false);
    } catch (error) {
      handleCatchErrorRequest(error as any);
    } finally {
      setLoading(false);
    }
  } return (
    <StructureSettings>
      <Section.Header>
        <Direction direction="horizontal" alignItems="center">
          <Section.Title as="h1">Perguntas Frequentes</Section.Title>
          <Button variant="secondary" onClick={handleOpenModalNewFAQ}>
            Nova Pergunta
          </Button>
        </Direction>
      </Section.Header>

      <Section.Container>
        {questions?.faq?.map((faq) => (
          <AccordionList.Container key={faq.section}>
            <Section.Title>
              {translationSectionFAQ[faq.section]}
            </Section.Title>
            <AccordionList.Wrapper>
              <AccordionContainer type="single" collapsible>
                {faq.questions.map((question) => (
                  <AccordionList.Content key={question.title}>
                    <AccordionItem value={question.title}>
                      <AccordionTriggerSetting
                        onEdit={() => (
                          handleOpenModalEditFAQ({ ...question, section: faq.section })
                        )}
                        onDelete={() => handleOpenModalDeletedtFAQ(question.title)}
                      >
                        {question.title}
                      </AccordionTriggerSetting>
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

      {questionBeignEdited && (
        <FAQForm
          title="Editar Pergunta"
          isVisible={newFAQIsVisible}
          labelConfirm={!loading ? 'Atualizar' : 'Atualizando'}
          onCancelForm={handleCloseModalNewFAQ}
          onConfirmForm={handleRegisterNewFAQ}
          isLoading={loading}
          defaultValues={{
            question: questionBeignEdited.title,
            answer: questionBeignEdited.answer,
            section: {
              label: translationSectionFAQ[questionBeignEdited.section],
              value: questionBeignEdited.section,
            },
          }}
        />
      )}

      <AlertModal
        title="Você realmente deseja remover essa pergunta?"
        isVisible={!!questionIdBeignDeleted}
        type="danger"
        cancel={{
          label: 'Cancelar',
          onCancelButton: handleCloseModalDeletedtFAQ,
        }}
        confirm={{
          label: 'Sim, Deletar!',
          onConfirmButton: () => {},
        }}
        isLoading={loading}
      />

      {!questionBeignEdited && (
        <FAQForm
          title="Nova Pergunta"
          isVisible={newFAQIsVisible}
          labelConfirm={!loading ? 'Adicionar' : 'Adicionando'}
          onCancelForm={handleCloseModalNewFAQ}
          onConfirmForm={handleRegisterNewFAQ}
          isLoading={loading}
        />
      )}

    </StructureSettings>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const api = setupAPIClient(req.cookies['nextauth.token']);
  const faqService = new FaqService(api);
  const { data } = await faqService.listAllFAQs();
  console.log(data.faq.questions);

  return {
    props: {
      questions: data,
    },
  };
};

/*
  <AccordionContainer type="single" defaultValue="quem-nos-somos" collapsible>
    <AccordionItem value="quem-nos-somos?">
      <AccordionTriggerSetting
        onEdit={() => {}}
        onDelete={() => {}}
      >
        Quem nós somos?
      </AccordionTriggerSetting>
      <AccordionContent>
        Somos credit
      </AccordionContent>
    </AccordionItem>
  </AccordionContainer>
*/
