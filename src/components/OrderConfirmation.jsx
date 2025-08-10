import React from "react";

const OrderConfirmation = ({ show, onClose, productsInCart, onResetCart }) => {
  if (!show || productsInCart.length === 0) return null;

  const total = productsInCart.reduce(
    (sum, item) => sum + item.quantityInCart * item.price,
    0
  );

  return (
    <div className="fixed inset-0 z-50 bg-opacity-40 flex justify-center items-start px-4 py-6 overflow-auto">
      <div className="w-full max-w-sm md:max-w-md lg:max-w-md bg-white rounded-xl shadow-md p-6 relative max-h-[90vh] overflow-y-auto">
        <img
          src="assets/images/icon-order-confirmed.svg"
          alt="Order Confirmed"
          className="mb-4 w-10 h-10 md:w-12 md:h-12"
        />

        <div className="text-start mb-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-800">
            Order Confirmed
          </h2>
          <p className="text-sm md:text-base text-gray-500">
            We hope you enjoy your food!
          </p>
        </div>

        <div className="border border-gray-200 rounded-lg p-4 mb-4">
          <ul className="divide-y divide-gray-200 mb-4 ">
            {productsInCart.map((item) => (
              <li
                key={item.id}
                className="py-3 flex items-center justify-between gap-3"
              >
                <img
                  src={item.image.mobile || item.image.desktop}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-md"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm md:text-base truncate">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="text-rose-500 font-semibold">
                      {item.quantityInCart}x
                    </span>
                    <span className="ml-2">@ ${item.price.toFixed(2)}</span>
                  </p>
                </div>
                <p className="font-semibold text-gray-700 text-sm md:text-base">
                  ${(item.quantityInCart * item.price).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center border-t pt-4">
            <span className="text-base md:text-lg font-medium text-gray-800">
              Order Total
            </span>
            <span className="text-base md:text-lg font-bold text-gray-900">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            onResetCart?.();
            onClose();
          }}
          className="mt-6 w-full bg-red-500 hover:bg-orange-600 text-white py-2 px-4 rounded-3xl font-semibold transition text-sm md:text-base"
        >
          Start New Order
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
