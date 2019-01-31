import React from "react";
import {withStyles} from "@material-ui/core/styles";
import teal from "@material-ui/core/colors/teal";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  page: {
    backgroundColor: "#fff",
    border: `1px solid ${teal[500]}`,
    margin: 20,
    padding: 30,
  },
  time: {
    fontSize: 10,
  },
  closeButton: {
    color: "#aaa",
    fontSize: 10,
  },
});

const renderDateTime = dateTime =>
  `${dateTime.toDateString()} ${dateTime.toTimeString()}`;

class ViewMail extends React.Component {
  render() {
    const {classes} = this.props;
    const {mail, onClose} = this.props;
    return (
      <div className={classes.page}>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <Typography>From: {mail.from.name}</Typography>{" "}
          </Grid>
          <Grid
            item
            xs={6}
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-start"
          >
            <Typography className={classes.time}>
              {renderDateTime(new Date(mail.time))}
            </Typography>
          </Grid>
        </Grid>
        <Typography>
          To: {mail.to.map(person => person.name).join(", ")}
        </Typography>
        <Typography>
          CC: {mail.cc.map(person => person.name).join(", ")}
        </Typography>
        <Typography color="primary" variant="h6">
          Subject: {mail.subject}
        </Typography>
        <p>{mail.body}</p>
        <br />
        <Button
          variant="outlined"
          className={classes.closeButton}
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(ViewMail);
