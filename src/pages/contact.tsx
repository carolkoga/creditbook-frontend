import { Button } from '@components/Button';
import FormGroup from '@components/FormGroup';
import { Input, Textarea } from '@components/Input';
import { Form } from '@styles/pages/contact';
import { Section } from '@components/Section';

import { Select } from '@components/Select';
import { Direction } from '@components/Direction';

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
    <Direction>
      <Section.Header>
        <Section.Title as="h1">Entrar em contato</Section.Title>
      </Section.Header>

      <Section.Container>
        <Form>
          <FormGroup label={{ title: 'Nome', forId: 'name' }}>
            <Input placeholder=" " id="name" />
          </FormGroup>

          <FormGroup label={{ title: 'E-mail', forId: 'email' }}>
            <Input placeholder=" " id="email" type="email" />
          </FormGroup>

          <FormGroup label={{ title: 'Escolha um assunto', forId: 'subject' }}>
            <Select
              options={subjectSelectOptions}
              placeholder=" "
              id="subject"
              instanceId="subject"
            />
          </FormGroup>

          <FormGroup label={{ title: 'Telefone', forId: 'phone' }}>
            <Input placeholder=" " id="phone" inputMode="numeric" />
          </FormGroup>

          <FormGroup label={{ title: 'Mensagem', forId: 'feedback' }}>
            <Textarea placeholder=" " id="feedback" />
          </FormGroup>

          <Button type="submit">Enviar Feedback</Button>
        </Form>
      </Section.Container>
    </Direction>
  );
}
