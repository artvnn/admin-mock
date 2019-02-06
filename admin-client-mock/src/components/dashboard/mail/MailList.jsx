import React, {Fragment} from "react";
import ViewMail from "./ViewMail";
import {mailWasViewed} from "../../../services/mail";
import {loadMailbox, deleteMails} from "../../../services/mail";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import RefreshIcon from "@material-ui/icons/Refresh";
import DeleteIcon from "@material-ui/icons/Delete";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import classNames from "classnames";

const styles = theme => ({
  page: {
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
  },
  title: {
    color: "#555",
  },
  body: {},
  button: {
    textTransform: "none",
    color: "#888",
    marginRight: 5,
  },
  emailItem: {
    padding: 0,
    paddingRight: 20,
    borderTop: "1px solid #ddd",
    width: "100%",
    color: "#888",
  },
  emailItemUnread: {
    backgroundColor: "#efefef",
  },
  emailItemDetailText: {
    paddingTop: 13,
  },
  emailItemDetailTextUnread: {
    paddingTop: 13,
    fontWeight: "bold",
  },
  noItems: {
    padding: 20,
    borderTop: "1px solid #ddd",
    width: "100%",
  },
  check: {
    paddingLeft: 16,
  },
});

const renderFirstColumn = val => {
  if (val instanceof Array) {
    return val.map(item => item.name).join(", ");
  } else return val.name;
};
const isToday = dateTime => {
  const today = new Date();
  return (
    dateTime.getDate() === today.getDate() &&
    dateTime.getMonth() === today.getMonth() &&
    dateTime.getFullYear() === today.getFullYear()
  );
};
const to2Digits = num => (num < 10 ? `0${num}` : num.toString());
const monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const renderTime = dateTime => {
  if (isToday(dateTime)) {
    // Render only time
    return `${dateTime.getHours()}:${to2Digits(dateTime.getMinutes())}`;
  } else {
    // Only day
    return `${monthName[dateTime.getMonth()]} ${dateTime.getDate()}`;
  }
};

class MailList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIds: [],
      isViewing: false,
      mailBeingViewed: undefined,
    };
  }
  viewMail = mail => {
    if (this.state.isViewing && mail.id === this.state.mailBeingViewed.id) {
      this.closeMailView();
      return;
    }
    this.setState({isViewing: true, mailBeingViewed: mail});
    if (this.props.isInbox) {
      mailWasViewed(mail.id);
    }
  };
  closeMailView = () => {
    this.setState({isViewing: false, mailBeingViewed: undefined});
  };
  selectToggle = mail => {
    const pos = this.state.selectedIds.indexOf(mail.id);
    if (pos > -1) {
      this.setState({
        selectedIds: this.state.selectedIds.filter(id => id !== mail.id),
      });
    } else {
      this.setState({selectedIds: this.state.selectedIds.concat(mail.id)});
    }
  };
  handleDelete = event => {
    const {selectedIds} = this.state;
    if (selectedIds.length > 0) {
      deleteMails(this.props.isInbox, selectedIds);
    }
  };
  render() {
    const {name, list, showUnread, firstColumn, classes} = this.props;
    const {isViewing, mailBeingViewed, selectedIds} = this.state;
    return (
      <div className={classes.page}>
        <div className={classes.header}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Typography className={classes.title} variant="h5">{`${name} (${
                list.length
              })`}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Button
                size="small"
                variant="outlined"
                onClick={loadMailbox}
                className={classes.button}
              >
                <RefreshIcon className={classes.button} />
                Refresh
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={this.handleDelete}
                className={classes.button}
              >
                <DeleteIcon className={classes.button} />
              </Button>
            </Grid>
          </Grid>
        </div>
        <div className={classes.body}>
          {list.length > 0 && (
            <List component="div" disablePadding>
              {list.map(mail => (
                <MailItem
                  key={mail.id}
                  mail={mail}
                  clickHandler={this.viewMail}
                  showUnread={showUnread}
                  firstColumn={firstColumn}
                  selected={selectedIds.indexOf(mail.id) > -1}
                  selectHandler={this.selectToggle}
                  expand={isViewing && mailBeingViewed.id === mail.id}
                  classes={classes}
                />
              ))}
            </List>
          )}
          {list.length < 1 && (
            <Typography className={classes.noItems}>No mails.</Typography>
          )}
        </div>
      </div>
    );
  }
}

class MailItem extends React.Component {
  handleClick = event => {
    this.props.clickHandler(this.props.mail);
  };
  handleCheck = event => {
    this.props.selectHandler(this.props.mail);
  };
  render() {
    const {classes} = this.props;
    const {mail, showUnread, firstColumn, selected, expand} = this.props;
    const isUnread = showUnread && !mail.isViewed;
    return (
      <Fragment>
        <ListItem
          button
          className={classNames(classes.emailItem, {
            [classes.emailItemUnread]: isUnread,
          })}
        >
          <Grid container spacing={8}>
            <Grid item xs={1}>
              <Checkbox
                className={classes.check}
                value={selected}
                color="primary"
                onChange={this.handleCheck}
              />
            </Grid>
            <Grid item xs={3} onClick={this.handleClick}>
              <Typography
                className={classNames(classes.emailItemDetailText, {
                  [classes.emailItemDetailTextUnread]: isUnread,
                })}
              >
                {renderFirstColumn(mail[firstColumn])}
              </Typography>
            </Grid>
            <Grid item xs={6} onClick={this.handleClick}>
              <Typography
                className={classNames(classes.emailItemDetailText, {
                  [classes.emailItemDetailTextUnread]: isUnread,
                })}
              >
                {mail.subject}
              </Typography>
            </Grid>
            <Grid item xs={2} onClick={this.handleClick}>
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="flex-start"
              >
                <Typography
                  className={classNames(classes.emailItemDetailText, {
                    [classes.emailItemDetailTextUnread]: isUnread,
                  })}
                >
                  {renderTime(new Date(mail.time))}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </ListItem>
        {expand && <ViewMail mail={mail} onClose={this.handleClick} />}
      </Fragment>
    );
  }
}

export default withStyles(styles)(MailList);
