import { UserRole } from "../const";
import { BillService } from "../services/Bills";
import { useAppStore } from "../store";
import useAuth from "./useAuth";

export const useBills = () => {
  const { loggedUser } = useAuth();
  const { bills, setBills } = useAppStore(({ bills, setBills }) => ({
    bills,
    setBills,
  }));

  const loadBills = async () => {
    try {
      const serviceToUse =
        loggedUser?.role === UserRole.SPECIALIST
          ? BillService.GetAllBills
          : BillService.GetAllBillsByDepartament;

      const billsList = await serviceToUse({
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });

      if (billsList) {
        setBills(billsList);
      }
    } catch (error) {
      throw new Error("Error while loading bills");
    }

    return [];
  };
  return { bills, loadBills };
};
