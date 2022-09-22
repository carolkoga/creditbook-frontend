import { validateCNPJ, validateCPF } from 'validations-br';
import * as yup from 'yup';

yup.addMethod(yup.string, 'cpfOrcnpj', function validateCPForCNPJ(messageError?: string) {
  return this.test({
    message: messageError || 'CPF or CNPJ é inválido',
    name: 'CPF or CNPJ is invalid',
    test(value: any) {
      return (
        value.length > 14 ? validateCNPJ(value) : validateCPF(value)
      );
    },
  });
});
