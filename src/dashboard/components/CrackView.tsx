import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";

// Generate Order Data
function createData(
  id: number,
  time: string,
  width: number,
  risk: string,
  x: number,
  y: number,
  alt: number
) {
  return { id, time, width, risk, x, y, alt };
}

const rows = [
  createData(0, "13:43:12", 3.5, "High", 37.241, 125.424, 1211),
  createData(1, "13:43:12", 3.5, "High", 37.241, 125.424, 1613),
  createData(2, "13:43:12", 3.5, "High", 37.241, 125.424, 3214),
  createData(3, "13:43:12", 3.5, "High", 37.241, 125.424, 1452),
  createData(4, "13:43:12", 3.5, "High", 37.241, 125.424, 5121),
];

function CrackView() {
  return (
    <>
      <Title>균열 정보</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>width</TableCell>
            <TableCell>risk</TableCell>
            <TableCell>gps</TableCell>
            <TableCell>alt</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.width}mm</TableCell>
              <TableCell>{row.risk}</TableCell>
              <TableCell size="medium">
                x: {row.x}
                {"\n"}
                y: {row.y}
              </TableCell>
              <TableCell>{row.alt}cm</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default CrackView;
