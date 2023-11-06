import { TextInput, Select, SelectItem, Callout } from "@tremor/react";
import { FormMode, UserRole } from "../../const";
import { UserFormData } from "../../types";
import { ComponentPropsWithRef, FC, useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import useDepartments from "../../hooks/useDepartments";
import { ButtonFactory } from "../ui";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

interface UserFormProps extends ComponentPropsWithRef<"form"> {
  activeUser: UserFormData | null;
  onSubmitAction: (user: UserFormData) => void;
  mode: FormMode;
}

const initDefaultValues: UserFormData = {
  email: "",
  id: "",
  firstName: "",
  lastName: "",
  username: "",
  role: UserRole.HEAD_OF_DEPARTMENT,
  departament: "",
  password: "",
};

export const UserForm: FC<UserFormProps> = ({
  activeUser,
  mode,
  onSubmitAction,
  ...rest
}) => {
  const { departments, loadDepartments } = useDepartments();

  const btnText = mode === FormMode.edit ? "Save changes" : "Save";

  const initData = useMemo(() => {
    return activeUser ? activeUser : initDefaultValues;
  }, [activeUser]);

  // Form state
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: initData,
  });

  // On submit
  const submitHandler = (data: UserFormData) => {
    onSubmitAction(data);
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  useEffect(() => {
    reset(initData);
  }, [activeUser]);

  return (
    <form
      className="basis-3/12 flex"
      onSubmit={handleSubmit(submitHandler)}
      {...rest}
    >
      <section className="h-full basis-3/12">
        <article className="max-w-[400px] mx-auto p-5 flex flex-col gap-3">
          <Controller
            name="firstName"
            control={control}
            rules={{
              required: { value: true, message: "Firstname is required" },
            }}
            render={({ field }) => (
              <TextInput type="text" placeholder="Primer Nombre" {...field} />
            )}
          />

          {errors.firstName && (
            <Callout
              className="mt-1 px-3 py-1 border-none"
              title={errors.firstName.message || "Error"}
              icon={ExclamationCircleIcon}
              color="rose"
            />
          )}

          <Controller
            name="lastName"
            control={control}
            rules={{
              required: { value: true, message: "Lastname is required" },
            }}
            render={({ field }) => (
              <TextInput type="text" placeholder="Apellido" {...field} />
            )}
          />
          {errors.lastName && (
            <Callout
              className="mt-1 px-3 py-1 border-none"
              title={errors.lastName.message || "Error"}
              icon={ExclamationCircleIcon}
              color="rose"
            />
          )}

          <Controller
            name="role"
            control={control}
            rules={{
              required: { value: true, message: "Role is required" },
            }}
            render={({ field }) => (
              <Select placeholder="Role" {...field}>
                <SelectItem value={UserRole.HEAD_OF_DEPARTMENT}>
                  {UserRole.HEAD_OF_DEPARTMENT}
                </SelectItem>
              </Select>
            )}
          />
          {errors.role && (
            <Callout
              className="mt-1 px-3 py-1 border-none"
              title={errors.role.message || "Error"}
              icon={ExclamationCircleIcon}
              color="rose"
            />
          )}

          <Controller
            name="departament"
            control={control}
            rules={{
              required: { value: true, message: "Departament is required" },
            }}
            render={({ field }) => (
              <Select placeholder="Departament" {...field}>
                {departments.map((d) => {
                  return (
                    <SelectItem key={d.id} value={d.id}>
                      {" "}
                      {d.descripcion}
                    </SelectItem>
                  );
                })}
              </Select>
            )}
          />
          {errors.departament && (
            <Callout
              className="mt-1 px-3 py-1 border-none"
              title={errors.departament.message || "Error"}
              icon={ExclamationCircleIcon}
              color="rose"
            />
          )}
        </article>
      </section>
      <section className="h-full basis-3/12">
        <article className="max-w-[400px] mx-auto p-5 flex flex-col gap-3">
          <Controller
            name="email"
            control={control}
            rules={{
              required: { value: true, message: "Email is required" },
            }}
            render={({ field }) => (
              <TextInput type="email" placeholder="Email" {...field} />
            )}
          />
          {errors.email && (
            <Callout
              className="mt-1 px-3 py-1 border-none"
              title={errors.email.message || "Error"}
              icon={ExclamationCircleIcon}
              color="rose"
            />
          )}

          <Controller
            name="username"
            control={control}
            rules={{
              required: { value: true, message: "Username is required" },
            }}
            render={({ field }) => (
              <TextInput type="text" placeholder="Nombre Usuario" {...field} />
            )}
          />
          {errors.username && (
            <Callout
              className="mt-1 px-3 py-1 border-none"
              title={errors.username.message || "Error"}
              icon={ExclamationCircleIcon}
              color="rose"
            />
          )}

          <Controller
            name="password"
            control={control}
            rules={{
              required: {
                value: mode !== FormMode.edit,
                message: "password is required",
              },
            }}
            render={({ field }) => (
              <TextInput type="password" placeholder="Contrasena" {...field} />
            )}
          />
          {errors.password && (
            <Callout
              className="mt-1 px-3 py-1 border-none"
              title={errors.password.message || "Error"}
              icon={ExclamationCircleIcon}
              color="rose"
            />
          )}
        </article>
      </section>
      <section className="p-5">
        <ButtonFactory
          className="max-h-[38px] min-w-[130px]"
          text={btnText}
          variant="primary"
        />
      </section>
    </form>
  );
};
