import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableHeaderCell,
  Flex,
} from "@tremor/react";
import { IDepartament } from "../../types";
import { FC } from "react";
import { ButtonFactory } from "../ui";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const THead = () => {
  const ths = ["descripcion", "ccosto"];

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
        <TableHeaderCell
          className="bg-tremor-background text-center"
          key={`th-dpto-actions`}
        >
          {"Actions".toUpperCase()}
        </TableHeaderCell>
      </TableRow>
    </TableHead>
  );
};

type TBodyProps = {
  departments: Array<IDepartament>;
  hanldeEdit: (id: string) => void;
  handleDelete: (id: string) => void;
};

const TBody: FC<TBodyProps> = ({ departments, handleDelete, hanldeEdit }) => {
  return (
    <TableBody>
      {departments.map(({ id, ccosto, descripcion }) => {
        return (
          <TableRow key={id}>
            <TableCell>{descripcion}</TableCell>
            <TableCell>{ccosto.code}</TableCell>
            <TableCell>
              <Flex justifyContent="around" className="gap-3">
                <ButtonFactory
                  icon={PencilIcon}
                  onClick={() => hanldeEdit(id)}
                  text="edit"
                  variant="light"
                  color="blue"
                />
                <ButtonFactory
                  icon={TrashIcon}
                  onClick={() => handleDelete(id)}
                  text="delete"
                  variant="light"
                  color="red"
                />
              </Flex>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export const DepartmentsTable: FC<TBodyProps> = ({
  departments = [],
  handleDelete,
  hanldeEdit,
}) => {
  {
    console.log(departments);
  }
  return (
    <Table className="grow max-h-full">
      <THead />
      <TBody
        departments={departments}
        handleDelete={handleDelete}
        hanldeEdit={hanldeEdit}
      />
    </Table>
  );
};
