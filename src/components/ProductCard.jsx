import CartControls from "./CartControls";

function ProductCard({ product, onAddToCart, onIncrement, onDecrement }) {
  return (
    <div className="product w-full ">
      <div
        className={`card-image-wrapper w-full h-56 bg-gray-200 rounded-xl overflow-hidden transition duration-200 ${
          product.quantityInCart > 0
            ? "border-3  border-red-500"
            : "border border-transparent"
        }`}
      >
        <img
          src={product.image.desktop}
          alt={product.name}
          className="h-full w-full block object-cover"
        />
      </div>

      <CartControls
        product={product}
        onAddToCart={onAddToCart}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />

      <div className="flex flex-col gap-y-0.5">
        <span className="text-rose-900 text-sm">{product.category}</span>
        <strong>{product.name}</strong>
        <strong className="text-red-700">D{product.price}</strong>
      </div>
    </div>
  );
}

export default ProductCard;
