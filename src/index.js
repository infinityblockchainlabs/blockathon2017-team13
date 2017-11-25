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
import Home from './layouts/home/Home'
import SignUp from './layouts/signup/SignUp'
import Login from './layouts/login/Login'
import MainApp from './layouts/MainApp'
import CreateFakeData from './layouts/CreateFakeData'

// Merchant Web Demo
import MerchanDemo from './merchant/MerchantDemo'
import UserProfile from './merchant/UserProfile'
import ProductList from './merchant/ProductList'
import ProductDetails from './merchant/ProductDetails'
import PurchasedSuccess from './merchant/PurchasedSuccess'

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
            <IndexRoute component={Home} />
            <Route path="signup" component={UserIsNotAuthenticated(SignUp)} />
            <Route path="login" component={UserIsNotAuthenticated(Login)} />
            <Route path="app" component={UserIsAuthenticated(MainApp)} />
            <Route path="fake" component={CreateFakeData} />
          </Route>
          <Route path="/merchant" component={MerchanDemo}>
            <IndexRoute component={ProductList} />
            <Route path="user_profile" component={UserProfile} />
            <Route path="product" component={ProductDetails} />
            <Route path="purchased" component={PurchasedSuccess} />
          </Route>
        </Router>
      </CookiesProvider>
    </Provider>
  ),
  document.getElementById('root')
)
