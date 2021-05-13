import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import server from "../config/credentials.json";

const useStyles = makeStyles({
  paper: {
    padding: 20,
    height: "80vh",
  },
  table: {
    minWidth: "60vw",
  },
  header: {
    display: "flex",
    position: "relative",
  },
  addButton: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    margin: "auto",
  },
  image: {
    padding: 10,
    height: "100%",
    width: "100%",
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
  structures: Array<Structure>;
}

interface Structure {
  id: number;
  name: string;
  comment: string;
  modelUrl: string;
  location: {
    locationX: number;
    locationY: number;
    locationDetail: string;
  };
  height: number;
  createdDate: string;
}

function Project(): React.ReactElement {
  const [data, setData] = useState<Projects>();

  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams<ParamTypes>();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${server.url}project/${id}`);
        setData(response.data);
      } catch (e) {
        throw new Error(`project 불러오기 실패: ${e}`);
      }
      setLoading(false);
    };
    getData();
  }, [id]);

  if (loading) return <div>로딩중</div>;

  if (!data) return <div>불러오기 실패</div>;

  const handleClick = (structureId: number) => {
    const path = `/dashboard/${structureId}`;
    history.push({ pathname: path, state: data.comment });
  };

  return (
    <Paper className={classes.paper}>
      {data != null && (
        <>
          <div className={classes.header}>
            <Typography variant="h4">{data.name}</Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.addButton}
            >
              구조물 추가
            </Button>
          </div>
          <Grid container spacing={2} direction="row">
            <Grid item xs={3}>
              <Grid item xs container direction="column" spacing={2}>
                <Grid>
                  <img src={data.photoUrl} alt="" className={classes.image} />
                </Grid>
                <Grid>
                  <Typography className={classes.projectComment}>
                    {data.comment}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ flexBasis: 0 }}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>구조물 이름</TableCell>
                    <TableCell align="right">위치x</TableCell>
                    <TableCell align="right">위치y</TableCell>
                    <TableCell align="right">생성일</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.structures.map((row) => (
                    <TableRow
                      key={parseInt(row.id.toString(), 10)}
                      onClick={() =>
                        handleClick(parseInt(row.id.toString(), 10))
                      }
                      hover
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">
                        {row.location.locationX}
                      </TableCell>
                      <TableCell align="right">
                        {row.location.locationY}
                      </TableCell>
                      <TableCell align="right">
                        {row.createdDate.slice(0, 10)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </>
      )}
    </Paper>
  );
}
export default Project;
