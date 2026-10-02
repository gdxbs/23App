# Restaurant Management & Dining App

A cross-platform React Native application built with **Expo**, **Expo Router**, and **TypeScript**, powered by **Supabase** backend services. The application provides a seamless dining experience including menu browsing, cart & ordering, table reservations, in-app chat, and interactive games.

---

## Features

- **Restaurant Discovery**: Browse and search available restaurants with customized cards and interactive carousels.
- **Menu & Cart**:
  - View restaurant menus organized by category.
  - Customize item orders and manage items in your cart.
- **Table Reservations**: Book table reservations for specific dates, times, and party sizes.
- **In-App Chat**: Interactive messaging system for real-time customer support or inquiries.
- **Interactive Mini-Games**: Built-in games to entertain users while waiting for orders or reservations.
- **Backend Integration**: Real-time database management and authentication using Supabase.

---

## Tech Stack

- **Framework**: React Native with [Expo](https://expo.dev/)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based navigation)
- **Language**: TypeScript
- **Backend & Database**: [Supabase](https://supabase.com/)
- **Icons & UI**: React Native Vector Icons / Lucide & Tailwind / Custom Styled Components

---

## Repository Structure

```text
├── assets/                  # App images, splash screens, and favicons
└── src/
    ├── app/                 # Expo Router file-based pages
    │   ├── index.tsx        # Restaurant selection / Home screen
    │   └── [restaurantId]/  # Dynamic route per restaurant
    │       ├── index.tsx    # Restaurant detail home
    │       ├── menu.tsx     # Menu view
    │       ├── cart.tsx     # Shopping cart and checkout
    │       ├── reservations.tsx # Reservation booking screen
    │       ├── chat.tsx     # In-app chat interface
    │       └── game.tsx     # Wait-time mini-game
    ├── components/          # Reusable UI components (Cards, Carousels)
    ├── constants/           # Color palettes and global design tokens
    ├── supabase.ts          # Supabase client initialization
    └── types.ts             # TypeScript definitions and data models
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Expo Go app on your iOS or Android mobile device (optional for hardware testing)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd 23App-21966b11529b211ffba3c3c904bb42373eaa7fe0
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Start the Development Server**:
   ```bash
   npx expo start
   ```

---

## Running the App

- **iOS Simulator**: Press `i` in the terminal after starting the Expo server.
- **Android Emulator**: Press `a` in the terminal.
- **Physical Device**: Scan the QR code displayed in the terminal using the **Expo Go** app (Android) or the native Camera app (iOS).

---

## Scripts

- `npm start` – Start the Expo development server.
- `npm run android` – Launch the app on an Android emulator/device.
- `npm run ios` – Launch the app on an iOS simulator.
- `npm run web` – Run the web version of the application.
