import React, {useState} from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import AdminRoute from './components/AdminRoute';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import { ConditionallyRender } from "react-util-kit";
import Chatbot from 'react-chatbot-kit';
import config from "./chatbot/config";
import ActionProvider from "./chatbot/ActionProvider";
import MessageParser from "./chatbot/MessageParser";
import './App.css';
import ProductListScreen from './screens/ProductListScreen';
//hey
function App() {

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const openMenu =()=>{
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu=()=>{
    document.querySelector(".sidebar").classList.remove("open");
  }

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const [showChatbot, toggleChatbot] = useState(false);
  return (
    <BrowserRouter>
    
    <div className="App">
      <header>
        <div className="bot">
        <ConditionallyRender
            ifTrue={showChatbot}
            show={
              <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
              />
            }
          /> 
          <button
          className="app-chatbot-button"
          onClick={() => toggleChatbot((prev) => !prev)}
        >SahulatBot</button>
        </div>
      </header>
    </div>

    <div className="grid-container">
      <header className="row">
        <div>
        <button className="open-button" onClick={openMenu}>&#9776;</button>
        <Link className="brand" to="/"> Sahulat Store</Link>
         
        </div>
        <div className="cart-sign">
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
        </div>
      </header>
      <aside className="sidebar">
               
                <h2>
                &nbsp;
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                  &nbsp; Shopping Categories
                  </h2>
                <button className="sidebar-close-button" onClick={closeMenu}>X</button>
                <ul>
                    <li><a href="index.html">Pants</a></li>
                    <li><a href="index.html">Shirts</a></li>
                </ul>
      </aside>
      <main>
        <Route path="/cart/:id?" component={CartScreen}></Route>
        <Route path="/product/:id" component={ProductScreen}></Route>
        <Route path="/" component={HomeScreen} exact></Route>
        <Route path="/signin" component={SigninScreen}></Route>
        <Route path="/register" component={RegisterScreen}></Route>
        <Route path="/shipping" component={ShippingAddressScreen}></Route>
        <Route path="/payment" component={PaymentMethodScreen}></Route>
        <Route path="/placeorder" component={PlaceOrderScreen}></Route>
        <Route path="/order/:id" component={OrderScreen}></Route>
        <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
        <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
          ></AdminRoute>
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
    </BrowserRouter>
  );
}

export default App;