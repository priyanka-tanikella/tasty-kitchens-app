import './index.css'

import {Link} from 'react-router-dom'

const EmptyCartView = () => (
  <div className="empty-cart-container">
    <img
      src="https://res.cloudinary.com/denbtnhco/image/upload/v1681869137/cooking_1empty-cart_cmalen.png"
      alt="empty cart"
      className="empty-cart-image"
    />
    <h1 className="empty-cart-heading"> No Order Yet!</h1>
    <p className="empty-cart-description">
      Your cart is empty. Add something from the menu."
    </p>
    <Link to="/">
      <button type="button" className="order-now-button">
        Order Now
      </button>
    </Link>
  </div>
)
export default EmptyCartView
