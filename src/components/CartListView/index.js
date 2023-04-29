import CartContext from '../../context/CartContext'

import CartItem from '../CartItem'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      return (
        <ul className="cart-list">
          {cartList.map(item => (
            <CartItem key={item.id} cartItemDetails={item} />
          ))}
        </ul>
      )
    }}
  </CartContext.Consumer>
)
export default CartListView
