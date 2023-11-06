import { Card, DonutChart, Subtitle, Title } from "@tremor/react";
import { useRequestConunter } from "../../hooks/useRequestConunter";
import { FC } from "react";

const Graphic = () => {
  const { requestCounter } = useRequestConunter();
  const transformedData = Object.entries(requestCounter).map((arr) => {
    const [name, cant] = arr;
    return { name, cant };
  });
  return (
    <>
      <Card className="max-w-lg mt-6">
        <Title>Solicitudes</Title>
        <DonutChart
          className="mt-6"
          data={transformedData}
          category="cant"
          index="name"
          colors={["yellow", "green", "red"]}
          variant="pie"
        />
        <Subtitle>
          Total :{" "}
          <span className="text-tremor-content-strong">
            {Object.values(requestCounter).reduce(
              (current, acm) => current + acm,
              0
            )}
          </span>
        </Subtitle>
      </Card>
    </>
  );
};
export default Graphic;
