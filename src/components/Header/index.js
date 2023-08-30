import {withRouter, Link} from 'react-router-dom'

import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'

import Cookies from 'js-cookie'
import {Component} from 'react'

import CartContext from '../../context/CartContext'

import './index.css'

class Header extends Component {
  state = {showMenu: false}

  onClickLogoutBtn = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  onClickHamburger = () => {
    this.setState(prevState => ({showMenu: !prevState.showMenu}))
  }

  onClickCloseBtn = () => {
    this.setState({showMenu: false})
  }

  renderCartListCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartListCount = cartList.length

        return cartListCount > 0 ? (
          <span className="cart-count-badge">{cartListCount}</span>
        ) : null
      }}
    </CartContext.Consumer>
  )

  render() {
    const {showMenu} = this.state
    const {match} = this.props
    const {path} = match

    const homeClassName =
      path === '/' ? 'home-active-link-page' : 'home-link-page'
    const cartClassName =
      path === '/cart' ? 'cart-active-link-page' : 'cart-link-page'
    return (
      <>
        <nav className="navbar-container">
          <Link to="/" className="link-item">
            <div className="mobile-logo-and-title-container">
              <img
                src="https://res.cloudinary.com/denbtnhco/image/upload/v1681632796/Vectorlogo_prhtzg.png"
                alt="website logo"
                className="mobile-logo"
              />
              <h1 className="mobile-title">Tasty Kitchens</h1>
            </div>
          </Link>

          <div className="hamburger-menu-container">
            <button
              type="button"
              className="hamburger-btn"
              onClick={this.onClickHamburger}
            >
              <GiHamburgerMenu size="25" />
            </button>
          </div>

          <div>
            <ul className="home-cart-logout-container">
              <li className="nav-item">
                <Link to="/" className="link-item">
                  <p className={homeClassName}> Home</p>
                </Link>
              </li>

              <li className="nav-item cart">
                <Link to="/cart" className="link-item">
                  <p className={cartClassName}> Cart</p>
                </Link>
                {this.renderCartListCount()}
              </li>

              <li className="nav-item">
                <button
                  type="button"
                  className="logout-button"
                  onClick={this.onClickLogoutBtn}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>

        {showMenu ? (
          <>
            <div className="mobile-menu">
              <div className="mobile-menu-container">
                <ul className="mobile-menu-container">
                  <li className="nav-item">
                    <Link to="/" className="link-item">
                      <p className={homeClassName}> Home</p>
                    </Link>
                  </li>

                  <li className="nav-item cart">
                    <Link to="/cart" className="link-item ">
                      <p className={cartClassName}> Cart</p>
                    </Link>
                    {this.renderCartListCount()}
                  </li>
                </ul>
                <button
                  type="button"
                  className="logout-button"
                  onClick={this.onClickLogoutBtn}
                >
                  Logout
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="header-close-button"
                  onClick={this.onClickCloseBtn}
                >
                  <AiFillCloseCircle size="25" className="cross-icon" />
                </button>
              </div>
            </div>
          </>
        ) : null}
      </>
    )
  }
}
export default withRouter(Header)
