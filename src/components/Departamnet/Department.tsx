import { useEffect, useState } from "react";
import useDepartments from "../../hooks/useDepartments";
import { DepartmentsTable } from "./DepartmentTable";
import { DepartmentForm } from "./DepartmentForm";
import { FormMode } from "../../const";
import { findById } from "../../helper/findById";
import { DepartmentFormData } from "../../types";
import { ButtonFactory } from "../ui";

export const DepartmentPanel = () => {
  const {
    departments,
    loadDepartments,
    insertNewDeapartmentAPI,
    updateDeapartmentAPI,
    deleteDeapartmentAPI,
  } = useDepartments();

  // State for handle if the modal is open or not
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<FormMode>(FormMode.insert);
  const [activeDepartment, setactiveDepartment] =
    useState<DepartmentFormData | null>(null);

  const handleBtnEdit = (id: string) => {
    setMode(FormMode.edit);
    const department = findById(id, departments);
    if (department) {
      const trimed: DepartmentFormData = {
        ...department,
        ccosto: department.ccosto._id,
      };
      setactiveDepartment(trimed);
      setOpen(true);
    }
  };

  const handleBtnAddNew = () => {
    if (activeDepartment) {
      setactiveDepartment(null);
    }
    if (mode !== FormMode.insert) {
      setMode(FormMode.insert);
    }
    if (!open) {
      setOpen(true);
    }
  };

  const handldeBtnDelete = (id: string) => {
    deleteDeapartmentAPI(id);
    if (activeDepartment) {
      setactiveDepartment(null);
    }
    if (mode !== FormMode.insert) {
      setMode(FormMode.insert);
    }
  };

  const handleSubmit = async (department: DepartmentFormData) => {
    if (mode === FormMode.insert) {
      return await insertNewDeapartmentAPI(department);
    }
    if (mode === FormMode.edit) {
      return await updateDeapartmentAPI(department);
    }
    return;
  };
  const onModalClose = () => {
    setOpen(false);
    setactiveDepartment(null);
    setMode(FormMode.insert);
  };

  // Efect to load the departments
  useEffect(() => {
    if (!departments || departments.length == 0) {
      loadDepartments();
    }
  }, []);
  return (
    <>
      <DepartmentForm
        activeDepartment={activeDepartment}
        mode={FormMode.insert}
        onClose={onModalClose}
        onSubmitAction={handleSubmit}
        open={open}
      />
      <section className="grow flex flex-col max-h-full p-4">
        <DepartmentsTable
          departments={departments}
          handleDelete={handldeBtnDelete}
          hanldeEdit={handleBtnEdit}
        />
        <ButtonFactory
          className="flex w-full m-0 mb-5"
          variant="secondary"
          text="Agregar nuevo departamento"
          onClick={handleBtnAddNew}
        />
      </section>
    </>
  );
};
