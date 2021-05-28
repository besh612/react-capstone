import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  table: {
    minWidth: "50vw",
  },
  image: {
    padding: 10,
    height: 300,
    width: 300,
  },
});

interface StructureViewProps {
  handleClick: (structureID: number) => void;
  data: Array<Structure>;
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

function StructureView({ data, handleClick }: StructureViewProps) {
  const classes = useStyles();
  return (
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell width={100} />
          <TableCell>이름</TableCell>
          <TableCell>주소</TableCell>
          <TableCell align="right">위치x</TableCell>
          <TableCell align="right">위치y</TableCell>
          <TableCell align="right">생성일</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow
            key={parseInt(row.id.toString(), 10)}
            onClick={() => handleClick(parseInt(row.id.toString(), 10))}
            hover
          >
            <TableCell component="th" scope="row" width={100}>
              <img
                src={row.modelUrl}
                alt="구조물"
                style={{
                  height: 100,
                  width: 100,
                }}
              />
            </TableCell>
            <TableCell align="left">{row.name}</TableCell>
            <TableCell component="th" scope="row">
              {row.location.locationDetail}
            </TableCell>
            <TableCell align="right">
              {row.location.locationX.toFixed(3)}
            </TableCell>
            <TableCell align="right">
              {row.location.locationY.toFixed(3)}
            </TableCell>
            <TableCell align="right">{row.createdDate.slice(0, 10)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default StructureView;
