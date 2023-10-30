import { toast } from "sonner";
import DestiniesTable from "./DestiniesTable";
import { useEffect, useState } from "react";
import { useDestinies } from "../../hooks";
import { DestinyFormData } from "../../types";
import { findById } from "../../helper/findById";
import { DestiniesForm } from "./DestiniesForm";
import { FormMode } from "../../const";
import { ButtonFactory } from "../ui";

export const Destiny = () => {
  // State for handle if the modal is open or not
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<FormMode>(FormMode.insert);

  const {
    destinies,
    loadDestinies,
    insertDestinyAPI,
    updateDestinyAPI,
    deleteDestinyAPI,
  } = useDestinies();
  const [activeDestiny, setactiveDestiny] = useState<DestinyFormData | null>(
    null
  );

  const handleBtnEdit = (id: string) => {
    setMode(FormMode.edit);
    const destiny = findById(id, destinies);
    if (destiny) {
      const trimed: DestinyFormData = { ...destiny, state: destiny.state._id };
      setactiveDestiny(trimed);
      setOpen(true);
    }
  };

  const handleBtnAddNew = () => {
    if (activeDestiny) {
      setactiveDestiny(null);
    }
    if (mode !== FormMode.insert) {
      setMode(FormMode.insert);
    }
    if (!open) {
      setOpen(true);
    }
  };

  const handldeDelete = (id: string) => {
    deleteDestinyAPI(id);
    if (activeDestiny) {
      setactiveDestiny(null);
    }
    if (mode !== FormMode.insert) {
      setMode(FormMode.insert);
    }
  };

  const handleSubmit = async (destiny: DestinyFormData) => {
    if (mode === FormMode.insert) {
      return await insertDestinyAPI(destiny);
    }
    if (mode === FormMode.edit) {
      return await updateDestinyAPI(destiny);
    }
    return;
  };
  const onModalClose = () => {
    setOpen(false);
    setactiveDestiny(null);
    setMode(FormMode.insert);
  };

  useEffect(() => {
    loadDestinies();
  }, []);

  return (
    <>
      <DestiniesForm
        mode={mode}
        activeDestiny={activeDestiny}
        onSubmitAction={handleSubmit}
        open={open}
        onClose={onModalClose}
      />
      <section className="h-full max-h-full flex flex-col p-4">
        <DestiniesTable
          destinies={destinies}
          handleDelete={handldeDelete}
          hanldeEdit={handleBtnEdit}
        />
        <ButtonFactory
          className="flex w-full mb-4"
          variant="secondary"
          text="Agregar nuevo destino"
          onClick={handleBtnAddNew}
        />
      </section>
    </>
  );
};
