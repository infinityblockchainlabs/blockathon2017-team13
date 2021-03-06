import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated, UserIsNotAuthenticated } from './util/wrappers.js'
import getWeb3 from './util/web3/getWeb3'

// User App
import App from './App'
import Login from './layouts/login/Login'
import MainApp from './layouts/MainApp'
import CreateFakeData from './layouts/CreateFakeData'
import Redeem from './layouts/redeem/Redeem'

// Merchant Web Demo
import MerchantDemo from './merchant/MerchantDemo'
import UserProfile from './merchant/UserProfile'
import ProductList from './merchant/ProductList'
import ProductDetails from './merchant/ProductDetails'
import PurchasedSuccess from './merchant/PurchasedSuccess'
import Cart from './merchant/Cart'

// Redux Store
import store from './store'

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

// Initialize web3 and set in Redux.
getWeb3
.then(results => {
  console.log('Web3 initialized!')
})
.catch(() => {
  console.log('Error in web3 initialization.')
})

ReactDOM.render((
    <Provider store={store}>
      <CookiesProvider>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute component={UserIsNotAuthenticated(Login)} />
            <Route path="login" component={UserIsNotAuthenticated(Login)} />
            <Route path="app" component={UserIsAuthenticated(MainApp)} />
            <Route path="fake" component={CreateFakeData} />
            <Route path="redeem" component={UserIsAuthenticated(Redeem)} />
          </Route>
          <Route path="/merchant" component={MerchantDemo}>
            <IndexRoute component={ProductList} />
            <Route path="user_profile" component={UserProfile} />
            <Route path="product" component={ProductDetails} />
            <Route path="purchased" component={PurchasedSuccess} />
            <Route path="cart" component={Cart} />
          </Route>
        </Router>
      </CookiesProvider>
    </Provider>
  ),
  document.getElementById('root')
)
