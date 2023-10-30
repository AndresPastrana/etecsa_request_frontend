import { TextInput, Select, SelectItem, Callout } from "@tremor/react";
import { ButtonFactory, Modal } from "../ui";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { DestinyFormData } from "../../types";
import { FC, useEffect, useMemo } from "react";
import { useStates } from "../../hooks";
import { FormMode } from "../../const";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const initDefaultValues: DestinyFormData = {
  code: "",
  description: "",
  state: "",
  id: "",
};

type DestinyFormProps = {
  activeDestiny: DestinyFormData | null;
  onSubmitAction: (destiny: DestinyFormData) => void;
  mode: FormMode;
  open?: boolean;
  onClose: () => void;
};

export const DestiniesForm: FC<DestinyFormProps> = ({
  activeDestiny = null,
  onSubmitAction,
  mode,
  open = false,
  onClose,
}) => {
  const btnText = mode === FormMode.edit ? "Save changes" : "Save";
  // Get the states list from the store
  const { states, loadStates } = useStates();
  // Form data
  const initData = useMemo(() => {
    return activeDestiny ? activeDestiny : initDefaultValues;
  }, [activeDestiny]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DestinyFormData>({
    defaultValues: initData,
  });

  // On submit
  const onSubmit: SubmitHandler<DestinyFormData> = (data) => {
    onSubmitAction(data);
  };

  useEffect(() => {
    if (states.length === 0) {
      loadStates();
    }
  }, []);

  useEffect(() => {
    reset(initData);
  }, [activeDestiny]);
  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Destinos</h2>
        <section className="h-full basis-3/12">
          <article className="max-w-[400px] mx-auto p-5 flex flex-col gap-3">
            <Controller
              name="code"
              control={control}
              rules={{ required: { value: true, message: "Code is required" } }}
              render={({ field }) => (
                <TextInput placeholder="code" {...field} />
              )}
            />
            {errors.code && (
              <Callout
                className="mt-1 px-3 py-1 border-none"
                title={errors.code.message || "Error"}
                icon={ExclamationCircleIcon}
                color="rose"
              />
            )}

            <Controller
              name="description"
              control={control}
              rules={{
                required: { value: true, message: "Description is required" },
              }}
              render={({ field }) => (
                <TextInput placeholder="description" {...field} />
              )}
            />
            {errors.description && (
              <Callout
                className="mt-1 px-3 py-1 border-none"
                title={errors.description.message || "Error"}
                icon={ExclamationCircleIcon}
                color="rose"
              />
            )}
            <Controller
              name="state"
              control={control}
              rules={{
                required: { value: true, message: "State is required" },
              }}
              render={({ field }) => (
                <Select className="[&>ul]:max-h-[100px]" {...field}>
                  {states.map((s) => (
                    <SelectItem value={s.id}>{s.name}</SelectItem>
                  ))}
                </Select>
              )}
            />
            {errors.state && (
              <Callout
                className="mt-1 px-3 py-1 border-none"
                title={errors.state.message || "Error"}
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
