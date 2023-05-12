import {withRouter, Link} from 'react-router-dom'

import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'

import Cookies from 'js-cookie'
import {Component} from 'react'

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
        <nav className="navbar-mobile-view">
          <ul>
            <li className="nav-item">
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
            </li>
            <li className="nav-item">
              <div className="hamburger-menu-container">
                <button
                  type="button"
                  className="hamburger-btn"
                  onClick={this.onClickHamburger}
                >
                  <GiHamburgerMenu size="25" />
                </button>
              </div>
            </li>

            <li className="nav-item">
              <div className="home-cart-logout-container">
                <li className="nav-item">
                  <Link to="/" className="link-item">
                    <p className={homeClassName}> Home</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/cart" className="link-item">
                    <p className={cartClassName}> Cart</p>
                  </Link>
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
              </div>
            </li>
          </ul>
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

                  <li className="nav-item">
                    <Link to="/cart" className="link-item">
                      <p className={cartClassName}> Cart</p>
                    </Link>
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
                  className="close-button"
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
