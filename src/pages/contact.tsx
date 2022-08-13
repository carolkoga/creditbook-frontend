import { Button } from '@components/Button/styled';
import FormGroup from '@components/FormGroup';
import { Input, Textarea } from '@components/Input';
import { Form } from '@styles/pages/contact';
import { HeaderSection, Section, TitleSection } from '@styles/pages/home';

import { Select } from '@components/Select';
import { StructureDirection } from '@components/StructureDirection';

const subjectSelectOptions = [
  {
    label: 'Dúvida',
    value: 'doubt',
  },

  {
    label: 'Reclamação',
    value: 'report',
  },

  {
    label: 'Sugestão',
    value: 'suggestion',
  },

  {
    label: 'Quero ser um advogado parceiro',
    value: 'lawyerPartner',
  },

  {
    label: 'Outro',
    value: 'other',
  },
];

export default function Contact() {
  return (
    <StructureDirection>
      <HeaderSection>
        <TitleSection as="h1">Entrar em contato</TitleSection>
      </HeaderSection>

      <Section>
        <Form>
          <FormGroup label={{ title: 'Nome', forId: 'name' }}>
            <Input placeholder="matheus" id="name" />
          </FormGroup>

          <FormGroup label={{ title: 'E-mail', forId: 'email' }}>
            <Input placeholder="contato@mail.com" id="email" type="email" />
          </FormGroup>

          <FormGroup label={{ title: 'Escolha um assunto', forId: 'subject' }}>
            <Select
              options={subjectSelectOptions}
              placeholder="assunto"
              id="subject"
              instanceId="subject"
            />
          </FormGroup>

          <FormGroup label={{ title: 'Telefone', forId: 'phone' }}>
            <Input placeholder="(00) 99764-0098" id="phone" inputMode="numeric" />
          </FormGroup>

          <FormGroup label={{ title: 'Mensagem', forId: 'feedback' }}>
            <Textarea placeholder="Escreva a sua mensagem..." id="feedback" />
          </FormGroup>

          <Button type="submit">Enviar Feedback</Button>
        </Form>
      </Section>
    </StructureDirection>
  );
}
