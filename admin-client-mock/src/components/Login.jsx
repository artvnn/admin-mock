import React from "react";
import {connect} from "react-redux";
import {authState} from "../services/reducers/auth";
import {login} from "../services/server";
import MainLayout from "./MainLayout";

import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
    width: "200px",
  },
});

class Login extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      username: "admin",
      password: "pwd123",
    };
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  onLogin = event => {
    const {username, password} = this.state;
    login(username, password);
  };
  render() {
    const {classes} = this.props;
    const {username, password} = this.state;
    const currentAuthState = this.props.authState;
    if (
      !(
        currentAuthState === authState.NOT_AUTHENTICATED ||
        currentAuthState === authState.ERROR
      )
    )
      return "";
    return (
      <MainLayout>
        <form className={classes.container} noValidate autoComplete="off">
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <TextField
                required
                id="standard-required"
                label="Username"
                defaultValue={username}
                className={classes.textField}
                onChange={this.handleChange("username")}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="standard-required"
                label="Password"
                type="password"
                defaultValue={password}
                className={classes.textField}
                onChange={this.handleChange("password")}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.onLogin}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </MainLayout>
    );
  }
}

export default withStyles(styles)(
  connect(state => ({authState: state.auth.state}))(Login),
);
