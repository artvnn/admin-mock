import React, {Fragment} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

const styles = theme => ({
  page: {
    width: "100%",
    height: "100%",
    marginTop: 0,
    padding: 20,
  },
  button: {
    marginBottom: theme.spacing.unit,
    width: "100%",
    textTransform: "none",
    boxShadow: "0px 0px",
  },
  subHeader: {
    fontSize: 12,
    fontWeight: "bold",
  },
  mailboxChild: {
    width: "100%",
    height: "100%",
    border: "1px solid #ddd",
  },
});

const SectionHeading = withStyles(styles)(props => {
  const {classes} = props;
  return (
    <Typography
      className={classes.subHeader}
      color="textSecondary"
      variant="h6"
    >
      {props.name}
    </Typography>
  );
});

class Mailbox extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      isComposing: false,
    };
  }
  composeMail = event => {
    this.setState({isComposing: true});
  };
  render() {
    if (this.state.isComposing) return <Redirect to="/mailbox/compose" />;
    const {classes} = this.props;
    return (
      <div className={classes.page}>
        <Grid container spacing={24}>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.composeMail}
            >
              Compose Mail
            </Button>
            <SectionHeading name="FOLDERS" />
            <br />
            <SectionHeading name="CATEGORIES" />
            <br />
            <SectionHeading name="LABELS" />
          </Grid>
          <Grid item xs={9}>
            <div className={classes.mailboxChild}>{this.props.children}</div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(
  connect(state => ({unRead: state.mail.unRead}))(Mailbox),
);
