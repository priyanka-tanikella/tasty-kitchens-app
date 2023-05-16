import {AiFillStar} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import Counter from '../Counter'

import './index.css'

const FoodCard = props => {
  let addCartItem = null
  const {foodDetails} = props
  const {name, id, cost, rating, imageUrl} = foodDetails

  const onClickAddBtn = () => {
    addCartItem({cost, quantity: 1, id, imageUrl, name})
  }
  return (
    <CartContext.Consumer>
      {value => {
        addCartItem = value.addCartItem
        const {getQuantityOfItem} = value
        const quantity = getQuantityOfItem(id)

        return (
          <li className="food-item" testid="foodItem">
            <div className="food-card-container">
              <img src={imageUrl} alt="restaurant" className="food-image" />
              <div className="food-details">
                <h1 className="food-name">{name}</h1>
                <p className="food-cost">{cost}</p>
                <div className="star-rating">
                  <AiFillStar color="gold" />
                  <p className="rating">{rating}</p>
                </div>
                {quantity === 0 ? (
                  <button
                    type="button"
                    className="add-button"
                    onClick={onClickAddBtn}
                  >
                    ADD
                  </button>
                ) : (
                  <Counter quantity={quantity} id={id} />
                )}
              </div>
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}
export default FoodCard
