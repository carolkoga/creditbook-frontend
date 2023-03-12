import { validateCNPJ, validateCPF } from 'validations-br';
import { addMethod, string } from 'yup';

addMethod(string, 'cpfOrcnpj', function validateCPForCNPJ(messageError?: string) {
  return this.test({
    message: messageError || 'CPF/CNPJ inválido',
    name: 'CPF or CNPJ is invalid',
    test(value: string | undefined) {
      if (typeof value === 'string') {
        return value.length > 14 ? validateCNPJ(value) : validateCPF(value);
      }

      return true;
    },
  });
});

addMethod(string, 'validatePassword', function validatePassword() {
  return this
    .test('Least a uppercase letter', 'No mínimo uma letra maiúscula', (value: any) => (/[A-Z]/).test(value))
    .test('Least a non-alphanumeric', 'No mínimo um caracter especial', (value: any) => (/\W/).test(value))
    .test('Least a number', 'No mínimo um número', (value: any) => (/\d/).test(value))
    .min(8, 'Sua senha precisa ter no mínimo 8 caracteres');
});
