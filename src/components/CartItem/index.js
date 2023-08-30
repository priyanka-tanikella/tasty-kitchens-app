import {BiRupee} from 'react-icons/bi'

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
        <li className="cart-item" data-testid="cartItem">
          <div className="food-cart-container">
            <img src={imageUrl} alt="restaurant" className="cart-image" />
            <div className="cart-item-details-container">
              <h1 className="cart-food-name"> {name}</h1>
              <div className="cart-counter-container">
                <button
                  data-testid="decrement-quantity"
                  type="button"
                  onClick={onClickDecrement}
                  className="button"
                >
                  -
                </button>
                <p className="quantity-container" data-testid="item-quantity">
                  {quantity}
                </p>
                <button
                  data-testid="increment-quantity"
                  type="button"
                  onClick={onClickIncrement}
                  className="button"
                >
                  +
                </button>
              </div>
              <div className="price-icon-container">
                <BiRupee size={20} className="rupee-icon" />
                <p className="total-price">{totalPrice}.00 </p>
              </div>
            </div>

            <button
              type="button"
              className="close-button"
              onClick={onClickCloseBtn}
            >
              <AiFillCloseCircle size="20" />
            </button>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)
export default CartItem
