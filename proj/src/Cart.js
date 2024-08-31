import React from 'react';

const Cart = ({ cart, removeFromCart, changeQuantity, getTotal, checkout }) => {
  return (
    <section className="cart">
      <h2>장바구니</h2>
      {cart.length === 0 ? (
        <p>장바구니가 비어있습니다.</p>
      ) : (
        <ul>
          {cart.map(item => (
            <li key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-image" />
              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>{item.price}원 x {item.quantity}</p>
                <div className="cart-actions">
                  <button onClick={() => changeQuantity(item.id, item.quantity - 1)} disabled={item.quantity === 1}>
                    -
                  </button>
                  <button onClick={() => changeQuantity(item.id, item.quantity + 1)}>
                    +
                  </button>
                  <button onClick={() => removeFromCart(item.id)} className="remove-button">
                    상품삭제
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-total">
        <h3>상품가격 합계: {getTotal()}원</h3>
        <button onClick={checkout} className="checkout-button" disabled={cart.length === 0}>
          결제하기
        </button>
      </div>
    </section>
  );
};

export default Cart;