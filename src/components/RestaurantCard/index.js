import {AiFillStar} from 'react-icons/ai'

import {Link} from 'react-router-dom'

import './index.css'

const RestaurantCard = props => {
  const {restaurantDetails} = props
  const {name, cuisine, rating, imageUrl, id, totalReviews} = restaurantDetails

  return (
    <Link to={`/restaurant/${id}`} className="link-item">
      <li className="list-item" testid="restaurant-item">
        <div className="restaurant-card-container">
          <img src={imageUrl} alt="restaurant" className="restaurant-image" />
          <div className="restaurant-details">
            <h1 className="restaurant-name">{name}</h1>
            <p className="cuisine">{cuisine} </p>
            <div className="star-rating">
              <AiFillStar color="gold" />
              <p className="rating">
                {rating}
                <span className="total-reviews"> ({totalReviews} ratings)</span>
              </p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default RestaurantCard
