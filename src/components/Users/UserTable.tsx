import { IUser } from "../../types";
import { FC } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Badge,
} from "@tremor/react";
import { ButtonFactory } from "../ui/index";

type Props = {
  users: Array<IUser>;
  handleBtnEdit: (user: string) => void;
  handleBtnDelete: (userID: string) => void;
  handleBtnAddNew: () => void;
};

const THeader = () => {
  const heads = ["Email", "FirstName", "LastName", "departament"];
  return (
    <TableHead>
      <TableRow>
        {heads.map((thead) => (
          <TableHeaderCell className="bg-tremor-background" key={`th-${thead}`}>
            {thead.toUpperCase()}
          </TableHeaderCell>
        ))}
        <TableHeaderCell
          key={`th-actions`}
          className="text-center bg-tremor-background"
        >
          {"Actions".toUpperCase()}
        </TableHeaderCell>
      </TableRow>
    </TableHead>
  );
};

const TBody: FC<Props> = ({ users, handleBtnEdit, handleBtnDelete }) => {
  return (
    <TableBody>
      {users.map((item) => (
        <TableRow key={item.id}>
          <TableCell>{item.email}</TableCell>
          <TableCell>
            <Text>{item.firstName}</Text>
          </TableCell>
          <TableCell>
            <Text>{item.lastName}</Text>
          </TableCell>
          <TableCell>
            <Badge color="emerald" icon={PencilIcon}>
              {item.departament
                ? item.departament.descripcion
                : "No dpto asing"}
            </Badge>
          </TableCell>
          <TableCell className="flex gap-2 justify-around">
            <ButtonFactory
              icon={PencilIcon}
              size="lg"
              variant="light"
              onClick={() => handleBtnEdit(item.id)}
              text="Edit"
            />
            <ButtonFactory
              icon={TrashIcon}
              size="lg"
              variant="light"
              color="red"
              onClick={() => handleBtnDelete(item.id)}
              text="Delete"
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

const UserTable: FC<Props> = ({
  users,
  handleBtnEdit,
  handleBtnDelete,
  handleBtnAddNew,
}) => {
  return (
    <Table className="grow h-full max-h-full">
      <THeader />
      <TBody
        users={users}
        handleBtnEdit={handleBtnEdit}
        handleBtnDelete={handleBtnDelete}
        handleBtnAddNew={handleBtnAddNew}
      />
    </Table>
  );
};

export default UserTable;
