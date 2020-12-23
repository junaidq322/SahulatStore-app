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
import './footer.css';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerPage';
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
        ><div className="Strongbot">SahulatBot</div></button>
        </div>
      </header>
    </div>

    <div className="grid-container">
      <header className="row">
        <div>
        <button className="open-button" onClick={openMenu}>&#9776;</button>
        
         {userInfo && !userInfo.isAdmin && (
           <Link className="brand" to="/"> Sahulat Store</Link>
         )}
         {!userInfo && (<Link className="brand" to="/"> Sahulat Store</Link>)}
         {userInfo && userInfo.isAdmin && (
           <Link className="brand"> Sahulat Store</Link>
         )}
        </div>
        <div className="cart-sign">
          {userInfo && !userInfo.isSeller && !userInfo.isAdmin &&(
            <button className="primary" type="submit">
            <strong>Become a Seller</strong>
          </button>
          )}
          {userInfo && !userInfo.isAdmin && (
            <Link to="/cart">
            Cart
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
          </Link>
          )}
          {!userInfo && (
            <Link to="/cart">
            Cart
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
          </Link>
          )}
            
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  {!userInfo.isAdmin && (
                    <li>
                    <Link to="/orderhistory">Order History</Link>
                    </li>
                  )}
                  
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
            
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#admin">
                  Seller <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist/seller">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist/seller">Orders</Link>
                  </li>
                </ul>
              </div>
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
                    <li><a href="index.html">Accessories</a></li>
                    <li><a href="index.html">Clothing</a></li>
                    <li><a href="index.html">Others</a></li>
                </ul>
      </aside>
      <main>
        <Route path="/seller/:id" component={SellerScreen}></Route>
        <Route path="/cart/:id?" component={CartScreen}></Route>
        <Route path="/product/:id" component={ProductScreen} exact></Route>
        <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
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
            exact
          ></AdminRoute>
           <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
            exact
          ></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>
          <SellerRoute
            path="/productlist/seller"
            component={ProductListScreen}
          ></SellerRoute>
          <SellerRoute
            path="/orderlist/seller"
            component={OrderListScreen}
          ></SellerRoute>
      </main>
      {/* <footer className="row center">All right reserved</footer> */}
      
      
    <div className="footer_container">
    <footer className="footer">
        <div className="l-footer">
          <h1>
          <div className="img-container">
            <img src="../SahulatLOGO.png" alt="" className="logo"/>
          </div>
          </h1>
          <p>
          Sahualt store first made waves in Pakistan’s e-commerce market. 
          Our vision is to provide a safe, efficient online marketplace platform for vendors and 
          customers across the country to come together. Sahulat Store prides itself on not being 
          just another ecommerce venture in Asia. We work tirelessly to make sure that we provide 
          users with the best online online shopping experience and value for their purchases. 
          </p>
          <div className="socials">
            <a href="#"><i className="fa fa-facebook"></i></a>
            <a href="#"><i className="fa fa-twitter"></i></a>
            <a href="#"><i className="fa fa-pinterest"></i> </a>
            <a href="#"><i className="fa fa fa-dribbble"></i> </a>
          </div>
          </div>
        <ul className="r-footer">
        <li>
          <h2>Social</h2>
          <ul class="box">
            <li><a href="#"><i className="fa fa-facebook"></i> Facebook</a></li>
            <li><a href="#"><i className="fa fa-twitter"></i> Twitter</a></li>
            <li><a href="#"><i className="fa fa-pinterest"></i> Pinterest</a></li>
            <li><a href="#"><i className="fa fa-dribbble"></i> Dribbble</a></li>
          </ul>
        </li>
        <li className="features">
          <h2>Information</h2>
          <ul className="box h-box">
            <li><a href="#">Blog</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Sales</a></li>
          </ul>
        </li>
        <li className="privacy">
          <h2>Legal</h2>
          <ul className="box y-box">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Contract</a></li>
          </ul>
        </li>
        </ul>
        <div className="b-footer">
        <p>
        All rights reserved by ©SahulatStore 2020 </p>
        </div>
    </footer>
    </div>
    </div>
    </BrowserRouter>
  );
}

export default App;