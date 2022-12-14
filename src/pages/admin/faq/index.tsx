/* eslint-disable no-nested-ternary */
import dynamic from 'next/dynamic';
import {
  AccordionContainer, AccordionContent, AccordionItem,
} from '@components/Accordion';

import { Button } from '@components/Button';
import { Section } from '@components/Section';
import { Direction } from '@components/Direction';
import { useCallback, useEffect, useState } from 'react';
import FAQForm from '@components/pages/admin/FAQ/FAQForm';
import { FAQService } from '@services/creditbook/support/faq';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';
import AlertModal from '@components/AlertModal';
import { AccordionList } from '@styles/AccordionList';
import { translationSectionFAQ } from '@mocks/FAQ';
import { FAQResponseType, QuestionResponseType, SectionFaqParams } from '@type/creditbook/support/faq';
import NotFoundData from '@components/NotFoundData';
import { toast } from 'react-toastify';

const AccordionTriggerSetting = dynamic(() => import('@components/pages/admin/FAQ/AccordionTriggerSetting'), { ssr: false });

type QuestionBeingParams = QuestionResponseType & { section: keyof SectionFaqParams };

export default function FAQ() {
  const [newFAQIsVisible, setNewFAQIsVisible] = useState(false);
  const [questions, setQuestions] = useState({ faq: [] } as FAQResponseType);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line max-len
  const [questionBeingEdited, setQuestionBeignEdited] = useState<QuestionBeingParams | null>(null!);
  const [questionIdBeignDeleted, setQuestionIdBeignDeleted] = useState(null as string | any);
  const loadQuestions = useCallback(async () => {
    try {
      const { data } = await FAQService.listAllFAQs();
      setQuestions(data);
    } catch {
      toast.error('Aconteceu um erro no servidor');
    }
  }, []);

  function handleOpenModalNewFAQ() {
    setNewFAQIsVisible(true);
  }

  function handleCloseModalNewFAQ() {
    setNewFAQIsVisible(false);
  }

  function handleOpenModalEditFAQ(question: QuestionBeingParams) {
    setQuestionBeignEdited(question);
    setNewFAQIsVisible(true);
  }

  function handleCloseModalEditFAQ() {
    setQuestionBeignEdited(null);
    setNewFAQIsVisible(false);
  }

  function handleOpenModalDeletedtFAQ(questionID: string) {
    setQuestionIdBeignDeleted(questionID);
  }

  function handleCloseModalDeletedtFAQ() {
    setQuestionIdBeignDeleted(null);
  }

  async function handleDeleteQuestionById() {
    try {
      setLoading(true);
      await FAQService.delete(questionIdBeignDeleted as string);
      loadQuestions();
      setQuestionIdBeignDeleted(null);
    } catch (error) {
      handleCatchErrorRequest(error as any);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateQuestionById(data: any) {
    try {
      setLoading(true);
      await FAQService.update(data, questionBeingEdited?.id as string);
      await loadQuestions();
      setNewFAQIsVisible(false);
      setQuestionBeignEdited(null);
    } catch (error) {
      handleCatchErrorRequest(error as any);
    } finally {
      setLoading(false);
    }
  }

  async function handleRegisterNewFAQ(data: any) {
    try {
      setLoading(true);
      await FAQService.storeFAQ(data);
      await loadQuestions();
      setNewFAQIsVisible(false);
    } catch (error) {
      handleCatchErrorRequest(error as any);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  return (
    <>
      <Section.Header>
        <Direction direction="horizontal" alignItems="center">
          <Section.Title as="h1" textColor="dark" style={{ marginBottom: 0 }}>
            Perguntas Frequentes
          </Section.Title>
          <Button variant="secondary" onClick={handleOpenModalNewFAQ}>
            Nova Pergunta
          </Button>
        </Direction>
      </Section.Header>

      <Section.Container>
        {questions.faq.length > 0 && questions.faq.map((faq) => (
          <AccordionList.Container key={faq.section}>
            <Section.Title>
              {translationSectionFAQ[faq.section]}
            </Section.Title>
            <AccordionList.Wrapper>
              <AccordionContainer type="single" collapsible>
                {faq.questions.map((question) => (
                  <AccordionList.Content key={question.id}>
                    <AccordionItem value={question.title}>
                      <AccordionTriggerSetting
                        onEdit={() => (
                          handleOpenModalEditFAQ({ ...question, section: faq.section })
                        )}
                        onDelete={() => handleOpenModalDeletedtFAQ(question.id)}
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

        {questions.faq.length <= 0 && (
          <NotFoundData
            title="Nenhuma pergunta cadastrada ainda"
            type="children"
          >
            <Button size="large" onClick={handleOpenModalNewFAQ}>
              Criar Pergunta
            </Button>
          </NotFoundData>
        )}
      </Section.Container>

      {questionBeingEdited && (
        <FAQForm
          title="Editar Pergunta"
          isVisible={newFAQIsVisible}
          labelConfirm={!loading ? 'Atualizar' : 'Atualizando'}
          onCancelForm={handleCloseModalEditFAQ}
          onConfirmForm={handleUpdateQuestionById}
          isLoading={loading}
          defaultValues={{
            title: questionBeingEdited.title,
            answer: questionBeingEdited.answer,
            section: {
              label: translationSectionFAQ[questionBeingEdited?.section],
              value: questionBeingEdited.section,
            },
          }}
        />
      )}

      {!questionBeingEdited && (
        <FAQForm
          title="Nova Pergunta"
          isVisible={newFAQIsVisible}
          labelConfirm={!loading ? 'Adicionar' : 'Adicionando'}
          onCancelForm={handleCloseModalNewFAQ}
          onConfirmForm={handleRegisterNewFAQ}
          isLoading={loading}
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
          onConfirmButton: handleDeleteQuestionById,
        }}
        isLoading={loading}
      />

    </>
  );
}
