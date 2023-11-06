import { useEffect } from "react";
import { useBills } from "../../hooks/useBills";
import { BillsTable } from "./BillsTable";

const Bills = () => {
  const { bills, loadBills } = useBills();

  useEffect(() => {
    loadBills();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <h1>Facturas</h1>
      <BillsTable bills={bills} />
    </div>
  );
};

export default Bills;
