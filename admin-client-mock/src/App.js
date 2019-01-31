import React, {Fragment, Component} from "react";
import {Route, withRouter} from "react-router-dom";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import UnderConstruction from "./components/UnderConstruction.jsx";
import WaitingForLogin from "./components/WaitingForLogin";
import LoginError from "./components/LoginError";
import {connect} from "react-redux";
import {authState} from "./services";
import CssBaseline from "@material-ui/core/CssBaseline";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import teal from "@material-ui/core/colors/teal";
import amber from "@material-ui/core/colors/amber";
import menu from "./menu";

const theme = createMuiTheme({
  palette: {
    primary: {main: teal[500]},
    secondary: {main: amber[500]},
  },
  typography: {useNextVariants: true},
});

// Recursive
function renderMenuRoute(parentRoute, menuItem) {
  let result = [];
  const route = `${parentRoute}${menuItem.route}`;
  if (!menuItem.dontGenerateRoute) {
    if (menuItem.render) {
      result.push(<Route key={route} path={route} render={menuItem.render} />);
    } else {
      result.push(
        <Route
          key={route}
          path={route}
          render={() => <UnderConstruction title={menuItem.name} />}
        />,
      );
    }
  }
  if (menuItem.children) {
    result = result.concat(
      menuItem.children
        .map(child => renderMenuRoute(`${route}/`, child))
        .flat(),
    );
  }
  return result;
}

class App extends Component {
  render() {
    const currentAuthState = this.props.authState;
    return (
      <MuiThemeProvider theme={theme}>
        <Fragment>
          <CssBaseline />
          {currentAuthState === authState.NOT_AUTHENTICATED && <Login />}
          {currentAuthState === authState.LOGGING_IN && <WaitingForLogin />}
          {currentAuthState === authState.AUTHENTICATED && (
            <Dashboard>{renderMenuRoute("", menu)}</Dashboard>
          )}
          {currentAuthState === authState.ERROR && <LoginError />}
        </Fragment>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(
  connect(state => ({authState: state.auth.state}))(App),
);
