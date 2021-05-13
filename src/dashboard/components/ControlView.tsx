import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

// interface ControlViewProps {
//   comment: {
//     state: string;
//   };
// }

function ControlView(): React.ReactElement {
  const classes = useStyles();
  return (
    <>
      <Button variant="outlined" color="primary" className={classes.button}>
        점검 시작
      </Button>
      <Button variant="outlined" color="secondary" className={classes.button}>
        점검 종료
      </Button>
      <Button
        variant="outlined"
        style={{ color: green[600], borderColor: green[600] }}
        className={classes.button}
      >
        결과 출력
      </Button>
    </>
  );
}

export default ControlView;
