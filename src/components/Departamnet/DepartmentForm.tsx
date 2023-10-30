import { TextInput, Select, SelectItem, Callout } from "@tremor/react";
import { ButtonFactory, Modal } from "../ui";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { DepartmentFormData } from "../../types";
import { FC, useEffect, useMemo } from "react";
import { useCCostos } from "../../hooks";
import { FormMode } from "../../const";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const initDefaultValues: DepartmentFormData = {
  ccosto: "",
  descripcion: "",
  id: "",
};

type DepartmentFormProps = {
  activeDepartment: DepartmentFormData | null;
  onSubmitAction: (department: DepartmentFormData) => void;
  mode: FormMode;
  open?: boolean;
  onClose: () => void;
};

export const DepartmentForm: FC<DepartmentFormProps> = ({
  activeDepartment = null,
  onSubmitAction,
  mode,
  open = false,
  onClose,
}) => {
  const btnText = mode === FormMode.edit ? "Save changes" : "Save";
  // Get the states list from the store
  const { loadCCostos, ccostos } = useCCostos();
  // Form data
  const initData = useMemo(
    () => (activeDepartment ? activeDepartment : initDefaultValues),
    [activeDepartment]
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DepartmentFormData>({
    defaultValues: initData,
  });

  // On submit
  const onSubmit: SubmitHandler<DepartmentFormData> = (data) => {
    onSubmitAction(data);
  };

  useEffect(() => {
    if (ccostos.length === 0) {
      loadCCostos();
    }
  }, []);

  useEffect(() => {
    reset(initData);
  }, [activeDepartment]);
  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Department</h2>
        <section className="h-full basis-3/12">
          <article className="max-w-[400px] mx-auto p-5 flex flex-col gap-3">
            {/* Descripcion filed*/}
            <Controller
              name="descripcion"
              control={control}
              rules={{
                required: { value: true, message: "Descripcion is required" },
              }}
              render={({ field }) => (
                <TextInput placeholder="Descripcion" {...field} />
              )}
            />
            {errors.descripcion && (
              <Callout
                className="mt-1 px-3 py-1 border-none"
                title={errors.descripcion.message || "Error"}
                icon={ExclamationCircleIcon}
                color="rose"
              />
            )}
            {/* ccosto field */}
            <Controller
              name="ccosto"
              control={control}
              rules={{
                required: { value: true, message: "ccosto is required" },
              }}
              render={({ field }) => (
                <Select
                  className="[&>ul]:max-h-[100px]"
                  {...field}
                  placeholder="CCosto"
                >
                  {ccostos.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.code}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
            {errors.ccosto && (
              <Callout
                className="mt-1 px-3 py-1 border-none"
                title={errors.ccosto.message || "Error"}
                icon={ExclamationCircleIcon}
                color="rose"
              />
            )}
            <ButtonFactory className="mt-24" type="submit" text={btnText} />
          </article>
        </section>
      </form>
    </Modal>
  );
};
