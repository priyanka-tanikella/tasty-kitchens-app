import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUsernameInput = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username" className="label">
          USERNAME{' '}
        </label>
        <input
          type="text"
          onChange={this.onChangeUsername}
          id="username"
          value={username}
          className="input"
        />
      </>
    )
  }

  renderPasswordInput = () => {
    const {password, showPassword} = this.state
    const inputType = showPassword ? 'text' : 'password'
    return (
      <>
        <label htmlFor="password" className="label">
          PASSWORD
        </label>
        <input
          type={inputType}
          onChange={this.onChangePassword}
          id="password"
          value={password}
          className="input"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-container">
        <img
          src="https://res.cloudinary.com/denbtnhco/image/upload/v1681632303/Rectangle_1456_solpxs.png"
          alt="website login"
          className="login-img"
        />
        <h3 className="login-mobile-heading">Login</h3>
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://res.cloudinary.com/denbtnhco/image/upload/v1681632796/Vectorlogo_prhtzg.png"
            alt="website logo"
            className="desktop-logo-img"
          />
          <h1 className="title">Tasty Kitchens</h1>

          {this.renderUsernameInput()}
          {this.renderPasswordInput()}
          <div className="show-password-container">
            <input
              type="checkbox"
              className="show-password"
              id="show-password"
              onChange={this.onChangeShowPassword}
            />
            <label className="show-password-label" htmlFor="show-password">
              Show Password
            </label>
          </div>
          {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    )
  }
}
export default LoginForm
