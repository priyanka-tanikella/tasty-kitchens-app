import {Component} from 'react'

import {BsFilterRight} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import {RiArrowDropLeftLine, RiArrowDropRightLine} from 'react-icons/ri'

import Cookies from 'js-cookie'
import RestaurantCard from '../RestaurantCard'
import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Lowest',
    value: 'Lowest',
  },
  {
    id: 1,
    displayText: 'Highest',
    value: 'Highest',
  },
]

class AllRestaurantsSection extends Component {
  state = {
    restaurantsList: [],
    activeOptionId: sortByOptions[0].id,
    activePage: 1,
    totalPages: 0,
    isLoading: false,
  }

  componentDidMount() {
    this.getRestaurants()
  }

  getRestaurants = async () => {
    const {activeOptionId, activePage} = this.state
    const limit = 9
    const offset = (activePage - 1) * limit
    const jwtToken = Cookies.get('jwt_token')
    this.setState({isLoading: true})
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${activeOptionId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const totalRestaurants = data.total
      const totalPages = Math.ceil(totalRestaurants / limit)
      if (response.ok === true) {
        const updatedData = data.restaurants.map(restaurant => ({
          name: restaurant.name,
          id: restaurant.id,
          imageUrl: restaurant.image_url,
          cuisine: restaurant.cuisine,
          rating: restaurant.user_rating.rating,
          totalReviews: restaurant.user_rating.total_reviews,
        }))
        this.setState({
          restaurantsList: updatedData,
          isLoading: false,
          totalPages,
        })
      }
    }
  }

  onClickLeftButton = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({activePage: prevState.activePage - 1}),
        this.getRestaurants,
      )
    }
  }

  onClickRightButton = () => {
    const {activePage, totalPages} = this.state
    if (activePage < totalPages) {
      this.setState(
        prevState => ({activePage: prevState.activePage + 1}),
        this.getRestaurants,
      )
    }
  }

  onChangeSortBy = event => {
    this.setState({activeOptionId: event.target.value}, this.getRestaurants)
  }

  renderSortByOptions = () => {
    const {activeOptionId} = this.state
    return (
      <div className="sort-by-container">
        <BsFilterRight className="sort-by-icon" />
        <select
          className="sort-by-select"
          value={activeOptionId}
          onChange={this.onChangeSortBy}
        >
          {sortByOptions.map(eachOption => (
            <option
              key={eachOption.id}
              value={eachOption.value}
              className="select-option"
            >
              <p>Sort by </p>
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="restaurants-list-loader">
      <Loader type="Oval" color="#f7931e" height="50" width="50" />
    </div>
  )

  render() {
    const {restaurantsList, activePage, totalPages, isLoading} = this.state
    console.log(restaurantsList)
    return isLoading ? (
      this.renderLoadingView()
    ) : (
      <div className="all-restaurants-list-container">
        <div className="all-restaurants-heading-and-sorting-container">
          <div className="restaurants-heading-container">
            <h1 className="home-title">Popular Restaurants</h1>
            <p className="home-description">
              Select your favourite restaurant special dish and make your day
              happy...
            </p>
          </div>
          {this.renderSortByOptions()}
        </div>
        <hr className="line" />
        <ul className="restaurants-view-container">
          {restaurantsList.map(eachRestaurant => (
            <RestaurantCard
              key={eachRestaurant.id}
              restaurantDetails={eachRestaurant}
            />
          ))}
        </ul>
        <div className="pagination-container">
          <button
            type="button"
            className="pagination-button"
            testid="pagination-left-button"
            onClick={this.onClickLeftButton}
          >
            <RiArrowDropLeftLine size="30" />
          </button>
          <p className="active-page" testid="active-page-number">
            {activePage}
          </p>
          <p className="of-and-total-pages"> of {totalPages}</p>
          <button
            type="button"
            className="pagination-button"
            testid="pagination-left-button"
            onClick={this.onClickRightButton}
          >
            <RiArrowDropRightLine size="30" />
          </button>
        </div>
      </div>
    )
  }
}
export default AllRestaurantsSection
