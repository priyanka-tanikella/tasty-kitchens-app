import {Link} from 'react-router-dom'

import './index.css'

const OrderPlacedView = () => (
  <div className="order-placed-container">
    <img
      src="https://res.cloudinary.com/denbtnhco/image/upload/v1682410114/Vector-payment_gsohxw.png"
      alt="order-placed"
      className="order-placed-image"
    />
    <h1 className="order-placed-heading"> Payment Successful</h1>
    <p className="order-placed-description">
      Thank you for ordering Your payment is successfully completed.
    </p>
    <Link to="/" className="link-item">
      <button type="button" className="order-placed-button">
        Go To Home Page
      </button>
    </Link>
  </div>
)
export default OrderPlacedView
