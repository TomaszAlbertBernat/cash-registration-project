export interface CashDrawerDenomination {
  name: string;
  amount: number;
}

export interface ChangeCalculationResult {
  status: 'OPEN' | 'CLOSED' | 'INSUFFICIENT_FUNDS';
  change: CashDrawerDenomination[];
}

export interface CashRegisterState {
  price: number;
  cashInDrawer: CashDrawerDenomination[];
  lastTransaction: ChangeCalculationResult | null;
  isLoading: boolean;
  error: string | null;
}

export interface CalculateChangePayload {
  cashAmount: number;
}

export interface ValidationResult {
  valid: boolean;
  message?: string;
}

export interface FormData {
  cashAmount: number;
} 