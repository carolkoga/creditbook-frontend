import { creditbookApi } from '@api/creditbookApi';
import Loader from '@components/Loader';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {
  useCallback, useEffect, useState,
} from 'react';
import { toast } from 'react-toastify';
import { SetupPaymentForm } from './SetupPaymentForm';

const stripePromise = loadStripe('pk_live_51NhdIIH8PxgHFSdOarmTEkBIQl6IwC4dQD7UULqzbEsrRUxmX7BXUYV8PK4TtQ97KmbXbFzLCM3kHNSy3eJZDQgK00LyfVuGaB');

type IProps = {
  onNewCard: any
};

export function CollectPayment({ onNewCard }: IProps) {
  const [secret, setSecret] = useState('');

  const getSecret = useCallback(async () => {
    const response = await creditbookApi.get('/payment/secret');

    if (response.status > 199 && response.status < 300) {
      setSecret(response.data?.client_secret);
    } else {
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
        <SetupPaymentForm onNewCard={onNewCard} />
      </Elements>
      )}

      {!secret && (
      <div className="pd-4">
        <Loader loading />
      </div>
      )}
    </>
  );
}
