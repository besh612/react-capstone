import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";

interface CrackViewProps {
  handleCrack: (select: number) => void;
  dataList: Array<Type>;
}

interface Type {
  id?: number;
  photoUrl?: string;
  comment?: string;
  location?: {
    locationX?: number;
    locationY?: number;
    locationDetail?: string;
  };
  height?: number;
  riskLevel?: string;
  createdDate?: string;
}

function CrackView({
  dataList,
  handleCrack,
}: CrackViewProps): React.ReactElement {
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
                x: {row?.location?.locationX}
                {"\n"}
                y: {row?.location?.locationY}
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
