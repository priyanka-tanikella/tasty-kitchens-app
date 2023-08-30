import CartContext from '../../context/CartContext'
import OrderPlacedView from '../OrderPlacedView'

import EmptyCartView from '../EmptyCartView'

import CartListView from '../CartListView'

import Header from '../Header'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, isOrderPlaced} = value

      const showEmptyView = cartList.length === 0

      return (
        <>
          <Header />
          <div className="app-cart-container">
            {isOrderPlaced ? (
              <OrderPlacedView />
            ) : (
              <div className="cart-container">
                {showEmptyView ? (
                  <EmptyCartView />
                ) : (
                  <div>
                    <div className="headings-container">
                      <h1 className="item-heading">Item</h1>
                      <h1 className="quantity-heading">Quantity</h1>
                      <h1 className="price-heading">Price</h1>
                    </div>
                    <CartListView />
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
