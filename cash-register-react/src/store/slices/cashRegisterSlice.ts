import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CashRegisterState, CalculateChangePayload, ChangeCalculationResult, CashDrawerDenomination } from '@/types/cashRegister';

const initialCashInDrawer: CashDrawerDenomination[] = [
  { name: "PENNY", amount: 1.01 },
  { name: "NICKEL", amount: 2.05 },
  { name: "DIME", amount: 3.1 },
  { name: "QUARTER", amount: 4.25 },
  { name: "ONE", amount: 90 },
  { name: "FIVE", amount: 55 },
  { name: "TEN", amount: 20 },
  { name: "TWENTY", amount: 60 },
  { name: "ONE HUNDRED", amount: 100 }
];

const initialState: CashRegisterState = {
  price: 1.87,
  cashInDrawer: initialCashInDrawer,
  lastTransaction: null,
  isLoading: false,
  error: null,
};

// Utility functions
const roundToTwoDecimals = (num: number): number => Math.round(num * 100) / 100;

const calculateTotalCID = (cashInDrawer: CashDrawerDenomination[]): number => {
  return roundToTwoDecimals(
    cashInDrawer.reduce((total, denomination) => total + denomination.amount, 0)
  );
};

const calculateChangeBreakdown = (
  changeDue: number, 
  reversedCid: CashDrawerDenomination[], 
  denominations: number[]
): ChangeCalculationResult => {
  const result: ChangeCalculationResult = { status: 'OPEN', change: [] };
  let remainingChange = changeDue;

  for (let i = 0; i < reversedCid.length; i++) {
    if (remainingChange >= denominations[i] && remainingChange > 0) {
      let count = 0;
      let availableAmount = reversedCid[i].amount;
      
      while (availableAmount > 0 && remainingChange >= denominations[i]) {
        availableAmount = roundToTwoDecimals(availableAmount - denominations[i]);
        remainingChange = roundToTwoDecimals(remainingChange - denominations[i]);
        count++;
      }
      
      if (count > 0) {
        const changeAmount = roundToTwoDecimals(count * denominations[i]);
        result.change.push({ name: reversedCid[i].name, amount: changeAmount });
      }
    }
  }

  // Check if we couldn't make exact change
  if (remainingChange > 0) {
    return { status: 'INSUFFICIENT_FUNDS', change: [] };
  }

  return result;
};

export const cashRegisterSlice = createSlice({
  name: 'cashRegister',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    calculateChange: (state, action: PayloadAction<CalculateChangePayload>) => {
      const { cashAmount } = action.payload;
      const changeDue = roundToTwoDecimals(cashAmount - state.price);
      const reversedCid = [...state.cashInDrawer].reverse();
      const denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
      const totalCID = calculateTotalCID(state.cashInDrawer);

      // Handle exact cash
      if (cashAmount === state.price) {
        state.lastTransaction = { status: 'OPEN', change: [] };
        state.isLoading = false;
        return;
      }

      // Check if we have enough money in the drawer
      if (totalCID < changeDue) {
        state.lastTransaction = { status: 'INSUFFICIENT_FUNDS', change: [] };
        state.isLoading = false;
        return;
      }

      // Check if we need to close the drawer (exact amount)
      if (totalCID === changeDue) {
        state.lastTransaction = { status: 'CLOSED', change: [...state.cashInDrawer] };
        state.isLoading = false;
        return;
      }

      // Calculate the change breakdown
      const result = calculateChangeBreakdown(changeDue, reversedCid, denominations);
      state.lastTransaction = result;
      state.isLoading = false;

      // Update cash in drawer if change was given
      if (result.change.length > 0) {
        result.change.forEach(({ name, amount }) => {
          const targetDenomination = state.cashInDrawer.find(d => d.name === name);
          if (targetDenomination) {
            targetDenomination.amount = roundToTwoDecimals(targetDenomination.amount - amount);
          }
        });
      }
    },
    resetTransaction: (state) => {
      state.lastTransaction = null;
      state.error = null;
    },
  },
});

export const { setLoading, setError, clearError, calculateChange, resetTransaction } = cashRegisterSlice.actions; 