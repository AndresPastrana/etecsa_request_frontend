import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableHeaderCell,
  Flex,
} from "@tremor/react";
import { IProduct } from "../../types";
import { FC } from "react";
import { ButtonFactory } from "../ui";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const THead = () => {
  const ths = ["codigo", "name", "precio", "cant"];

  return (
    <TableHead>
      <TableRow>
        {ths.map((header) => (
          <TableHeaderCell
            key={`thdp-${header}`}
            className="bg-tremor-background"
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
  products: Array<IProduct>;
  hanldeEdit: (id: string) => void;
  handleDelete: (id: string) => void;
};

const TBody: FC<TBodyProps> = ({ products, handleDelete, hanldeEdit }) => {
  return (
    <TableBody>
      {products.map(({ code, id, aviableQuantity, name, price }) => {
        return (
          <TableRow key={id}>
            <TableCell>{code}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{price}</TableCell>
            <TableCell>{aviableQuantity}</TableCell>
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

export const ProductTable: FC<TBodyProps> = ({
  products = [],
  handleDelete,
  hanldeEdit,
}) => {
  return (
    <Table className="grow">
      <THead />
      <TBody
        products={products}
        handleDelete={handleDelete}
        hanldeEdit={hanldeEdit}
      />
    </Table>
  );
};
