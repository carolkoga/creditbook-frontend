import { creditbookApi } from '@api/creditbookApi';
import Loader from '@components/Loader';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {
  useCallback, useEffect, useState,
} from 'react';
import { toast } from 'react-toastify';
import { SetupPaymentForm } from './SetupPaymentForm';

const stripePromise = loadStripe('pk_test_51NhdIIH8PxgHFSdOstUviuPjs4SH1RdIpos4QlYhdaPahJxaLERXDkV367VF5FlLU7MKqXTwmog7xdXqll12AfZI008dfLL8l0');

export function CollectPayment() {
  const [secret, setSecret] = useState('');

  const getSecret = useCallback(async () => {
    const response = await creditbookApi.get('/payment/secret');

    console.log(response.data);

    if (response.status > 199 && response.status < 300) {
      setSecret(response.data?.client_secret);
    } else {
      console.log('Response', response.data);
      console.log('Status', response.status);

      toast.error('ocorreu um erro, tente novamente');
    }
  }, []);

  useEffect(() => {
    getSecret();
  }, []);

  return (
    <>
      {secret && (
      <Elements stripe={stripePromise} options={{ clientSecret: secret }}>
        <SetupPaymentForm />
      </Elements>
      )}

      {!secret && <Loader loading />}
    </>
  );
}
