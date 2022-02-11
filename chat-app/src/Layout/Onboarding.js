import NavBar from "../components/navbar/NavBar";
import userRoutes from "../routes/userRoutes";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";


function Onboarding(){


    return(
        <div>
            <NavBar/>
                <Switch>
                    {userRoutes.map((prop, key) => {
                        if (prop.redirect)
                            return (
                                <Redirect
                                    from={prop.path}
                                    to={prop.to}
                                    key={key}
                                />
                            );
                        return (
                            <Route
                                exact
                                path={prop.path}
                                component={prop.component}
                                key={key}
                            />
                        );
                    })}
                </Switch>
        </div>

    )
}
export default withRouter(Onboarding);