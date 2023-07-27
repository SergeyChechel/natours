import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51NWP2KD4ESFX5QzFVmGjXJofB85T3TuOOwY5sOy4fdTh3LryMpeJ8kjfasdmt20QwRC8tV7n4l5o16ymLvzi8ymZ00adQxeywe'
);

export const bookTour = async (tourId) => {
  try {
    // 1. Get checkout sessoin from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2.Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err);
  }
};
