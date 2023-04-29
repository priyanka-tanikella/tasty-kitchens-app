import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  removeCartItem: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  placeOrder: () => {},
  getQuantityOfItem: () => {},
})

export default CartContext
