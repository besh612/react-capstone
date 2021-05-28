import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

import server from "../config/credentials.json";
import Modal from "./components/Modal";
import StructureView from "./components/StructureView";

const useStyles = makeStyles({
  header: {
    padding: 10,
    position: "relative",
  },
  table: {
    minWidth: "60vw",
  },
  paper: {
    padding: 10,
    height: "60vh",
  },
  addButton: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 10,
    height: 40,
    margin: "auto",
  },
  downButton: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 120,
    height: 40,
    margin: "auto",
    color: green[600],
    borderColor: green[600],
  },
  image: {
    padding: 10,
    height: 280,
    width: 280,
    border: "1px solid #555;",
  },
  projectComment: {
    padding: 10,
  },
});

interface ParamTypes {
  id: string;
}

interface Projects {
  id: number;
  name: string;
  comment: string;
  userId: number;
  photoUrl: string;
  location: {
    locationX: number;
    locationY: number;
    locationDetail: string;
  };
  structures: [];
}

function Project(): React.ReactElement {
  const [data, setData] = useState<Projects>();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams<ParamTypes>();

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const response = await axios.get(`${server.url}project/${id}`);
        setData(response.data);
      } catch (e) {
        throw new Error(`project 불러오기 실패: ${e}`);
      }
    };
    getData();
    setLoading(false);
  }, [id, open]);

  if (loading || !data)
    return (
      <div>
        <LinearProgress />
      </div>
    );

  const handleClick = (structureId: number) => {
    const path = `/dashboard/${structureId}`;
    history.push({ pathname: path, state: data.comment });
  };

  const handleResultExport = () => {
    axios({
      method: "GET",
      url: `${server.url}excel/${id}`,
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: response.headers["content-type"] })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `result_prject${id}.xlsx`);
      document.body.appendChild(link);
      link.click();
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {data != null && (
        <>
          <Paper className={classes.header}>
            <Typography variant="h4">{data.name}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleClickOpen()}
              className={classes.addButton}
            >
              구조물 추가
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleResultExport()}
              className={classes.downButton}
            >
              결과 출력
            </Button>
          </Paper>
          <Grid container spacing={2} direction="row" style={{ marginTop: 8 }}>
            <Grid item>
              <Grid direction="column">
                <Paper className={classes.paper}>
                  <img src={data.photoUrl} alt="" className={classes.image} />
                  <Typography className={classes.projectComment}>
                    {data.comment}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
            <Grid item xs style={{ flexBasis: 0 }}>
              <Paper className={classes.paper}>
                <StructureView
                  data={data.structures}
                  handleClick={handleClick}
                />
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
      <Modal handleClose={handleClose} open={open} id={id} />
    </div>
  );
}
export default Project;
