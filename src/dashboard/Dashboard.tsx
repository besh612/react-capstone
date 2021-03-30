import React from "react";
import { Button, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import Chart from "./components/ModelView";
import PictureView from "./components/PictureView";
import Orders from "./components/Orders";
import CrackView from "./components/CrackView";
import CommentView from "./components/CommentView";
import MapView from "./components/MapView";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeightRow1: {
    height: 450,
  },
  fixedHeightRow2: {
    height: 270,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function Dashboard() {
  const classes = useStyles();
  const row1 = clsx(classes.paper, classes.fixedHeightRow1);
  const row2 = clsx(classes.paper, classes.fixedHeightRow2);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={row1}>
            <Chart />
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={row1}>
            <PictureView />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={row1}>
            <CrackView />
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={row2}>
            <Chart />
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={row2}>
            <CommentView />
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={row2}>
            <MapView />
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={row2}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
            >
              점검 시작
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              className={classes.button}
            >
              점검 종료
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
export default Dashboard;
