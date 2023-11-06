import { toast } from "sonner";
import { DepartamentService } from "../services";
import { useAppStore } from "../store";
import useAuth from "./useAuth";
import { DepartmentFormData } from "../types";

const useDepartments = () => {
  const { loggedUser } = useAuth();
  const {
    setDepartments,
    departments,
    addDepartment,
    updateDepartment,
    deleteDepartment,
  } = useAppStore(
    ({
      departments,
      setDepartments,
      addDepartment,
      updateDepartment,
      deleteDepartment,
    }) => ({
      departments,
      addDepartment,
      setDepartments,
      updateDepartment,
      deleteDepartment,
    })
  );

  const loadDepartments = async () => {
    try {
      const dptos = await DepartamentService.GetDepartaments({
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });

      console.log(dptos);
      console.log(departments);

      if (dptos) {
        setDepartments(dptos);
        return;
      }
      toast.error("Error while loading departments");
    } catch (error) {
      toast.error("Error while loading departments");
    }
  };
  const insertNewDeapartmentAPI = async (department: DepartmentFormData) => {
    try {
      const insertedDepartment = await DepartamentService.CreateDepartament(
        department,
        {
          headers: {
            Authorization: `Bearer ${loggedUser?.access_token}`,
          },
        }
      );

      if (insertedDepartment) {
        addDepartment(insertedDepartment);
        return toast.success(
          `Department ${insertedDepartment.descripcion} inserted successfully`
        );
      }
      return toast.error("Error inserting the new department");
    } catch (error) {
      return toast.error("Error inserting the new department");
    }
  };

  const updateDeapartmentAPI = async (department: DepartmentFormData) => {
    try {
      const insertedDepartment = await DepartamentService.UpdateDepartamentById(
        department,
        {
          headers: {
            Authorization: `Bearer ${loggedUser?.access_token}`,
          },
        }
      );

      if (insertedDepartment) {
        updateDepartment(insertedDepartment);
        return toast.success(
          `Department ${insertedDepartment.descripcion} inserted successfully`
        );
      }
      return toast.error("Error updating the new department");
    } catch (error) {
      return toast.error("Error updating the new department");
    }
  };

  const deleteDeapartmentAPI = async (id: string) => {
    try {
      const deletedDepartment = await DepartamentService.DeleteDepartamentById(
        id,
        {
          headers: {
            Authorization: `Bearer ${loggedUser?.access_token}`,
          },
        }
      );

      if (deletedDepartment) {
        deleteDepartment(deletedDepartment.id);
        return toast.success(
          `Department ${deletedDepartment.descripcion} deleted successfully`
        );
      }
      return toast.error("Error updating the new department");
    } catch (error) {
      return toast.error("Error updating the new department");
    }
  };

  return {
    departments,
    loadDepartments,
    insertNewDeapartmentAPI,
    updateDeapartmentAPI,
    deleteDeapartmentAPI,
  };
};

export default useDepartments;
