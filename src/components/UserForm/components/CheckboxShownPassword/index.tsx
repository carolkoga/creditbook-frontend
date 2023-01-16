import { Container } from './styled';

interface CheckboxShownPasswordProps {
  isShownPassword: 'text' | 'password',
  onToggleShownPassword: (value: 'text' | 'password') => void
}

export default function CheckboxShownPassword({
  isShownPassword,
  onToggleShownPassword,
}: CheckboxShownPasswordProps) {
  return (
    <Container htmlFor="shown-password" onChange={(e: any) => onToggleShownPassword(e.target!.checked ? 'text' : 'password')}>
      <input type="checkbox" id="shown-password" />
      <small>
        {isShownPassword === 'password' ? 'Mostrar' : 'Esconder'} a senha
      </small>
    </Container>
  );
}
