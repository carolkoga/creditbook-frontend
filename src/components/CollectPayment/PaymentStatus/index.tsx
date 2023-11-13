/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
import { useState, useEffect, useContext } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
// import { paymentServices } from '@services/creditbook/payments';
import { AuthContext } from '@context/AuthContext';
import { paymentServices } from '@services/creditbook/payments';
// import { useRouter } from 'next/router';

export default function PaymentStatus() {
  const stripe = useStripe();
  const [message, setMessage] = useState('');
  const { user } = useContext(AuthContext);
  // const router = useRouter();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Retrieve the "setup_intent_client_secret" query parameter appended to
    // your return_url by Stripe.js
    const urlSearchParams = new URLSearchParams(window.location.search);

    const clientSecret = urlSearchParams.get(
      'setup_intent_client_secret',
    );

    // Retrieve the SetupIntent
    stripe
      .retrieveSetupIntent(clientSecret!)
      .then(async ({ setupIntent }) => {
        // Inspect the SetupIntent `status` to indicate the status of the payment
        // to your customer.
        //
        // Some payment methods will [immediately succeed or fail][0] upon
        // confirmation, while others will first enter a `processing` state.
        //
        // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
        switch (setupIntent!.status) {
          case 'succeeded':

            paymentServices.createPaymentMethod(
              { paymentMethodId: setupIntent?.payment_method as string, userId: user.id as string },
            ).then(({ status }) => {
              if (status < 200 || status > 299) {
                setMessage('Algo deu errado, seu método de pagamento não foi salvo');
              } else {
                setMessage('Tudo certo, seu método de pagamento foi salvo com sucesso');
              }
            });

            break;

          case 'processing':
            setMessage('Processando os detalhes de seu pagamento, logo você será atualizado!');
            break;

          case 'requires_payment_method':
            // Redirect your user back to your payment page to attempt collecting
            // payment again
            setMessage('Falha ao processar os dados, tente um outro método de pagamento!');
            break;
        }
      });

    // router.back();
  }, [stripe]);

  return (
    <h1>
      {message}
    </h1>
  );
}
