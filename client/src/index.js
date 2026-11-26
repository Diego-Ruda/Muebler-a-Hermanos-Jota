import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AlertsProvider } from './components/AlertsProvider';
import { AuthProvider } from './auth/AuthProvider';
import { CartProvider } from './cart/CartProvider';
import './App.css';
import './styles.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <AuthProvider>
      <AlertsProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AlertsProvider>
    </AuthProvider>
  </BrowserRouter>
);
