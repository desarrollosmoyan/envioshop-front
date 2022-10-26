import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useCookie } from "react-use";

const PrivateRoute = ({
  roleTypeAllowed,
  exact,
  component: Component,
  ...rest
}) => {
  const [token] = useCookie("token");
  const roleType = localStorage.getItem("type")
    ? localStorage.getItem("type")
    : "";
  console.log(roleType);
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
        roleType === "" ? (
          <Redirect to={`${process.env.PUBLIC_URL}/auth-login`} />
        ) : !isAllowed ? (
          <Redirect
            to={`${process.env.PUBLIC_URL}/errors/404-modern`}
          ></Redirect>
        ) : token ? (
          <Component {...props} {...rest}></Component>
        ) : (
          <Redirect to={`${process.env.PUBLIC_URL}/auth-login`}></Redirect>
        )
      }
    ></Route>
  );
};

export default PrivateRoute;
