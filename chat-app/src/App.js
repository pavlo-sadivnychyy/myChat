import React from 'react'
import LoginPage from "./pages/LoginPage/LoginPage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import PrivateRoute from "./routes/PrivatRoute";
import indexRoutes from "./routes/indexRoutes";
import { CookiesProvider } from "react-cookie";
import ModalContainer from "./components/Modal/ModalContainer";
import Snackbar from "./components/Snackbar";
import {useGlobal} from "reactn";

function App() {

  const [snackbarOpen, setSnackbarOpen] = useGlobal("snackbarOpen");
  const [snackbarColor] = useGlobal("snackbarColor");
  const [snackbarMsg] = useGlobal("snackbarMsg");

  return (
      <div style={{height: '100%'}}>
        <Snackbar
            place="tc"
            open={snackbarOpen}
            color={snackbarColor}
            onClose={() => setSnackbarOpen(false)}
            message={
              <span style={{ fontWeight: "400" }}>{snackbarMsg}</span>
            }
            close
        />
        <CookiesProvider>
          <BrowserRouter>
            <Switch>

              <Route path="/login" component={LoginPage} />

              <Route path="/registration" component={RegistrationPage}/>

              {indexRoutes.map((prop, key) => {
                return (
                    <PrivateRoute
                        path={prop.path}
                        component={prop.component}
                        key={key}
                    />

                );
              })}

            </Switch>
          </BrowserRouter>
        </CookiesProvider>
        <ModalContainer />
      </div>
  );
}

export default App;
