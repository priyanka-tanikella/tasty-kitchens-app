import CartContext from '../../context/CartContext'
import OrderPlacedView from '../OrderPlacedView'

import EmptyCartView from '../EmptyCartView'

import CartListView from '../CartListView'

import Header from '../Header'

import Footer from '../Footer'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, isOrderPlaced, placeOrder} = value
      let total = 0
      cartList.forEach(eachCartItem => {
        total += eachCartItem.cost * eachCartItem.quantity
      })
      const showEmptyView = cartList.length === 0

      const onClickPlaceOrderBtn = () => {
        placeOrder()
      }

      return (
        <>
          <Header />
          {isOrderPlaced ? (
            <OrderPlacedView />
          ) : (
            <div className="cart-container">
              {showEmptyView ? (
                <EmptyCartView />
              ) : (
                <div className="cart-list-container">
                  <div className="headings-container">
                    <h1 className="item-heading">Item</h1>
                    <h1 className="quantity-heading">Quantity</h1>
                    <h1 className="price-heading">Price</h1>
                  </div>
                  <CartListView />
                  <hr className="line" />
                  <div className="order-total-container">
                    <h1 className="order-total">Order Total:</h1>
                    <p className="total-cart-price" testid="total-price">
                      {total}.00
                    </p>
                  </div>
                  <div className="button-container">
                    <button
                      className="place-order-button"
                      type="button"
                      onClick={onClickPlaceOrderBtn}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          <Footer />
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
