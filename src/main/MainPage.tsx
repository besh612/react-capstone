import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

import server from "../config/credentials.json";

const useStyles = makeStyles({
  paper: {
    padding: 20,
    height: "80vh",
  },
  table: {
    minWidth: 650,
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
});

interface Projects {
  projects: Array<{
    id: number;
    name: string;
    comment: string;
    location: {
      locationX: number;
      locationY: number;
      locationDetail: string;
    };
    structures: [];
    createdDate: string;
  }>;
}

function MainPage(): React.ReactElement {
  const [data, setData] = useState<Projects>();
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${server.url}user/1`);
        setData(response.data);
      } catch (e) {
        throw new Error(`user 불러오기 실패: ${e}`);
      }
      setLoading(false);
    };
    getData();
  }, []);

  if (loading || !data)
    return (
      <div>
        <LinearProgress />
      </div>
    );

  const handleClick = (id: number) => {
    const path = `/project/${id}`;
    history.push(path);
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.header}>
        <Typography variant="h4">프로젝트</Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.addButton}
        >
          프로젝트 추가
        </Button>
      </div>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>이름</TableCell>
              <TableCell>주소</TableCell>
              <TableCell align="right">위치x</TableCell>
              <TableCell align="right">위치y</TableCell>
              <TableCell align="right">생성일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.projects.map((row) => (
                <TableRow
                  key={parseInt(row.id.toString(), 10)}
                  onClick={() => handleClick(parseInt(row.id.toString(), 10))}
                  hover
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.location.locationDetail}</TableCell>
                  <TableCell align="right">{row.location.locationX}</TableCell>
                  <TableCell align="right">{row.location.locationY}</TableCell>
                  <TableCell align="right">
                    {row.createdDate.slice(0, 10)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
export default MainPage;
