# Cash Register - Modern React Application

A modern, responsive cash register application built with Next.js and a comprehensive tech stack for professional development.

## 🚀 Tech Stack

- **Frontend Framework**: Next.js 15 (React 19)
- **Language**: TypeScript
- **Styling**: Material-UI (MUI) + Emotion
- **State Management**: Redux Toolkit (RTK)
- **Data Fetching**: TanStack Query (React Query)
- **Form Handling**: React Hook Form with Yup validation
- **Testing**: Jest + React Testing Library + Cypress
- **Code Quality**: ESLint + Prettier
- **Documentation**: Storybook

## ✨ Features

- **Cash Register Functionality**
  - Calculate change for purchases
  - Manage cash drawer with different denominations
  - Real-time input validation
  - Error handling for insufficient funds

- **Modern UX/UI**
  - Responsive Material Design
  - Loading states and animations
  - Accessibility support (ARIA labels, keyboard navigation)
  - Dark/light theme ready

- **Developer Experience**
  - Type-safe with TypeScript
  - Comprehensive testing setup
  - Code formatting and linting
  - Component documentation with Storybook

## 🛠️ Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd cash-register-react

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📋 Available Scripts

### Development
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

### Testing
```bash
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
npm run cypress:open # Open Cypress test runner
npm run cypress:run  # Run Cypress tests headlessly
npm run e2e          # Run full E2E test suite
```

### Documentation
```bash
npm run storybook        # Start Storybook dev server
npm run build-storybook  # Build Storybook for production
```

## 🏗️ Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── layout.tsx       # Root layout with providers
│   └── page.tsx         # Main page component
├── components/          # Reusable components
│   ├── CashRegisterForm.tsx
│   ├── ChangeDisplay.tsx
│   ├── CashDrawerDisplay.tsx
│   └── __tests__/       # Component tests
├── store/               # Redux store configuration
│   ├── store.ts         # Store setup
│   └── slices/          # RTK slices
├── types/               # TypeScript type definitions
├── providers/           # React context providers
└── hooks/               # Custom React hooks
```

## 🧪 Testing Strategy

### Unit Testing
- **Framework**: Jest + React Testing Library
- **Coverage**: Components, hooks, utilities
- **Location**: `src/**/__tests__/`

### Integration Testing
- **Framework**: React Testing Library
- **Coverage**: Component interactions, form validation

### End-to-End Testing
- **Framework**: Cypress
- **Coverage**: Complete user workflows
- **Location**: `cypress/e2e/`

## 📱 Usage

1. **View Item Price**: The current item price is displayed at the top
2. **Enter Cash Amount**: Input the amount of cash received from customer
3. **Calculate Change**: Click the button to calculate change due
4. **View Results**: See the change breakdown by denomination
5. **Cash Drawer**: Monitor current cash drawer contents

### Example Scenarios

- **Exact Payment**: Enter $1.87 → "No change due"
- **Normal Payment**: Enter $5.00 → Change: $3.13 (breakdown shown)
- **Insufficient Funds**: Enter $1.00 → Button disabled with error message

## 🎨 Component Library

Components are documented in Storybook with interactive examples:

```bash
npm run storybook
```

Visit [http://localhost:6006](http://localhost:6006) to browse the component library.

## 🔧 Configuration

### Environment Variables

Create `.env.local` for environment-specific settings:

```env
NEXT_PUBLIC_APP_NAME=Cash Register
NEXT_PUBLIC_VERSION=1.0.0
```

### Customization

- **Theme**: Edit `src/providers/Providers.tsx` for MUI theme customization
- **Cash Drawer**: Modify initial amounts in `src/store/slices/cashRegisterSlice.ts`
- **Validation**: Update form rules in `src/components/CashRegisterForm.tsx`

## 🚀 Production Deployment

```bash
# Build the application
npm run build

# Start production server
npm run start
```

The app is optimized for deployment on platforms like Vercel, Netlify, or any Node.js hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Run tests: `npm run test`
4. Commit changes: `git commit -am 'Add new feature'`
5. Push to branch: `git push origin feature/new-feature`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Original vanilla JavaScript implementation
- Material-UI design system
- React and Next.js communities
- FreeCodeCamp Cash Register certification project

---

Built with ❤️ using modern React development practices.
