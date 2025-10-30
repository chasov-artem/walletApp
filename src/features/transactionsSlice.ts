import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Transaction {
  id: string;
  type: 'payment' | 'credit';
  amount: number;
  name: string;
  description: string;
  date: string;
  pending?: boolean;
  authorizedUser?: string;
}

interface TransactionsState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionsState = {
  transactions: [],
  loading: false,
  error: null,
};

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async () => {
    const resp = await fetch('/transactions.json');
    return (await resp.json()) as Transaction[];
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching transactions';
      });
  },
});

export default transactionsSlice.reducer;
