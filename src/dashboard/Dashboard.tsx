import React, { useEffect, useState } from "react";
import clsx from "clsx";
import axios from "axios";
import { Grid, Paper, LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import PictureView from "./components/PictureView";
import CrackView from "./components/CrackView";
import CommentView from "./components/CommentView";
import MapView from "./components/MapView";
import ControlView from "./components/ControlView";

import server from "../config/credentials.json";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeightRow1: {
    height: "52vh",
  },
  fixedHeightRow2: {
    height: "28vh",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

interface DashboardProps {
  id: number;
  photoUrl: string;
  riskLevel: string | unknown;
  comment: string;
  isCrack: boolean;
  location: {
    locationX: number;
    locationY: number;
  };
}

interface ParamTypes {
  id: string;
}

function Alert(props: AlertProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Dashboard(): React.ReactElement {
  const [data, setData] = useState<DashboardProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setCrack] = useState(0);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<DashboardProps[]>([
    {
      id: 0,
      photoUrl: "",
      riskLevel: "",
      comment: "",
      isCrack: false,
      location: { locationX: 0, locationY: 0 },
    },
  ]);
  const classes = useStyles();
  const { id } = useParams<ParamTypes>();
  const row1 = clsx(classes.paper, classes.fixedHeightRow1);
  const row2 = clsx(classes.paper, classes.fixedHeightRow2);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${server.url}structure/${id}`);
        setData(response.data.cracks);
      } catch (e) {
        throw new Error(`structure 불러오기 실패: ${e}`);
      }
      setLoading(false);
    };
    getData();
  }, [id]);

  useEffect(() => {
    setState([...data]);
  }, [data]);

  if (loading || !data)
    return (
      <div>
        <LinearProgress />
      </div>
    );

  const handleCrack = (select: number) => {
    setCrack(select);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState = state;
    newState[selected].comment = e.target.value;
    setState([...newState]);
  };

  const handleRiskChange = (
    e: React.ChangeEvent<{ value: string | unknown }>
  ) => {
    const newState = state;
    newState[selected].riskLevel = e.target.value;
    setState([...newState]);
  };

  const handleCrackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState = state;
    newState[selected].isCrack = e.target.checked;
    setState([...newState]);
  };

  const handleCrackSave = () => {
    let saveSuccess = true;

    state.forEach((r) => {
      axios
        .put(`${server.url}crack/${r.id}`, {
          comment: r.comment,
          riskLevel: r.riskLevel,
          isCrack: r.isCrack,
        })
        .then((response) => {
          // eslint-disable-next-line no-console
          if (response.status === 200) console.log(`${response.data} saved`);
        })
        .catch((error) => {
          saveSuccess = false;
          throw new Error(`crack 저장 실패 : ${error}`);
        });
    });
    if (saveSuccess) setOpen(true);
  };

  const handleClose = (e?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      {data && (
        <>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Paper className={row1}>
                <PictureView
                  photoUrl={
                    data[selected] !== undefined
                      ? data[selected].photoUrl
                      : "https://via.placeholder.com/300/09f/fff.png"
                  }
                />
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper className={row1}>
                <CrackView
                  selected={selected}
                  dataList={state}
                  handleCrack={handleCrack}
                  handleRiskChange={handleRiskChange}
                  handleCrackChange={handleCrackChange}
                />
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs>
              <Paper className={row2}>
                <CommentView
                  comment={data[selected] && data[selected].comment}
                  handleInput={handleInput}
                />
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={row2}>
                <MapView
                  lat={data[selected] && data[selected].location.locationX}
                  lng={data[selected] && data[selected].location.locationY}
                />
              </Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper className={row2}>
                <ControlView handleCrackSave={handleCrackSave} />
              </Paper>
            </Grid>
          </Grid>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              성공적으로 저장되었습니다!
            </Alert>
          </Snackbar>
        </>
      )}
    </>
  );
}
export default Dashboard;
