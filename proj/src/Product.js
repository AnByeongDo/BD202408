import React from 'react';

const Product = ({ product, addToCart, quantity, setQuantity }) => {
  return (
    <article className="product-item">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-details">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>상품가격: {product.price}원</p>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
          className="quantity-input"
        />
        <button onClick={() => addToCart(product)} className="add-to-cart-button">
          장바구니에 추가하기
        </button>
      </div>
    </article>
  );
};

export default Product;