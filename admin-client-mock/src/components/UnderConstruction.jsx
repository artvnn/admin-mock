import React from "react";
import underConstructionImage from "../404.png";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import teal from "@material-ui/core/colors/teal";

const styles = {
  page: {
    width: "100%",
    height: "100%",
    textAlign: "center",
  },
  img: {
    marginTop: -50,
    width: 400,
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
  },
  title: {
    marginTop: 100,
    fontWeight: "bold",
  },
  message: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 600,
    color: teal[500],
  },
};

function UnderConstruction(props) {
  const {classes} = props;
  return (
    <div className={classes.page}>
      <Typography className={classes.title} variant="h5">
        {props.title}
      </Typography>
      <Typography className={classes.message}>
        Sorry, this section is under construction!
      </Typography>
      <img
        src={underConstructionImage}
        className={classes.img}
        alt="Under construction"
      />
    </div>
  );
}

export default withStyles(styles)(UnderConstruction);
