import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { signin } from '../actions/userActions';
export default function SigninScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';
  const redirect2 = props.location.search
    ? props.location.search.split('=')[1]
    : '/dashboard';
    const redirect3 = props.location.search
    ? props.location.search.split('=')[1]
    : '/productlist/seller';
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: sign in action
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    if(userInfo && userInfo.isAdmin){
      props.history.push(redirect2);
    }
    if(userInfo && userInfo.isSeller){
      props.history.push(redirect3);
    }
    /*else if(userInfo && userInfo.isAdmin){
      props.history.push('/productlist');
    }*/
  }, [props.history, redirect, userInfo,redirect2,redirect3]);
  return (
    <div>
        
      <form className="form" onSubmit={submitHandler}>
        <div className="imgcontainer" >
          <img src="/SahulatLOGO.png" className="sahulat1"/>
        </div>
        <div>
          <h1 className="signh1">Sign In</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Sign In
          </button>
          <p>By signing-in, you agree to the Sahulat Store's Conditions of Use and Privacy Notice. 
              Please see our Privacy Notice, our Cookies Notice and our interest Based Ads Notice.

          </p>
        </div>
        <div>
          <label />
          <div>
          New customer?{' '}
            <Link to={`/register?redirect=${redirect}`} className="newcust">
              Create your account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}