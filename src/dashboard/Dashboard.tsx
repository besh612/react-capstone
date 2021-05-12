import React, { useEffect, useState } from "react";
import { Button, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import axios from "axios";

import PictureView from "./components/PictureView";
import CrackView from "./components/CrackView";
import CommentView from "./components/CommentView";
import MapView from "./components/MapView";

import server from "../config/credentials.json";

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

interface DashboardProps {
  photoUrl: string;
}

interface ParamTypes {
  id: string;
}

function Dashboard(): React.ReactElement {
  const [data, setData] = useState<DashboardProps[]>();
  const [loading, setLoading] = useState(false);
  const [selected, setCrack] = useState(0);
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

  if (loading) return <div>로딩중</div>;

  if (!data) return <div>불러오기 실패</div>;

  const handleCrack = (select: number) => {
    setCrack(select);
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
                <CrackView dataList={data} handleCrack={handleCrack} />
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
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
      )}
    </>
  );
}
export default Dashboard;
