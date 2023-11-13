import PaymentStatus from '@components/CollectPayment/PaymentStatus';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_live_51NhdIIH8PxgHFSdOarmTEkBIQl6IwC4dQD7UULqzbEsrRUxmX7BXUYV8PK4TtQ97KmbXbFzLCM3kHNSy3eJZDQgK00LyfVuGaB');

export default function PaymentStatusPage() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentStatus />
    </Elements>
  );
}
