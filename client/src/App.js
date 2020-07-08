import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

//import PostList from './components/posts/PostList';

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import Routes from "./routes/Routes";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import "./assets/scss/index.scss";
import validate from "validate.js";
import validators from "./common/validators";

validate.validators = {
  ...validate.validators,
  ...validators,
};

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
