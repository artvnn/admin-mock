import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../services/server";
import logo from "../Admino.png";
import personImage from "../person.png";

import PropTypes from "prop-types";
import classNames from "classnames";
import {withStyles} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import LastPageIcon from "@material-ui/icons/LastPage";
import teal from "@material-ui/core/colors/teal";
import amber from "@material-ui/core/colors/amber";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import menu from "../menu";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Collapse from "@material-ui/core/Collapse";

const drawerWidth = {open: 70, close: 240};

const matchesCurrentRoute = menuItem =>
  window.location.href.indexOf(`/${menuItem.route}`) > 0;

// Currently only supports mail
const getMenuItemIcon = menuItem =>
  menuItem.icon === "mail" ? <MailIcon /> : <InboxIcon />;

// Currently only supports mail
const getMenuItemTag = (menuItem, props) =>
  menuItem.tag === "mail" ? (
    <Typography>{`${props.unRead > -1 ? props.unRead : 0}/${
      props.totalMails
    }`}</Typography>
  ) : (
    undefined
  );

const styles = theme => ({
  root: {
    display: "flex",
  },
  appBarClosed: {
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: "0px 0px",
    backgroundColor: "#fff",
    borderBottom: "1px solid #ddd",
    width: `calc(100% - ${drawerWidth.close}px)`,
  },
  appBarOpen: {
    marginLeft: drawerWidth.open,
    width: `calc(100% - ${drawerWidth.open}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
    backgroundColor: teal[500],
    height: 36,
    width: 50,
    minWidth: 50,
    color: "#fff",
  },
  toolbar: {
    padding: 5,
    paddingRight: 20,
  },
  drawer: {
    backgroundColor: teal[800],
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth.open,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClosed: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: drawerWidth.close,
  },
  dummy: {
    color: "#999",
  },
  margin: {
    paddingTop: 5,
    bagde: amber[500],
    color: "#999",
    marginLeft: 10,
    marginRight: 20,
  },
  button: {
    color: "#999",
    textTransform: "none",
  },
  logoBox: {
    backgroundColor: teal[900],
    width: drawerWidth.close,
    height: 65,
    transition: theme.transitions.create("height", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  avatarBox: {
    backgroundColor: teal[900],
    width: drawerWidth.close,
    height: 180,
    transition: theme.transitions.create("height", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  logo: {
    width: 50,
    height: 50,
    marginTop: 7,
    padding: 5,
    marginLeft: 9,
  },
  content: {
    width: "100%",
    height: "100%",
    marginTop: 64,
  },
  hide: {
    display: "none",
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
    marginLeft: 30,
    marginTop: 40,
  },
  personName: {
    marginLeft: 30,
    color: "#fff",
    fontWeight: "bold",
  },
  designation: {
    marginLeft: 30,
    color: "#aaa",
  },
  menuLink: {
    textDecoration: "none",
  },
  selectedMenuLink: {
    color: 0,
  },
  menuText: {
    color: "#bbb",
  },
  menuItemIconOpen: {
    marginLeft: 10,
    marginRight: 0,
    color: "#bbb",
  },
  menuItemIconClosed: {
    marginLeft: 4,
    color: "#bbb",
  },
  mailsTag: {
    boxShadow: "0px 0px",
    minWidth: 40,
    minHeight: 20,
    height: 20,
    padding: 0,
    fontSize: 8,
    color: "#fff",
    borderRadius: 3,
    marginRight: 15,
  },
  menuItem: {
    marginLeft: 3,
  },
  menuItemSelected: {
    borderLeft: `3px solid ${teal[500]}`,
    backgroundColor: teal[900],
    marginLeft: 0,
  },
});

class Dashboard extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };
  state = {
    open: false,
  };
  handleToggleDrawer = () => {
    this.setState({open: !this.state.open});
  };
  renderMenuItems(props) {
    const {classes} = props;
    return menu.children.map((menuItem, index) => {
      const key =
        "/" +
        menuItem.route +
        (menuItem.dontGenerateRoute ? "/" + menuItem.children[0].route : "");
      const tag = getMenuItemTag(menuItem, props);
      const isSelected = matchesCurrentRoute(menuItem);
      return (
        <Fragment key={key}>
          <Link to={key} className={classes.menuLink}>
            <div
              className={classNames(classes.menuItem, {
                [classes.menuItemSelected]: isSelected,
              })}
            >
              <ListItem button>
                <ListItemIcon
                  className={classNames(classes.menuItemIconOpen, {
                    [classes.menuItemIconClosed]: this.state.open,
                  })}
                >
                  {getMenuItemIcon(menuItem)}
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    className: classNames(classes.menuText, {
                      [classes.hide]: this.state.open,
                    }),
                  }}
                  primary={menuItem.name}
                />
                {tag && !this.state.open && (
                  <ListItemSecondaryAction>
                    <Button
                      variant="contained"
                      className={classes.mailsTag}
                      color="secondary"
                    >
                      {tag}
                    </Button>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            </div>
          </Link>
          {menuItem.children && menuItem.children.length > 0 && (
            <Collapse
              in={isSelected && !this.state.open}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {menuItem.children.map(child => {
                  const link = `/${menuItem.route}/${child.route}`;
                  return (
                    <Link to={link} key={link} className={classes.menuLink}>
                      <ListItem button className={classes.menuItemSelected}>
                        <ListItemText
                          inset
                          primaryTypographyProps={{
                            className: classNames(classes.menuText, {
                              [classes.hide]: this.state.open,
                            }),
                          }}
                          primary={child.name}
                        />
                      </ListItem>
                    </Link>
                  );
                })}
              </List>
            </Collapse>
          )}
        </Fragment>
      );
    });
  }
  render() {
    const {classes, theme} = this.props;
    return (
      <div className={classes.root}>
        <AppBar
          color="default"
          position="fixed"
          className={classNames(classes.appBarClosed, {
            [classes.appBarOpen]: this.state.open,
          })}
        >
          <Toolbar className={classes.toolbar}>
            <Button
              className={classes.menuButton}
              onClick={this.handleToggleDrawer}
            >
              <MenuIcon />
            </Button>
            <Typography className={classes.dummy} style={{width: "80%"}}>
              Search for something...
            </Typography>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="flex-start"
            >
              <Badge
                className={classes.margin}
                badgeContent={this.props.unRead > 0 ? this.props.unRead : 0}
                color="secondary"
              >
                <MailIcon />
              </Badge>
              <Badge
                className={classes.margin}
                badgeContent={8}
                color="primary"
              >
                <NotificationsIcon />
              </Badge>
              <Button className={classes.button} onClick={logout}>
                <LastPageIcon />
                Log out
              </Button>
            </Grid>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClosed]: !this.state.open,
          })}
          classes={{
            paper: classNames(classes.drawer, {
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClosed]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <div
            className={classNames(classes.logoBox, {
              [classes.avatarBox]: !this.state.open,
            })}
          >
            <img
              src={logo}
              className={classNames(classes.logo, {
                [classes.hide]: !this.state.open,
              })}
              alt="Admino!"
            />
            <Avatar
              alt={this.props.user.name}
              src={personImage}
              className={classNames(classes.bigAvatar, {
                [classes.hide]: this.state.open,
              })}
            />
            <Typography
              className={classNames(classes.personName, {
                [classes.hide]: this.state.open,
              })}
            >
              {this.props.user.name}
            </Typography>
            <Typography
              className={classNames(classes.designation, {
                [classes.hide]: this.state.open,
              })}
            >
              {this.props.user.designation}
            </Typography>
          </div>
          <List>{this.renderMenuItems(this.props)}</List>
        </Drawer>
        <main className={classes.content}>{this.props.children}</main>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(
  connect(state => ({
    user: state.auth.user,
    unRead: state.mail.unRead,
    totalMails: state.mail.in.length,
  }))(Dashboard),
);
