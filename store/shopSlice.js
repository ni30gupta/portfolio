import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  "shop/fetchProducts",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data.map((p) => ({
      id: p.id,
      name: p.title,
      price: Number(p.price),
      image: p.image || "🛍️",
      stock: 10,
      raw: p,
    }));
  }
);

// Keep checkout simulated locally (no public checkout endpoint available)
export const processCheckout = createAsyncThunk(
  "shop/processCheckout",
  async (cart, { rejectWithValue }) => {
    try {
      // Simulate network/payment latency
      await new Promise((res) => setTimeout(res, 1000));
      // set checkoutStatus to success

      return { type: "success", data:{ orderId: `ORD-${Math.random().toString(36).substring(2, 15)}`} };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const shopSlice = createSlice({
  name: "shop",
  initialState: {
    products: [],
    cart: [],
    loading: false,
    error: null,
    checkoutStatus: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        } else {
          item.quantity = action.payload.quantity;
        }
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
    // Imperative setters for use when fetching from a hook in components
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetCheckoutStatus: (state) => {
      state.checkoutStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(processCheckout.pending, (state) => {
        state.loading = true;
        state.checkoutStatus = null;
      })
      .addCase(processCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkoutStatus = action.payload;
        state.cart = []; // Clear cart on successful checkout
      })
      .addCase(processCheckout.rejected, (state, action) => {
        state.checkoutStatus = { status: "failed", message: action.payload };
        state.loading = false;
      });
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, resetCheckoutStatus, setProducts, setLoading, setError } = shopSlice.actions;
export default shopSlice.reducer;
