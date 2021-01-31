import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function UserRoute({ component: Component, ...rest }) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <Route
      {...rest}
      render={(props) =>
        (!userInfo || (userInfo && !userInfo.isAdmin && !userInfo.isSeller)) ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/productlist" />
        )
      }
    ></Route>
  );
}