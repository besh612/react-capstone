import React, { useState, useEffect } from "react";
import axios from "axios";
import { number } from "prop-types";
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
  },
  button: {
    margin: 10,
  },
});

function MainPage() {
  const [data, setData] = useState({
    projects: [
      {
        id: number,
        name: "",
        comment: "",
        location: { locationX: number, locationY: number },
        createdDate: "",
      },
    ],
  });
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
        console.log(e);
      }
      setLoading(false);
    };
    getData();
  }, []);

  if (loading) return <div>로딩중</div>;

  if (!data) return null;

  const handleClick = (id: number) => {
    const path = `/project/${id}`;
    history.push(path);
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.header}>
        <Typography variant="h4">프로젝트 보기</Typography>
        <Button variant="contained" color="primary" className={classes.button}>
          추가
        </Button>
      </div>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>프로젝트 이름</TableCell>
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
                  <TableCell align="right">{row.location.locationX}</TableCell>
                  <TableCell align="right">{row.location.locationY}</TableCell>
                  <TableCell align="right">{row.createdDate}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
export default MainPage;
