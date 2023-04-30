import {AiFillCloseCircle} from 'react-icons/ai'
import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {removeCartItem, increaseQuantity, decreaseQuantity} = value
      const {cartItemDetails} = props
      const {id, imageUrl, name, cost, quantity} = cartItemDetails

      const onClickCloseBtn = () => {
        removeCartItem(id)
      }

      const onClickIncrement = () => {
        increaseQuantity(id)
      }

      const onClickDecrement = () => {
        const newQuantity = quantity - 1
        if (newQuantity === 0) {
          removeCartItem(id)
        } else {
          decreaseQuantity(id)
        }
      }

      const totalPrice = cost * quantity
      return (
        <li className="cart-item" testid="cartItem">
          <div className="img-container-food-name-container">
            <img src={imageUrl} alt="restaurant" className="cart-image" />
            <h1 className="cart-food-name"> {name}</h1>
          </div>
          <div className="cart-counter-container">
            <div className="counter-container">
              <button
                testid="decrement-quantity"
                type="button"
                onClick={onClickDecrement}
                className="button"
              >
                -
              </button>
              <p className="quantity-container" testid="item-quantity">
                {quantity}
              </p>
              <button
                testid="increment-quantity"
                type="button"
                onClick={onClickIncrement}
                className="button"
              >
                +
              </button>
            </div>
          </div>
          <div className="price">
            <p className="total-price">{totalPrice}.00 </p>
          </div>
          <button
            type="button"
            className="close-button"
            onClick={onClickCloseBtn}
          >
            <AiFillCloseCircle size="25" />
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)
export default CartItem
