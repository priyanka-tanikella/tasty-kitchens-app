import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const {match} = props
  const {path} = match

  const onClickLogoutBtn = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  const onClickLogo = () => {
    const {history} = props
    history.replace('/')
  }

  const homeClassName =
    path === '/' ? 'home-active-link-page' : 'home-link-page'
  const cartClassName =
    path === '/cart' ? 'cart-active-link-page' : 'cart-link-page'

  return (
    <nav className="navbar-desktop-view">
      <ul className="navbar-desktop-view">
        <li className="nav-item">
          <Link to="/" className="link">
            <div className="logo-and-title-container">
              <button type="button" className="button" onClick={onClickLogo}>
                <img
                  src="https://res.cloudinary.com/denbtnhco/image/upload/v1681632796/Vectorlogo_prhtzg.png"
                  alt="website logo"
                  className="desktop-logo-img"
                />
              </button>
              <h1 className="title">Tasty Kitchens</h1>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <div className="home-cart-logout-container">
            <Link to="/" className="link">
              <p className={homeClassName}> Home</p>
            </Link>

            <Link to="/cart" className="link">
              <p className={cartClassName}> Cart</p>
            </Link>

            <button
              type="button"
              className="logout-button"
              onClick={onClickLogoutBtn}
            >
              Logout
            </button>
          </div>
        </li>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
