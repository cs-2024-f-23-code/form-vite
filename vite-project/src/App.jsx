import { useState } from 'react';
import Form from './components/form.jsx';
import Login from './components/login.jsx';
import ProductCatalog from './question2/ProductCatalog.jsx';

function App() {
  const [activePage, setActivePage] = useState('login');

  return (
    <>
      <nav className="app-nav" aria-label="Application pages">
        <button
          type="button"
          className={activePage === 'login' ? 'active' : ''}
          onClick={() => setActivePage('login')}
        >
          Login
        </button>
        <button
          type="button"
          className={activePage === 'form' ? 'active' : ''}
          onClick={() => setActivePage('form')}
        >
          Signup form
        </button>
        <button
          type="button"
          className={activePage === 'catalog' ? 'active' : ''}
          onClick={() => setActivePage('catalog')}
        >
          Product catalog
        </button>
      </nav>

      {activePage === 'login' && <Login />}
      {activePage === 'form' && <Form />}
      {activePage === 'catalog' && <ProductCatalog />}
    </>
  );
}

export default App;
