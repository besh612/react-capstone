import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import Title from "./Title";

interface CrackViewProps {
  handleCrack: (select: number) => void;
  handleRiskChange: (e: React.ChangeEvent<{ value: string | unknown }>) => void;
  handleCrackChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dataList: Array<Type>;
  selected: number;
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
  width?: number;
  riskLevel?: string | unknown;
  createdDate?: string;
  isCrack?: boolean;
}

function CrackView({
  selected,
  dataList,
  handleCrack,
  handleRiskChange,
  handleCrackChange,
}: CrackViewProps): React.ReactElement {
  return (
    <>
      <Title>균열 정보</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>GPS</TableCell>
            <TableCell>ALT</TableCell>
            <TableCell>Risk</TableCell>
            <TableCell>Crack</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataList.map((row, idx) => (
            <TableRow
              key={row.id}
              onClick={() => handleCrack(idx)}
              hover
              selected={idx === selected}
            >
              <TableCell>{row.createdDate?.slice(11)}</TableCell>
              <TableCell size="medium">
                {`x: ${row?.location?.locationX?.toFixed(
                  3
                )} y: ${row?.location?.locationY?.toFixed(3)}`}
              </TableCell>
              <TableCell>{row?.height?.toFixed(2)}cm</TableCell>{" "}
              <TableCell>
                <Select
                  id="risk-select"
                  value={row.riskLevel}
                  onChange={handleRiskChange}
                >
                  <MenuItem value="LOW">LOW</MenuItem>
                  <MenuItem value="MEDIUM">MEDIUM</MenuItem>
                  <MenuItem value="HIGH">HIGH</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                <Checkbox checked={row.isCrack} onChange={handleCrackChange} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default CrackView;
