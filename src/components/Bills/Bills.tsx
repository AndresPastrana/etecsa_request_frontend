import { useEffect } from "react";
import { useBills } from "../../hooks/useBills";
import { BillsTable } from "./BillsTable";

const Bills = () => {
  const { bills, loadBills } = useBills();

  useEffect(() => {
    loadBills();
  }, []);

  return (
    <div>
      {/* <p>{JSON.stringify(bills)}</p> */}
      <BillsTable bills={bills} />
    </div>
  );
};

export default Bills;
