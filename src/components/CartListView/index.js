import {BiRupee} from 'react-icons/bi'

import CartContext from '../../context/CartContext'

import CartItem from '../CartItem'
import Footer from '../Footer'
import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, placeOrder} = value

      let total = 0
      cartList.forEach(eachCartItem => {
        total += eachCartItem.cost * eachCartItem.quantity
      })

      const onClickPlaceOrderBtn = () => {
        placeOrder()
      }

      return (
        <>
          <div className="cart-list-container">
            <ul className="cart-list">
              {cartList.map(item => (
                <CartItem key={item.id} cartItemDetails={item} />
              ))}
            </ul>
            <hr className="line" />
            <div className="order-total-container">
              <div>
                <h1 className="order-total-heading">Order Total :</h1>
              </div>
              <div className="price-icon-container">
                <BiRupee size={15} />
                <p className="total-cart-price" data-testid="total-price">
                  {total}.00
                </p>
              </div>
            </div>
            <div className="place-order-button-container">
              <button
                className="place-order-button"
                type="button"
                onClick={onClickPlaceOrderBtn}
              >
                Place Order
              </button>
            </div>
          </div>
          <div className="cart-footer">
            <Footer />
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default CartListView
