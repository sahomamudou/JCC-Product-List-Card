import { useEffect, useReducer, useState } from "react";
import ProductGrid from "./components/ProductGrid";
import CartSummary from "./components/CartSummary";
import OrderConfirmation from "./components/OrderConfirmation";

const initialState = { products: [] };

function App() {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "initialize_products":
        return { ...state, products: action.payload };

      case "add_to_cart":
        return {
          ...state,
          products: state.products.map((product) =>
            product.id === action.product.id
              ? {
                  ...product,
                  quantityInCart: (product.quantityInCart || 0) + 1,
                }
              : product
          ),
        };

      case "increment_quantity":
        return {
          ...state,
          products: state.products.map((product) =>
            product.id === action.id
              ? {
                  ...product,
                  quantityInCart: product.quantityInCart + 1,
                }
              : product
          ),
        };

      case "remove_from_cart":
        return {
          ...state,
          products: state.products
            .map((product) =>
              product.id === action.id
                ? {
                    ...product,
                    quantityInCart: product.quantityInCart - 1,
                  }
                : product
            )
            .filter(
              (product) => product.quantityInCart > 0 || !product.quantityInCart
            ),
        };

      case "reset_cart":
        return {
          ...state,
          products: state.products.map((product) => ({
            ...product,
            quantityInCart: 0,
          })),
        };

      default:
        return state;
    }
  }, initialState);

  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("/data.json");
        if (!res.ok) throw new Error("Failed to fetch data.json");
        const data = await res.json();
        dispatch({ type: "initialize_products", payload: data });
      } catch (error) {
        console.error("Error loading product data:", error);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        dispatch({ type: "reset_cart" });
        setShowConfirmation(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const productsInCart = state.products.filter((p) => p.quantityInCart);
  const totalItemsInCart = productsInCart.reduce(
    (sum, product) => sum + product.quantityInCart,
    0
  );

  const handleAddProductToCart = (product) => {
    dispatch({ type: "add_to_cart", product });
  };

  const handleIncrementQuantity = (id) => {
    dispatch({ type: "increment_quantity", id });
  };

  const handleRemoveFromCart = (id) => {
    dispatch({ type: "remove_from_cart", id });
  };

  const handleConfirmOrder = () => {
    setShowConfirmation(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetCart = () => {
    dispatch({ type: "reset_cart" });
  };

  return (
    <main className="max-w-6xl mx-auto py-10 px-6 min-h-screen flex flex-col sm:flex-row sm:items-start gap-8 relative">
      <div className="flex-1">
        <ProductGrid
          products={state.products}
          onAddToCart={handleAddProductToCart}
          onIncrement={handleIncrementQuantity}
          onDecrement={handleRemoveFromCart}
        />

        <div>
          <OrderConfirmation
            show={showConfirmation}
            onClose={() => setShowConfirmation(false)}
            productsInCart={productsInCart}
            onResetCart={handleResetCart}
          />
        </div>
      </div>

      <div>
        <CartSummary
          productsInCart={productsInCart}
          totalItems={totalItemsInCart}
          onRemoveFromCart={handleRemoveFromCart}
          onConfirmOrder={handleConfirmOrder}
        />

        <div>
          <OrderConfirmation
            show={showConfirmation}
            onClose={() => setShowConfirmation(false)}
            productsInCart={productsInCart}
            onResetCart={handleResetCart}
          />
        </div>
      </div>
    </main>
  );
}

export default App;
