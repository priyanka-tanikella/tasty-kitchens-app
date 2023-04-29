import CartContext from '../../context/CartContext'

import './index.css'

const Counter = props => {
  let increaseQuantity = null
  let decreaseQuantity = null
  let removeCartItem = null

  const {id, quantity} = props

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

  return (
    <CartContext.Consumer>
      {value => {
        increaseQuantity = value.increaseQuantity
        decreaseQuantity = value.decreaseQuantity
        removeCartItem = value.removeCartItem

        return (
          <div className="counter-container">
            <button
              testid="decrement-count"
              type="button"
              onClick={onClickDecrement}
              className="button"
            >
              -
            </button>
            <div className="quantity-container" testid="active-count">
              {quantity}
            </div>
            <button
              testid="increment-count"
              type="button"
              onClick={onClickIncrement}
              className="button"
            >
              +
            </button>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default Counter
