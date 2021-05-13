import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import Login from "./login/LoginPage";
import Main from "./main/MainPage";
import Appbar from "./components/Appbar";
import Dashboard from "./dashboard/Dashboard";
import Project from "./project/Project";
import CustomDrawer from "./components/Drawer";
import Copyright from "./components/Copyright";

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

function App(): React.ReactElement {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <Appbar open={open} handleDrawerOpen={handleDrawerOpen} />
        <CustomDrawer open={open} handleDrawerClose={handleDrawerClose} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="xl" className={classes.container}>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route path="/dashboard/:id" component={Dashboard} />
              <Route path="/project/:id" component={Project} />
              <Route path="/login" component={Login} />
              <Route path="*" component={Main} />
            </Switch>
          </Container>
          <Copyright />
        </main>
      </div>
    </Router>
  );
}

export default withRouter(App);
