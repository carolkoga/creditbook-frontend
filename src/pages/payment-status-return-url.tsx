import PaymentStatus from '@components/CollectPayment/PaymentStatus';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51NhdIIH8PxgHFSdOstUviuPjs4SH1RdIpos4QlYhdaPahJxaLERXDkV367VF5FlLU7MKqXTwmog7xdXqll12AfZI008dfLL8l0');

export default function PaymentStatusPage() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentStatus />
    </Elements>
  );
}
