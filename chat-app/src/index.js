import React, {addReducer, setGlobal} from 'reactn';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import initReactnPersist from 'reactn-persist'



initReactnPersist({
    storage: localStorage,
    whitelist: ["user"],
    key: "@reactn",
});


if (localStorage.getItem("@reactn")) {
    let old = JSON.parse(localStorage.getItem("@reactn"));

    setGlobal(old);
} else {
    setGlobal({
        snackbarOpen: false,
        snackbarColor: "success",
        snackbarMsg: "Loading...",
        user: {},
        notif: []
    });
}

addReducer("openSnackbar", (global, dispatch, data) => ({
    snackbarOpen: data.open,
    snackbarColor: data.color,
    snackbarMsg: data.msg,
}));

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
