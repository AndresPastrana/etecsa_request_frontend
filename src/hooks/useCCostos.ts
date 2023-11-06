import { CCostoService } from "../services/index";
import { useAppStore } from "../store";
import useAuth from "./useAuth";

export const useCCostos = () => {
  const { loggedUser } = useAuth();
  const { ccostos, setCCostos } = useAppStore(({ ccostos, setCCostos }) => ({
    ccostos,
    setCCostos,
  }));

  const loadCCostos = async () => {
    try {
      const ccostos = await CCostoService.GetCCostos({
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });
      if (ccostos) {
        setCCostos(ccostos);
      }
    } catch (error) {
      throw new Error("Error while loading ccostos");
    }

    return [];
  };
  return { ccostos, loadCCostos };
};
