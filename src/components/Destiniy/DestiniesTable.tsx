import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableHeaderCell,
  Flex,
} from "@tremor/react";
import { IDestiny } from "../../types";
import { FC } from "react";
import { ButtonFactory } from "../ui";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const THead = () => {
  const ths = ["codigo", "descripcion", "state"];

  return (
    <TableHead>
      <TableRow>
        {ths.map((header) => (
          <TableHeaderCell
            className=" bg-tremor-background"
            key={`thd-${header}`}
          >
            {header.toUpperCase()}
          </TableHeaderCell>
        ))}
        <TableHeaderCell
          key={`thdp-actions}`}
          className="text-center bg-tremor-background"
        >
          {"Actions".toUpperCase()}
        </TableHeaderCell>
      </TableRow>
    </TableHead>
  );
};

type TBodyProps = {
  destinies: Array<IDestiny>;
  hanldeEdit: (id: string) => void;
  handleDelete: (id: string) => void;
};

const TBody: FC<TBodyProps> = ({ destinies, handleDelete, hanldeEdit }) => {
  return (
    <TableBody>
      {destinies.map(({ code, description, id, state }) => {
        return (
          <TableRow key={id}>
            <TableCell>{code}</TableCell>
            <TableCell>{description}</TableCell>
            <TableCell>{state.name}</TableCell>
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

const DestiniesTable: FC<TBodyProps> = ({
  destinies = [],
  handleDelete,
  hanldeEdit,
}) => {
  return (
    <Table className="grow">
      <THead />
      <TBody
        destinies={destinies}
        handleDelete={handleDelete}
        hanldeEdit={hanldeEdit}
      />
    </Table>
  );
};

export default DestiniesTable;
