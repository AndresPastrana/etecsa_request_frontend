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

import clsx from "clsx";

type THead = {
  hideActions: boolean;
};
const THead: FC<THead> = ({ hideActions = false }) => {
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

        {!hideActions && (
          <TableHeaderCell
            key={`thdp-actions}`}
            className="text-center bg-tremor-background"
          >
            {"Actions".toUpperCase()}
          </TableHeaderCell>
        )}
      </TableRow>
    </TableHead>
  );
};

type TBodyProps = {
  products: Array<IProduct>;
  hanldeEdit: (id: string) => void;
  handleDelete: (id: string) => void;
  isSpecialist: boolean;
};

const TBody: FC<TBodyProps> = ({
  products,
  handleDelete,
  hanldeEdit,
  isSpecialist,
}) => {
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
                  className={clsx({ hidden: !isSpecialist })}
                  disabled={!isSpecialist}
                  icon={PencilIcon}
                  onClick={() => hanldeEdit(id)}
                  text="edit"
                  variant="light"
                  color="blue"
                />
                <ButtonFactory
                  className={clsx({ hidden: !isSpecialist })}
                  disabled={!isSpecialist}
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

export const ProductTable: FC<Omit<TBodyProps, "disabledActions">> = ({
  products = [],
  handleDelete,
  hanldeEdit,
  isSpecialist,
}) => {
  return (
    <Table className="grow">
      <THead hideActions={!isSpecialist} />
      <TBody
        products={products}
        handleDelete={handleDelete}
        hanldeEdit={hanldeEdit}
        isSpecialist={isSpecialist}
      />
    </Table>
  );
};
