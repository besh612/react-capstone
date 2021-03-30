import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import Appbar from "../components/Appbar";
import Dashboard from "../dashboard/Dashboard";
import CustomDrawer from "../components/Drawer";
import Copyright from "../components/Copyright";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

function Main() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Appbar open={open} handleDrawerOpen={handleDrawerOpen} />
      <CustomDrawer open={open} handleDrawerClose={handleDrawerClose} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          <Dashboard />
        </Container>
        <Copyright />
      </main>
    </div>
  );
}
export default Main;
