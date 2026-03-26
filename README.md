# EcoCharge - EV Charging for the Eco-Conscious

EcoCharge is a React Native mobile application built with Expo that helps EV drivers find charging stations powered by clean energy.

## Features (Phase 1 - Core MVP)
- **Onboarding**: 3-slide community impact overview.
- **Authentication**: Email/Password and Google Sign-In (Template).
- **Map Interface**: Live map with custom markers based on clean energy percentage.
- **Station Details**: Real-time port availability, pricing, and community tips.
- **Active Session**: Real-time CO₂ savings tracker and session summary.
- **Impact Dashboard**: Personal stats, trees saved equivalent, and regional leaderboards.
- **State Management**: Robust state with Zustand.

## Tech Stack
- React Native & Expo (v55+)
- TypeScript
- NativeWind (Tailwind CSS v4)
- Zustand (State Management)
- React Navigation (Bottom Tabs & Stack)
- Firebase (Auth & Firestore)
- React Native Maps
- Stripe (Payments)
- Lucide React Native (Icons)

## Project Structure
```text
src/
├── assets/          # Static assets & icons
├── components/      # Reusable UI components
├── config/          # Firebase & Stripe configuration
├── navigation/      # React Navigation setup
├── screens/         # App screens (Auth & Main)
├── services/        # Firebase & Stripe services
├── store/           # Zustand state stores
├── utils/           # Helper functions & metrics
└── global.css       # Tailwind directives
```

## Setup Instructions

1. **Clone and Install**:
   ```bash
   npm install
   ```

2. **Firebase Setup**:
   - Create a project at [Firebase Console](https://console.firebase.google.com/).
   - Add an Android/iOS app.
   - Update `src/config/firebase.ts` with your credentials.

3. **Stripe Setup**:
   - Get your keys from [Stripe Dashboard](https://dashboard.stripe.com/).
   - Update `src/services/stripe.ts` with your publishable key.

4. **Environment Variables**:
   Create a `.env` file (or use Expo Constants) with:
   - `EXPO_PUBLIC_FIREBASE_API_KEY`
   - `EXPO_PUBLIC_STRIPE_KEY`

5. **Run the App**:
   ```bash
   npm run ios     # For iOS
   npm run android # For Android
   ```

## Development
- **Tailwind**: Styles are handled via NativeWind. Edit `global.css` for custom directives.
- **State**: Use `useAuthStore`, `useStationStore`, and `useSessionStore` for global state.
# EV-App
