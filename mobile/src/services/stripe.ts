import { initStripe } from "@stripe/stripe-react-native";

export const initializeStripe = async () => {
  await initStripe({
    publishableKey: "YOUR_STRIPE_PUBLISHABLE_KEY",
    merchantIdentifier: "merchant.com.ecocharge", // optional
  });
};

export const paymentService = {
  async createPaymentIntent(amount: number) {
    // This would typically call a cloud function
    // For now, return a mock response
    console.log("Create payment intent for", amount);
    return { clientSecret: "MOCK_CLIENT_SECRET" };
  },
};
