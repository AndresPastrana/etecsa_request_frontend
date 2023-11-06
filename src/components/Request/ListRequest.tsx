import { RequestFormData } from "../../types";
import { utils, writeFile } from "xlsx";
import { FC, useEffect, useMemo, useState } from "react";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
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
  Bold,
  Flex,
  Select,
  SelectItem,
  DatePicker,
  DatePickerValue,
} from "@tremor/react";

import { useRequest } from "../../hooks/useRequest";
import { RequestStatus, UserRole } from "../../const";
import { ButtonFactory } from "../ui";
import clsx from "clsx";
import useAuth from "../../hooks/useAuth";

type Props = {
  requests: Array<RequestFormData>;
  handleAprove?: (
    action: RequestStatus.APPROVED | RequestStatus.DENIED,
    id: string
  ) => void;
  handleDenied?: (
    action: RequestStatus.APPROVED | RequestStatus.DENIED,
    id: string
  ) => void;
};
type Thead = {
  isSpecialist: boolean;
};
const THeader: FC<Thead> = ({ isSpecialist }) => {
  const heads = [
    "Depto",
    "Productos",
    "Destino",
    "Fecha de Solicitud",
    "Estado",
  ];
  return (
    <TableHead>
      <TableRow>
        {heads.map((thead) => (
          <TableHeaderCell className="bg-tremor-background">
            {thead.toUpperCase()}
          </TableHeaderCell>
        ))}

        {isSpecialist && (
          <TableHeaderCell className="bg-tremor-background text-left">
            {"actions".toUpperCase()}
          </TableHeaderCell>
        )}
      </TableRow>
    </TableHead>
  );
};

const TBody: FC<Props & Thead> = ({
  requests,
  handleDenied,
  handleAprove,
  isSpecialist,
}) => {
  return (
    <TableBody>
      {requests.map((item) => (
        <TableRow key={item.id}>
          <TableCell>
            {item.departament?.descripcion || "None exist departament"}
          </TableCell>
          <TableCell>
            {item.resources.map((r) => {
              return (
                <span className="flex items-center gap-3" key={r._id}>
                  <p>{r.product?.name}</p>
                  <p>
                    Cant: <Bold>{r.quantity}</Bold>
                  </p>
                </span>
              );
            })}
          </TableCell>
          <TableCell>
            <Text>{item.destiny?.description || "None exist destiny"}</Text>
          </TableCell>
          <TableCell>
            <Text>{new Date(item.createdAt).toLocaleDateString()}</Text>
          </TableCell>
          <TableCell>
            <Text>
              <Badge
                className={clsx({
                  "bg-yellow-100 text-yellow-800":
                    item.status === RequestStatus.PENDING,
                  "bg-red-100 text-red-800":
                    item.status === RequestStatus.DENIED,
                  "bg-green-100 text-green-800":
                    item.status === RequestStatus.APPROVED,
                })}
                icon={AcademicCapIcon}
              >
                {item.status}
              </Badge>
            </Text>
          </TableCell>
          {isSpecialist && (
            <TableCell>
              <Flex justifyContent="start" className="gap-3 items-center">
                {handleAprove && (
                  <ButtonFactory
                    variant="light"
                    color="green"
                    text="Aprove"
                    disabled={item.status !== RequestStatus.PENDING}
                    onClick={() =>
                      handleAprove(RequestStatus.APPROVED, item.id)
                    }
                  />
                )}
                {handleDenied && (
                  <ButtonFactory
                    variant="light"
                    disabled={item.status !== RequestStatus.PENDING}
                    text="Denied"
                    color="red"
                    onClick={() => handleDenied(RequestStatus.DENIED, item.id)}
                  />
                )}
              </Flex>
              {item.status !== RequestStatus.PENDING && (
                <Text color="yellow" className="font-semibold">
                  No avaible actions
                </Text>
              )}
            </TableCell>
          )}
        </TableRow>
      ))}
    </TableBody>
  );
};

const RequestsTable: FC<Props & Thead> = ({
  requests = [],
  handleAprove,
  handleDenied,
  isSpecialist,
}) => {
  return (
    <div className="px-3 py-8 grow">
      <Table className="w-full max-h-96">
        <THeader isSpecialist={isSpecialist} />
        <TBody
          isSpecialist={isSpecialist}
          requests={requests}
          handleAprove={handleAprove}
          handleDenied={handleDenied}
        />
      </Table>
    </div>
  );
};

export const ListRequest: FC<Pick<Props, "handleAprove" | "handleDenied">> = ({
  handleAprove,
  handleDenied,
}) => {
  const { requests, loadRequest } = useRequest();
  const { loggedUser } = useAuth();
  const isSpecialist = loggedUser?.role === UserRole.SPECIALIST;

  const [startDate, setStartDate] = useState<DatePickerValue>();
  const [endDate, setEndDate] = useState<DatePickerValue>();
  const [selectedStatus, setSelectedStatus] = useState<RequestStatus>(
    RequestStatus.PENDING
  );

  // Filter data
  const filteredData = useMemo(
    () =>
      requests.filter((item) => {
        const itemDate = new Date(item.createdAt);

        const dateCondition =
          !startDate ||
          !endDate ||
          (itemDate >= startDate && itemDate <= endDate);
        const statusCondition =
          !selectedStatus || item.status === selectedStatus;
        return dateCondition && statusCondition;
      }),
    [requests, selectedStatus, startDate, endDate]
  );

  const downloadPdfReport = () => {
    const data = filteredData.map(
      ({ id, createdAt, aprovedBy, departament, destiny, status }) => {
        const dateInfo = new Date(createdAt).toLocaleString().split(", ");
        return {
          code: id,
          fecha: dateInfo[0],
          hora: dateInfo[1],
          status: status.toUpperCase(),
          departament: departament?.descripcion || "Desconocido",
          destiny: destiny?.description || "Desconocido",
          aprovedBy: aprovedBy ? aprovedBy.firstName : "Todavia pendiente",
          // resources,
        };
      }
    );
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Solicitudes");
    writeFile(workbook, "Informe Solicitudes.xlsx", {
      compression: true,
    });
  };

  useEffect(() => {
    loadRequest();
  }, []);

  return (
    <>
      <Flex className="p-5">
        <Title className="">Solicitudes</Title>

        <div className="flex gap-3">
          {/* Start date */}
          <DatePicker
            enableClear
            value={startDate}
            onValueChange={(d) => setStartDate(d)}
            className="max-w-sm mx-auto"
            placeholder="A Partir"
          />
          <DatePicker
            enableClear
            value={endDate}
            onValueChange={(d) => setEndDate(d)}
            className="max-w-sm mx-auto"
            placeholder="Hasta"
          />
          {/* End date */}

          {/* Status filter */}
          <Select
            className="max-w-xs"
            placeholder="Status"
            value={selectedStatus}
            onValueChange={(value) => setSelectedStatus(value as RequestStatus)}
          >
            {Object.values(RequestStatus).map((value) => {
              return (
                <SelectItem key={value} value={value}>
                  {value.toUpperCase()}
                </SelectItem>
              );
            })}
          </Select>
          <ButtonFactory
            text="Download Reports"
            variant="primary"
            onClick={() => downloadPdfReport(filteredData)}
          />
        </div>
      </Flex>
      <RequestsTable
        requests={filteredData}
        handleAprove={handleAprove}
        handleDenied={handleDenied}
        isSpecialist={isSpecialist}
      />
    </>
  );
};
