import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  roleTypeAllowed,
  exact,
  component: Component,
  ...rest
}) => {
  const auth = localStorage.getItem("accessToken");
  const roleType = JSON.parse(localStorage.getItem("userData")).type;
  let isAllowed =
    roleTypeAllowed instanceof Array
      ? roleTypeAllowed.includes(roleType)
      : roleTypeAllowed
      ? roleType === roleTypeAllowed
      : false;

  console.log(isAllowed);
  return (
    <Route
      exact={exact ? true : false}
      rest
      render={(props) =>
        !isAllowed ? (
          <Redirect
            to={`${process.env.PUBLIC_URL}/errors/404-modern`}
          ></Redirect>
        ) : auth ? (
          <Component {...props} {...rest}></Component>
        ) : (
          <Redirect to={`${process.env.PUBLIC_URL}/auth-login`}></Redirect>
        )
      }
    ></Route>
  );
};

export default PrivateRoute;
