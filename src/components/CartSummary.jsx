import React from "react";

function CartSummary({ productsInCart, onRemoveFromCart, onConfirmOrder }) {
  const cartCount = productsInCart.reduce(
    (total, item) => total + item.quantityInCart,
    0
  );

  const cartTotal = productsInCart.reduce(
    (total, item) => total + item.price * item.quantityInCart,
    0
  );

  return (
    <aside className="w-full sm:max-w-xl bg-white rounded-lg shadow-md p-4 sm:p-6 sm:sticky sm:top-2 self-start">
      <h2 className="text-lg sm:text-xl font-semibold text-red-700 mb-4">
        {`Your Cart (${cartCount})`}
      </h2>

      {productsInCart.length === 0 ? (
        <div className="text-center text-gray-500">
          <img
            src="/assets/images/illustration-empty-cart.svg"
            alt="Empty cart"
            className="mx-auto mb-4 w-24 h-24 sm:w-32 sm:h-32 object-contain"
          />
          <p className="text-sm sm:text-base">
            Your added items will appear here.
          </p>
        </div>
      ) : (
        <>
          <ul className="space-y-4 divide-y divide-gray-200 mb-4">
            {productsInCart.map((item) => (
              <li
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 border-b pb-2"
              >
                <div className="flex gap-3">
                  <img
                    src={item.image.mobile || item.image.desktop}
                    alt={item.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">
                      {item.name}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                      <span className="text-rose-500 font-semibold">
                        {item.quantityInCart}x
                      </span>
                      <span>@ D{item.price.toFixed(2)}</span>
                      <span className="font-semibold text-gray-700">
                        D{(item.price * item.quantityInCart).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveFromCart(item.id)}
                  className="w-6 h-6 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center transition self-end sm:self-start"
                  aria-label={`Remove ${item.name}`}
                >
                  <img
                    src="/assets/images/icon-remove-item.svg"
                    alt="Remove item"
                    className="w-3 h-3 object-contain"
                  />
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-4 space-y-4">
            <div className="flex justify-between items-center text-sm sm:text-base">
              <p className="font-medium text-gray-800">Order Total:</p>
              <p className="font-bold text-gray-900">D{cartTotal.toFixed(2)}</p>
            </div>

            <div className="flex items-center gap-2 text-sm border border-gray-200 p-3 rounded-lg">
              <img
                src="/assets/images/icon-carbon-neutral.svg"
                alt="Carbon neutral"
                className="w-5 h-5"
              />
              <p>
                This is a <span className="font-semibold">carbon-neutral</span>{" "}
                delivery
              </p>
            </div>

            <button
              onClick={onConfirmOrder}
              className="w-full bg-red-600 text-white py-2 rounded-3xl hover:bg-red-700 transition text-sm sm:text-base"
            >
              Confirm Order
            </button>
          </div>
        </>
      )}
    </aside>
  );
}

export default CartSummary;
