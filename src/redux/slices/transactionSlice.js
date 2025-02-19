import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { addTransactionApi, fetchTransactionsApi } from "../../services/allApis"

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchTransactionsApi()
      if (response.error) throw new Error(response.message)
      return response.data
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch transactions");
    }
  }
)

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transaction, { rejectWithValue }) => {
    try {
      const response = await addTransactionApi(transaction)
      if (response.error) throw new Error(response.message)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add transaction");
    }
  }
);

const initialState = {
  transactions: [],
  loading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    filterByCategory: (state, action) => {
      state.transactions = state.transactions.filter(
        (t) => t.category === action.payload
      );
    },
    filterByDate: (state, action) => {
      state.transactions = state.transactions.filter(
        (t) => t.date === action.payload
      )
    },
  },
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
        state.error = action.payload;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
      })
  },
})

export const { filterByCategory, filterByDate } = transactionSlice.actions

export default transactionSlice.reducer;
