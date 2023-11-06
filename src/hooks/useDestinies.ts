import { toast } from "sonner";
import { DestinyService } from "../services";
import { useAppStore } from "../store";
import { DestinyFormData } from "../types";
import useAuth from "./useAuth";

export const useDestinies = () => {
  const {
    destinies,
    addDestinies,
    deleteDestiny,
    setDestinies,
    updateDestiny,
  } = useAppStore(
    ({
      destinies,
      setDestinies,
      addDestinies,
      updateDestiny,
      deleteDestiny,
    }) => ({
      addDestinies,
      deleteDestiny,
      destinies,
      setDestinies,
      updateDestiny,
    })
  );

  const { loggedUser } = useAuth();

  const loadDestinies = async () => {
    try {
      const destinies = await DestinyService.getAllDestinies({
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });
      if (destinies) {
        setDestinies(destinies);
      }
    } catch (error) {
      // Error throw it by the Destiny service
      console.log(error);
    }
  };

  const insertDestinyAPI = async (destiny: DestinyFormData) => {
    try {
      const newDesity = await DestinyService.createNewDestiny(destiny, {
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });
      if (newDesity) {
        addDestinies(newDesity);
        return toast.success(
          `Destiny: ${destiny.description} inserted Succesfully`
        );
      }
      return toast.error("Error inserting destiny");
    } catch (error) {
      return toast.error("Error inserting destiny");
    }
  };
  const updateDestinyAPI = async (destiny: DestinyFormData) => {
    try {
      const updatedDestiny = await DestinyService.updateDestiny(destiny, {
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });
      if (updatedDestiny) {
        updateDestiny(updatedDestiny);
        return toast.success(
          `Destiny: ${destiny.description} updated Succesfully`
        );
      }
      return toast.error("Error updating destiny");
    } catch (error) {
      return toast.error("Error updating destiny");
    }
  };

  const deleteDestinyAPI = async (idDestiny: string) => {
    try {
      const deletedDestiny = await DestinyService.deleteDestinyById(idDestiny, {
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });
      if (deletedDestiny) {
        deleteDestiny(deletedDestiny.id);
        toast.success(
          `Destiny ${deletedDestiny.description} deleted sucssesfully !`
        );
      }
    } catch (error) {}
  };

  return {
    destinies,
    loadDestinies,
    insertDestinyAPI,
    updateDestinyAPI,
    deleteDestinyAPI,
  };
};
