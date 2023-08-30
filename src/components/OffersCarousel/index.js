import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import {Component} from 'react'

import Cookies from 'js-cookie'
import './index.css'

class OffersCarousel extends Component {
  state = {
    offersList: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getOffersData()
  }

  getOffersData = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
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
      if (response.ok === true) {
        const updatedData = data.offers.map(eachUrl => ({
          imageUrl: eachUrl.image_url,
          id: eachUrl.id,
        }))
        this.setState({
          offersList: updatedData,
          isLoading: false,
        })
      }
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="restaurants-offers-loader">
      <Loader type="Oval" color="#f7931e" height="50" width="50" />
    </div>
  )

  render() {
    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 500,
      autoplay: true,
      infinite: true,
      autoplaySpeed: 2000,
    }
    const {offersList, isLoading} = this.state
    console.log(offersList)
    return isLoading ? (
      this.renderLoadingView()
    ) : (
      <div className="carousel-container">
        <ul className="offers-slider-container">
          <Slider {...settings}>
            {offersList.map(eachUrl => (
              <li className="offer-item" key={eachUrl.id}>
                <img
                  src={eachUrl.imageUrl}
                  alt="offer"
                  className="offer-image"
                />
              </li>
            ))}
          </Slider>
        </ul>
      </div>
    )
  }
}
export default OffersCarousel
