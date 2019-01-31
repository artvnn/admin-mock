import React, {Fragment} from "react";
import Select from "react-select";
import {connect} from "react-redux";
import {sendMail, validateMail} from "../services/mail";
import {Redirect} from "react-router-dom";
import Errors from "./Errors";
import Inbox from "./Inbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = theme => ({
  toCC: {
    width: "100%",
    marginBottom: 10,
    font: "400 11px system- ui",
  },
  subject: {
    width: "100%",
    border: "1px solid #ddd",
    padding: 10,
    height: 30,
    marginBottom: 10,
  },
  body: {
    width: "100%",
    height: 250,
    border: "1px solid #ddd",

    padding: 10,
  },
});

class ComposeMail extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      to: [],
      cc: [],
      subject: "",
      body: "",
      isDone: false,
      validationErrors: [],
    };
  }
  update = event => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  };
  addTo = contacts => {
    this.setState({
      to: contacts.map(contact => ({id: contact.value, name: contact.label})),
    });
  };
  addCC = contacts => {
    this.setState({
      cc: contacts.map(contact => ({id: contact.value, name: contact.label})),
    });
  };
  sendMail = event => {
    const {to, cc, subject, body} = this.state;
    const errors = validateMail(to, cc, subject, body);
    if (errors.length > 0) {
      this.setState({validationErrors: errors});
    } else {
      sendMail(to, cc, subject, body, (err, result) => {
        if (!err) this.setState({isDone: true});
        else {
          this.setState({validationErrors: [err.toString()]});
        }
      });
    }
  };
  handleClose = event => {
    this.setState({isDone: true});
  };
  render() {
    const {contacts, classes} = this.props;
    const {subject, body, isDone, validationErrors} = this.state;
    if (isDone) {
      return <Redirect to="/mailbox/inbox" />;
    }
    return (
      <Fragment>
        <Inbox />
        <Dialog
          open={true}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
          maxWidth="lg"
          fullWidth={true}
        >
          <DialogTitle id="form-dialog-title">Compose Mail</DialogTitle>
          <DialogContent>
            {validationErrors.length > 0 && (
              <Errors errors={validationErrors} />
            )}
            <Select
              className={classes.toCC}
              options={contacts.map(contact => ({
                label: contact.name,
                value: contact.id,
              }))}
              isMulti={true}
              placeholder="To"
              onChange={this.addTo}
              hideSelectedOptions={true}
            />
            <Select
              className={classes.toCC}
              options={contacts.map(contact => ({
                label: contact.name,
                value: contact.id,
              }))}
              isMulti={true}
              placeholder="CC"
              onChange={this.addCC}
              hideSelectedOptions={true}
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={subject}
              onChange={this.update}
              className={classes.subject}
            />
            <textarea
              className={classes.body}
              name="body"
              placeholder="Body"
              value={body}
              onChange={this.update}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.sendMail} color="primary">
              Send
            </Button>
            <Button onClick={this.handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default withStyles(styles)(
  connect(state => ({
    contacts: state.auth.user.contacts,
  }))(ComposeMail),
);
