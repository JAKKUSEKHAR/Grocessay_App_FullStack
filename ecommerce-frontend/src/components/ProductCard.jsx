function ProductCard({ product, onAdd, onRemove }) {
  return (
    <div className="product-card">
      <img
        src={`/images/${product.imageName}`}
        alt={product.name}
      />

      <div className="p-name">{product.name}</div>
      <div className="p-price">₹{product.price}</div>

      {/* Quantity Controling */}
   
  {product.quantity===0 ? (<span className="out-of-stock">Out of Stock</span>
):(
    
      product.qty === 0 ? (
        <button className="add-btn" onClick={onAdd}>
          ADD
        </button>
      ) : (
        <div className="qty-controls">
          <button onClick={onRemove}>−</button>
          <span>{product.qty}</span>
          <button onClick={onAdd}>+</button>
        </div>
      ))}
    </div>
  );
}

export default ProductCard;
