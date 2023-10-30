import {
  Title,
  Subtitle,
  Flex,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Metric,
  Button,
} from "@tremor/react";
const data = [
  {
    codigo: "001",
    producto: "Producto A",
    precio: 10.99,
    cantidad: 5,
    importe: 54.95,
  },
  {
    codigo: "002",
    producto: "Producto B",
    precio: 15.49,
    cantidad: 3,
    importe: 46.47,
  },
  {
    codigo: "003",
    producto: "Producto C",
    precio: 8.99,
    cantidad: 7,
    importe: 62.93,
  },
  {
    codigo: "004",
    producto: "Producto D",
    precio: 12.99,
    cantidad: 2,
    importe: 25.98,
  },
  {
    codigo: "005",
    producto: "Producto E",
    precio: 6.99,
    cantidad: 4,
    importe: 27.96,
  },
];

const FlexContainerWithButtons = () => (
  <Flex justifyContent="between">
    <Button size="md" variant="primary" color="blue">
      Aprobar
    </Button>
    <Button size="md" variant="secondary">
      Denegar
    </Button>
  </Flex>
);

const ApprovalInformation = () => (
  <Flex justifyContent="space-between">
    <div>
      <Title>Importe Total</Title>
      <Metric>$ 234</Metric>
    </div>
    <div>
      <Title>Aprobada por</Title>
      <Subtitle>name in case any</Subtitle>
    </div>
    <div>
      <Title>Aprobada por</Title>
      <Subtitle>Fecha de aprovación</Subtitle>
    </div>
  </Flex>
);
const ResourcesTable = ({ data }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableHeaderCell>Código</TableHeaderCell>
        <TableHeaderCell>Producto</TableHeaderCell>
        <TableHeaderCell>Precio</TableHeaderCell>
        <TableHeaderCell>Cantidad</TableHeaderCell>
        <TableHeaderCell>Importe</TableHeaderCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((item, index) => (
        <TableRow key={index}>
          <TableCell>{item.codigo}</TableCell>
          <TableCell>{item.producto}</TableCell>
          <TableCell>{item.precio.toFixed(2)}</TableCell>
          <TableCell>{item.cantidad}</TableCell>
          <TableCell>{item.importe.toFixed(2)}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const RequestInfo = () => {
  return (
    <div>
      <div>
        <Title>Municipio</Title>
        <Subtitle>Your Municipio Description Goes Here</Subtitle>
      </div>
      <div>
        <Title>Departamento</Title>
        <Subtitle>Your Departamento Description Goes Here</Subtitle>
      </div>
      <div>
        <Title>CCosto</Title>
        <Subtitle>Your CCosto Description Goes Here</Subtitle>
      </div>
      <div>
        <Title>Estado</Title>
        <Subtitle>Your Estado Description Goes Here</Subtitle>
      </div>
      <div>
        <Title>Fecha</Title>
        <Subtitle>Your Fecha Description Goes Here</Subtitle>
      </div>

      <div>
        <Title>ID</Title>
        <Subtitle>76867687s6df786sd</Subtitle>

        <div>
          <Title>Argumento</Title>
          <Subtitle>Your Argumento Description Goes Here</Subtitle>
        </div>
      </div>
    </div>
  );
};
export const FormCreateRequetst = () => {
  return (
    <Flex flexDirection="col">
      <RequestInfo />
      <ResourcesTable data={data} />
      <ApprovalInformation />
      <FlexContainerWithButtons />
    </Flex>
  );
};
