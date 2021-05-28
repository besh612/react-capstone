import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

interface ControlViewProps {
  handleCrackSave: () => void;
}

function ControlView({
  handleCrackSave,
}: ControlViewProps): React.ReactElement {
  const classes = useStyles();
  return (
    <>
      <Button variant="outlined" color="primary" className={classes.button}>
        점검 시작
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        className={classes.button}
        onClick={handleCrackSave}
      >
        점검 종료
      </Button>
    </>
  );
}

export default ControlView;
