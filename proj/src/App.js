import React, { useState } from 'react';
import './styles.css';
import Product from './Product';
import Cart from './Cart';
import monitorImage from './img/img1.jpg'
import monitorImage2 from './img/img2.png'
import monitorImage3 from './img/img3.png'

const App = () => {
  const [products] = useState([
    {
      id: 1,
      name: '벤큐 XL2566K 360 모니터',
      description: '품목 : 게이밍모니터화면크기 : 25인치(62~64cm)최대 해상도 : 1920x1080(FHD)최대 주사율 : 360Hz패널 : TN패널화면비율 : 16:9화면종류 : LED곡면형 : 평면응답속도 : 0.5ms밝기 : 320CD명암비 : 1000 : 1픽셀피치 : 0.283mm',
      price: 965360,
      image: monitorImage,
    },
    {
      id: 2,
      name: '주연테크 FHD 165Hz 1ms 1500R 커브드 게이밍 모니터',
      description: '해상도 (해상도 등급): FHD 화면 재생빈도(Hz): 165Hz 모니터 형태: 커브드 화면비율: 와이드(16:9) 패널: VA',
      price: 219000,
      image: monitorImage2,
    },
    {
      id: 3,
      name: '삼성전자 24인치 Fhd led모니터 ',
      description: '해상도 (해상도 등급): FHD',
      price: 61000,
      image: monitorImage3,
    },
  ]);

  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
    setQuantity(1);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const changeQuantity = (productId, newQuantity) => {
    setCart(cart.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const checkout = () => {
    alert(`총합 가격: ${getTotal()}원`);
    setCart([]);
  };

  return (
    <div>
      <div class='container'>
        <header className="header">
          <h1>모니터 쇼핑몰</h1>
          <div className="subscribe">
            <input type="text" placeholder="상품을 입력해주세요" className="subscribe-input" />
            <button className="subscribe-button">검색</button>
          </div>
        </header>
      </div>
      <main className="content">
        <section className="products">
          {products.map(product => (
            <Product
              key={product.id}
              product={product}
              addToCart={addToCart}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          ))}
        </section>

        <Cart
          cart={cart}
          removeFromCart={removeFromCart}
          changeQuantity={changeQuantity}
          getTotal={getTotal}
          checkout={checkout}
        />
      </main>

      <footer className="footer">
        <p>This blog is a full-stack project.</p>
        <p>This assignment was created using React.</p>
      </footer>
    </div>
  );
};

export default App;