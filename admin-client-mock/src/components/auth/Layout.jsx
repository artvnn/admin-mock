import React from "react";
import PropTypes from "prop-types";
import logo from "../../assets/img/Admino.png";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import teal from "@material-ui/core/colors/teal";
import amber from "@material-ui/core/colors/amber";

const styles = theme => ({
  layout: {
    textAlign: "center",
  },
  topHalf: {
    paddingTop: "70px",
    paddingBottom: "40px",
    backgroundColor: teal[700],
  },
  logo: {
    width: "150px",
    height: "150px",
  },
  logoTitle: {
    color: amber[500],
  },
  children: {
    padding: "20px",
  },
});

class MainLayout extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.layout}>
        <div className={classes.topHalf}>
          <img src={logo} className={classes.logo} alt="Admino!" />
          <Typography variant="h4" component="h4" className={classes.logoTitle}>
            AdminO!
          </Typography>
        </div>
        <div className={classes.children}>{this.props.children}</div>
      </div>
    );
  }
}

export default withStyles(styles)(MainLayout);
