import {Component} from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import RestaurantDetails from './components/RestaurantDetails'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'
import './App.css'

const initializeCartList = () => {
  const cartList = localStorage.getItem('cartData')

  if (cartList === null) {
    return []
  }
  return JSON.parse(cartList)
}

class App extends Component {
  state = {cartList: initializeCartList(), isOrderPlaced: false}

  addCartItem = item => {
    this.setState(
      prevState => ({
        isOrderPlaced: false,
        cartList: [...prevState.cartList, item],
      }),
      this.updateLocalStorage,
    )
  }

  getQuantityOfItem = id => {
    const {cartList} = this.state
    const currentItem = cartList.find(item => item.id === id)
    return currentItem === undefined ? 0 : currentItem.quantity
  }

  removeCartItem = id => {
    this.setState(
      prevState => ({
        cartList: prevState.cartList.filter(item => item.id !== id),
      }),
      this.updateLocalStorage,
    )
  }

  increaseQuantity = id => {
    this.setState(
      prevState => ({
        cartList: prevState.cartList.map(item => {
          if (item.id === id) {
            return {...item, quantity: item.quantity + 1}
          }
          return item
        }),
      }),
      this.updateLocalStorage,
    )
  }

  decreaseQuantity = id => {
    this.setState(
      prevState => ({
        cartList: prevState.cartList.map(item => {
          if (item.id === id) {
            return {...item, quantity: item.quantity - 1}
          }
          return item
        }),
      }),
      this.updateLocalStorage,
    )
  }

  placeOrder = () => {
    this.setState({cartList: [], isOrderPlaced: true}, this.updateLocalStorage)
  }

  updateLocalStorage = () => {
    const {cartList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartList))
  }

  render() {
    const {cartList, isOrderPlaced} = this.state

    const cartContextValue = {
      cartList,
      isOrderPlaced,
      placeOrder: this.placeOrder,
      addCartItem: this.addCartItem,
      getQuantityOfItem: this.getQuantityOfItem,
      removeCartItem: this.removeCartItem,
      increaseQuantity: this.increaseQuantity,
      decreaseQuantity: this.decreaseQuantity,
    }
    return (
      <CartContext.Provider value={cartContextValue}>
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={RestaurantDetails}
          />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}
export default App
