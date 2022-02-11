import React from "react";
import { Route, Redirect } from "react-router-dom";
import { withCookies } from "react-cookie";

const PrivateRoute = ({ component: Component, cookies, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                return cookies.get("jwt") ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                        }}
                    />
                );
            }
            }
        />
    );
};

export default  withCookies(PrivateRoute);
