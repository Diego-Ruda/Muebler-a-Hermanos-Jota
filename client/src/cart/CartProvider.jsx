import { useCallback, useEffect, useMemo, useState } from 'react';
import { CartContext } from './CartContext';

const CART_STORAGE_KEY = 'hj_cart';

function readStoredCart() {
  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];

    return Array.isArray(parsed)
      ? parsed.filter((item) => item?.producto?._id && item.cantidad > 0)
      : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readStoredCart);

  // Persistencia: guarda el carrito cada vez que cambia
  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // si localStorage no está disponible, el carrito sigue en memoria
    }
  }, [cart]);

  const addToCart = useCallback((product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.producto._id === product._id
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.producto._id === product._id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [...currentCart, { producto: product, cantidad: 1 }];
    });
  }, []);

  const changeQuantity = useCallback((productId, delta) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.producto._id === productId
            ? { ...item, cantidad: item.cantidad + delta }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.producto._id !== productId)
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const getItemSubtotal = useCallback(
    (item) => item.producto.precio * item.cantidad,
    []
  );

  const value = useMemo(() => {
    const cartSubtotal = cart.reduce(
      (total, item) => total + item.producto.precio * item.cantidad,
      0
    );

    return {
      cart,
      cartCount: cart.reduce((total, item) => total + item.cantidad, 0),
      cartSubtotal,
      cartTotal: cartSubtotal, // no hay envío ni impuestos, por eso coinciden
      getItemSubtotal,
      addToCart,
      changeQuantity,
      removeFromCart,
      clearCart,
    };
  }, [
    cart,
    getItemSubtotal,
    addToCart,
    changeQuantity,
    removeFromCart,
    clearCart,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
