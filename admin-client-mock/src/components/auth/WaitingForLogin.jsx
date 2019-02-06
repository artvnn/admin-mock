import React from "react";
import MainLayout from "./Layout";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

function WaitingForLogin(props) {
  const {classes} = props;
  return (
    <MainLayout>
      <CircularProgress className={classes.progress} thickness={7} />
    </MainLayout>
  );
}

WaitingForLogin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WaitingForLogin);
