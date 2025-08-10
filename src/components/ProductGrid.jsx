import ProductCard from "./ProductCard";

function ProductGrid({ products = [], onAddToCart, onIncrement, onDecrement }) {
  return (
    <div className="product-list-wrapper grow">
      <h1 className="text-xl font-bold mb-6">Desserts</h1>

      <div className="product-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
