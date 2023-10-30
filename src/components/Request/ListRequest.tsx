import { IRequest } from "../../types";
import { FC } from "react";
import { AcademicCapIcon, PencilIcon } from "@heroicons/react/24/outline";
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
  requests: Array<IRequest>;
};

const THeader = () => {
  const heads = ["Depto", "Productos", "Destino", "Estado", "Acciones"];
  return (
    <TableHead>
      <TableRow>
        {heads.map((thead) => (
          <TableHeaderCell>{thead.toUpperCase()}</TableHeaderCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const TBody: FC<Props> = ({ requests }) => {
  return (
    <TableBody>
      {requests.map((item) => (
        <TableRow key={item.id}>
          <TableCell>{item.departament}</TableCell>
          <TableCell>
            <Text>{JSON.stringify(item.resources)}</Text>
          </TableCell>
          <TableCell>
            <Text>{item.destiny}</Text>
          </TableCell>
          <TableCell>
            <Badge color="emerald" icon={AcademicCapIcon}>
              {item.status}
            </Badge>
          </TableCell>
          <TableCell>
            <ButtonFactory text="edit" Icon={PencilIcon} onClick={() => {}} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

// TODO the request sate
export const ListRequest: FC<Props> = ({ requests = [] }) => {
  return (
    <div className="h-full px-3 py-8">
      <Title className="mb-10">Solicitudes</Title>
      <Table>
        <THeader />
        <TBody requests={requests} />
      </Table>
    </div>
  );
};
