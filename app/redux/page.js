"use client";

import store, {
  fetchProducts,
  processCheckout,
  addToCart,
  removeFromCart,
  updateQuantity,
  resetCheckoutStatus,
  setProducts,
  setLoading,
  setError,
} from "../../store";

import { Provider, useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Link from "next/link";


// Shop Component (uses Redux hooks)
function ShopContent() {
  const dispatch = useDispatch();
  const { products, cart, loading, error, checkoutStatus } = useSelector((state) => state.shop);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  // Fetch products using async thunk
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = async () => {
    const result = await dispatch(processCheckout(cart));
    console.log('Result:', result);
    
    setShowCheckoutModal(true);
  };

  const closeModal = () => {
    setShowCheckoutModal(false);
    dispatch(resetCheckoutStatus());
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getProductQuantity = (productId) => {
    const cartItem = cart.find((item) => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Cart Info Bar */}
      <div className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <Link href="/" className="text-sm text-zinc-600 hover:underline dark:text-zinc-400">
              ← Back to Skills
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛒</span>
              <div className="text-right">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Cart Items</p>
                <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{totalItems}</p>
              </div>
            </div>
            <div className="h-8 w-px bg-zinc-300 dark:bg-zinc-700"></div>
            <div className="text-right">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Total</p>
              <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                ${totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-50">
            Redux Toolkit Shop
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Demonstrating Redux Toolkit + Redux Thunk for async actions
          </p>
        </header>

        <section className="rounded-2xl bg-white p-6 shadow-md dark:bg-zinc-900 mb-8">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Key Concepts</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>Centralized state management with Redux store</li>
            <li>Redux Toolkit simplifies boilerplate (createSlice, configureStore)</li>
            <li>Async actions with Redux Thunk (createAsyncThunk)</li>
            <li>Immutable state updates with Immer built-in</li>
            <li>DevTools for time-travel debugging</li>
          </ul>
        </section>

        <header className="mb-8">
        </header>

        {/* Loading State */}
        {loading && products.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="mb-4 text-6xl">⏳</div>
              <p className="text-lg font-medium text-zinc-600 dark:text-zinc-400">
                Loading products...
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mb-8 rounded-lg bg-red-100 p-4 text-red-700 dark:bg-red-950 dark:text-red-400">
            ⚠️ Error: {error}
          </div>
        )}

        {/* Product Grid */}
        {products.length > 0 && (
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const quantity = getProductQuantity(product.id);
              return (
                <div
                  key={product.id}
                  className="group rounded-2xl bg-white p-6 shadow-md transition hover:shadow-xl dark:bg-zinc-900"
                >
                  <div className="mb-4 flex h-64 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 text-6xl dark:from-indigo-950 dark:to-purple-950">
                    {product.image && typeof product.image === "string" && product.image.startsWith("http") ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={product.image} alt={product.name} className="h-full w-full object-contain p-4" />
                    ) : (
                      <div className="text-6xl">{product.image}</div>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                    {product.name}
                  </h3>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      ${product.price}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Stock: {product.stock}
                    </p>
                  </div>

                  {/* Add to Cart / Quantity Controls */}
                  <div className="mt-4">
                    {quantity === 0 ? (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleUpdateQuantity(product.id, quantity - 1)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-200 font-bold text-zinc-700 transition hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                        >
                          −
                        </button>
                        <span className="flex-1 text-center text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(product.id, quantity + 1)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleRemoveFromCart(product.id)}
                          className="ml-2 flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 text-red-600 transition hover:bg-red-200 dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900"
                          title="Remove from cart"
                        >
                          🗑️
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </section>
        )}

        {/* Cart Summary */}
        {cart.length > 0 && (
          <section className="mt-12 rounded-2xl bg-white p-6 shadow-md dark:bg-zinc-900">
            <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Cart Summary
            </h2>
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-zinc-200 pb-3 last:border-0 dark:border-zinc-800"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-lg object-contain bg-zinc-100 dark:bg-zinc-800"
                    />
                    {/* <span className="text-3xl">{item.image}</span> */}
                    <div>
                      <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                        {item.name}
                      </p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        ${item.price} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-zinc-300 pt-4 dark:border-zinc-700">
              <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                Total
              </span>
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="mt-4 w-full rounded-lg bg-green-600 px-6 py-3 font-bold text-white transition hover:bg-green-700 disabled:opacity-50 dark:bg-green-500 dark:hover:bg-green-600"
            >
              {loading ? "Processing..." : "Checkout (Async Thunk)"}
            </button>
          </section>
        )}

        {/* Checkout Modal */}
        {showCheckoutModal && checkoutStatus && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="max-w-md rounded-2xl bg-white p-8 shadow-2xl dark:bg-zinc-900">
              {checkoutStatus.type === "success" ? (
                <>
                  <div className="mb-4 text-center text-6xl">✅</div>
                  <h3 className="mb-2 text-center text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                    Order Successful!
                  </h3>
                  <p className="mb-4 text-center text-zinc-600 dark:text-zinc-400">
                    Order ID: <span className="font-mono font-semibold">{checkoutStatus.data.orderId}</span>
                  </p>
                  <p className="mb-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
                    This was processed using Redux Thunk async action
                  </p>
                </>
              ) : (
                <>
                  <div className="mb-4 text-center text-6xl">❌</div>
                  <h3 className="mb-2 text-center text-2xl font-bold text-red-600 dark:text-red-400">
                    Checkout Failed
                  </h3>
                  <p className="mb-6 text-center text-zinc-600 dark:text-zinc-400">
                    {checkoutStatus.message}
                  </p>
                </>
              )}
              <button
                onClick={closeModal}
                className="w-full rounded-lg bg-indigo-600 px-6 py-3 font-bold text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Redux Toolkit Explanation */}
        {/* <section className="mt-12 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 p-6 dark:from-indigo-950 dark:to-purple-950">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
            🔧 Redux Toolkit + Redux Thunk
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <li>✅ <strong>configureStore:</strong> Simplified store setup with dev tools</li>
            <li>✅ <strong>createSlice:</strong> Combines actions + reducers (less boilerplate)</li>
            <li>✅ <strong>createAsyncThunk:</strong> Handle async actions (API calls)</li>
            <li>✅ <strong>Redux Thunk:</strong> Built-in middleware for async logic</li>
            <li>✅ <strong>Immer:</strong> Write "mutating" logic that's actually immutable</li>
            <li>✅ <strong>react-redux hooks:</strong> useDispatch & useSelector</li>
          </ul>
          <div className="mt-4 rounded-lg bg-white/50 p-4 dark:bg-zinc-900/50">
            <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
              Try clicking "Checkout" to see async thunk in action!<br/>
              Products loaded with 1s delay, checkout has 80% success rate.
            </p>
          </div>
        </section> */}
      </main>
    </div>
  );
}

// Main component with Provider
export default function ReduxShoppingPage() {
  return (
    <Provider store={store}>
      <ShopContent />
    </Provider>
  );
}   