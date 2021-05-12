import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";

interface CrackViewProps {
  handleCrack: (select: number) => void;
  dataList: [
    {
      id: number;
      comment: string;
      location: {
        locationX: number;
        locationY: number;
        locationDetail: string;
      };
      photoUrl: string;
      height: number;
      riskLevel: string;
    }
  ];
}

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

function CrackView({ dataList, handleCrack }: CrackViewProps) {
  return (
    <>
      <Title>균열 정보</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>Width</TableCell>
            <TableCell>Risk</TableCell>
            <TableCell>GPS</TableCell>
            <TableCell>ALT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataList.map((row, idx) => (
            <TableRow key={row.id} onClick={() => handleCrack(idx)} hover>
              <TableCell>{row.comment}</TableCell>
              <TableCell>{row.photoUrl}mm</TableCell>
              <TableCell>{row.riskLevel}</TableCell>
              <TableCell size="medium">
                x: {row.location.locationX}
                {"\n"}
                y: {row.location.locationY}
              </TableCell>
              <TableCell>{row.height}cm</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default CrackView;
