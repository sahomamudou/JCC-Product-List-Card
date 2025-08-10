function CartControls({ product, onAddToCart, onIncrement, onDecrement }) {
  const quantity = product.quantityInCart || 0;

  return (
    <div className="w-full flex justify-center relative -translate-y-1/2 ">
      {quantity === 0 ? (
        <button
          onClick={() => onAddToCart?.(product)}
          className="flex justify-center gap-2 w-48 py-3 bg-gray-50 border border-gray-300 rounded-3xl text-gray-800 text-sm font-semibold"
        >
          <img
            src="/assets/images/icon-add-to-cart.svg"
            alt="Add to cart"
            className="w-4 h-4"
          />
          Add to Cart
        </button>
      ) : (
        <div className="flex items-center w-48 gap-4 bg-red-500 border border-red-500 rounded-3xl px-4 py-3 justify-between text-white ">
          <button onClick={() => onDecrement?.(product.id)}>
            <img
              src="/assets/images/icon-decrement-quantity.svg"
              alt="Decrease quantity"
              className="w-5 h-5 border-2 border-white rounded-full p-1 hover:bg-red-600 transition duration-200"
            />
          </button>

          <span className="text-sm font-semibold text-white">{quantity}</span>

          <button onClick={() => onIncrement?.(product.id)}>
            <img
              src="/assets/images/icon-increment-quantity.svg"
              alt="Increase quantity"
              className="w-5 h-5 border-2 border-white rounded-full p-1 hover:bg-red-600 transition duration-200"
            />
          </button>
        </div>
      )}
    </div>
  );
}

export default CartControls;
