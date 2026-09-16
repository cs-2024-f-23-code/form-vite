import { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'Comfortable, noise-cancelling headphones for everyday listening.',
    price: 79.99,
  },
  {
    id: 2,
    name: 'Mechanical Keyboard',
    description: 'A compact keyboard with responsive mechanical switches.',
    price: 64.99,
  },
  {
    id: 3,
    name: 'Desk Lamp',
    description: 'An adjustable LED lamp with warm and cool light modes.',
    price: 34.99,
  },
];

function ProductCatalog() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((currentCart) => [...currentCart, product]);
  };

  const cartTotal = cart.reduce((total, product) => total + product.price, 0);

  return (
    <main className="product-catalog">
      <header className="product-catalog__header">
        <div>
          <p className="product-catalog__eyebrow">Featured products</p>
          <h1>Product catalog</h1>
        </div>
        <p aria-live="polite">
          Cart: {cart.length} item{cart.length === 1 ? '' : 's'}
        </p>
      </header>

      <section className="product-catalog__grid" aria-label="Products">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <div className="product-card__footer">
              <strong>${product.price.toFixed(2)}</strong>
              <button type="button" onClick={() => addToCart(product)}>
                Add to cart
              </button>
            </div>
          </article>
        ))}
      </section>

      <p className="product-catalog__total">
        Cart total: <strong>${cartTotal.toFixed(2)}</strong>
      </p>
    </main>
  );
}

export default ProductCatalog;
