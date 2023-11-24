import React, {createContext, useContext, useState} from "react";

const ShopContext = createContext();

export const StateContext = ({ children }) => {
  
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [qty, setQty] = useState(1);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // increase product quantity
  const IncreaseQty = () => {
    setQty(prevQty => prevQty + 1);
  };

  // decrease product quantity
  const DecreaseQty = () => {
    setQty(prevQty => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  // add product to cart
  const onAdd = (product, quantity) => {
    // Total price
    setTotalPrice((prevTotal) => prevTotal + product.Price * quantity);
    
    // Increase total quantity
    setTotalQuantities((prevQty) => prevQty + quantity);

    // check if the product is already in the cart
    const exist = cartItems.find(item => item.slug === product.slug);
    if (exist) {
      setCartItems(cartItems.map(item => item.slug === product.slug ? {...exist, quantity: exist.quantity + quantity} : item))
    } else {
      setCartItems([...cartItems, {...product, quantity: quantity}])
    }
  }
  
const onRemove = (product) => {
  // Total price
  setTotalPrice((prevTotal) => prevTotal - product.Price);

  // Decrease total quantity
  setTotalQuantities((prevQty) => prevQty - 1);

  // check if product is already in the cart
  const exist = cartItems.find(item => item.slug === product.slug);
  if (exist.quantity === 1) {
    setCartItems(cartItems.filter((item) => item.slug !== product.slug));
  } else {
    setCartItems(cartItems.map(item => item.slug === product.slug ? {...exist, quantity: exist.quantity - 1} : item));
  }
}

  return (
    <ShopContext.Provider value={{
      qty, 
      IncreaseQty, 
      DecreaseQty,
      showCart,
      setShowCart,
      cartItems,
      onAdd,
      onRemove,
      totalQuantities,
      totalPrice,
    }} >
      {children}
    </ShopContext.Provider>
  )
}

export const useStateContext = () => useContext(ShopContext);