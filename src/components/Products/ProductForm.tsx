import { TextInput, Callout, NumberInput } from "@tremor/react";
import { ButtonFactory, Modal } from "../ui";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { IProduct } from "../../types";
import { FC, useEffect, useMemo } from "react";
import { FormMode } from "../../const";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const initDefaultValues: IProduct = {
  id: "",
  code: "",
  name: "",
  aviableQuantity: 0,
  price: 0,
};

type ProductFormProps = {
  activeProduct: IProduct | null;
  onSubmitAction: (product: IProduct) => void;
  mode: FormMode;
  open?: boolean;
  onClose: () => void;
};

export const ProductForm: FC<ProductFormProps> = ({
  activeProduct = null,
  onSubmitAction,
  mode,
  open = false,
  onClose,
}) => {
  const btnText = mode === FormMode.edit ? "Save changes" : "Save";
  // Form data
  const initData = useMemo(() => {
    return activeProduct ? activeProduct : initDefaultValues;
  }, [activeProduct]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IProduct>({
    defaultValues: initData,
  });

  // On submit
  const onSubmit: SubmitHandler<IProduct> = (data) => {
    onSubmitAction(data);
  };

  useEffect(() => {
    reset(initData);
  }, [activeProduct]);
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
              name="name"
              control={control}
              rules={{ required: { value: true, message: "name is required" } }}
              render={({ field }) => (
                <TextInput placeholder="Nombre del producto" {...field} />
              )}
            />
            {errors.name && (
              <Callout
                className="mt-1 px-3 py-1 border-none"
                title={errors.name.message || "Error"}
                icon={ExclamationCircleIcon}
                color="rose"
              />
            )}

            <Controller
              name="price"
              control={control}
              rules={{ required: { value: true, message: "name is required" } }}
              render={({ field }) => (
                <NumberInput placeholder="Precio en cup" {...field} />
              )}
            />
            {errors.price && (
              <Callout
                className="mt-1 px-3 py-1 border-none"
                title={errors.price.message || "Error"}
                icon={ExclamationCircleIcon}
                color="rose"
              />
            )}

            <Controller
              name="aviableQuantity"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "aviableQuantity is required",
                },
              }}
              render={({ field }) => (
                <NumberInput placeholder="Cantidad" {...field} />
              )}
            />
            {errors.aviableQuantity && (
              <Callout
                className="mt-1 px-3 py-1 border-none"
                title={errors.aviableQuantity.message || "Error"}
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
