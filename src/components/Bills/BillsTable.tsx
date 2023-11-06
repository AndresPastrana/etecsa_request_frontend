import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableHeaderCell,
  Bold,
} from "@tremor/react";
import { IBilling } from "../../types";
import { FC } from "react";

const THead = () => {
  const ths = ["Request Code", "Importe Total"];

  return (
    <TableHead>
      <TableRow>
        {ths.map((header) => (
          <TableHeaderCell
            className="bg-tremor-background"
            key={`th-dpto-${header}`}
          >
            {header.toUpperCase()}
          </TableHeaderCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

type TBodyProps = {
  bills: Array<IBilling>;
};

const TBody: FC<TBodyProps> = ({ bills }) => {
  return (
    <TableBody>
      {bills.map(({ id, request, total_import }) => {
        return (
          <TableRow key={id}>
            <TableCell>{request?._id || "null"}</TableCell>
            <TableCell>{total_import}</TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export const BillsTable: FC<TBodyProps> = ({ bills = [] }) => {
  return (
    <Table className="grow max-h-96 ">
      <THead />
      <TBody bills={bills} />
    </Table>
  );
};
