import { Button, TextInput } from "@tremor/react";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../const";

// import { AuthContext } from "../context/Auth";
type Inputs = {
  username: string;
  password: string;
};

// TODO: hanlde login loading and errors states
// TODO: decode the token and set the auth user in the context
const Login = () => {
  const navigate = useNavigate();
  // Form state here
  const {
    register,
    handleSubmit,
    formState: { errors },

    // clearErrors,
  } = useForm<Inputs>();
  const { login } = useAuth();

  const handleLogin = async (data: Inputs) => {
    const auth_user = await login({
      username: data.username,
      password: data.password,
    });
    if (auth_user) {
      const path =
        auth_user.role === UserRole.SPECIALIST ? "/specialist" : "/worker";
      return navigate(path, { replace: true });
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => handleLogin(data);
  useEffect(() => {
    console.log(errors);

    let timer: number;
    // if (Object.keys(errors).length > 0) {
    // 	console.log("AQUI");
    // 	console.log(errors);

    // 	timer = setTimeout(() => {
    // 		clearErrors();
    // 	}, 7000);
    // }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [errors]);

  return (
    <div className="mx-auto border- max-w-sm  mt-44 p-5">
      <h2 className="mb-10 font-medium text-2xl">Bienvenido a ETECSA.SA</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          {...register("username", {
            required: "username is required",
            minLength: {
              value: 3,
              message: "username lenght must be greather than 3",
            },
            maxLength: {
              value: 20,
              message: "username lenght must be less than 20",
            },
          })}
          error={errors.username && true}
          errorMessage={errors.username?.message}
          className="mt-5"
          maxLength={50}
          type="text"
          placeholder="username"
        />

        <TextInput
          {...register("password", {
            required: "password is required",
            minLength: {
              value: 3,
              message: "password lenght must be greather than 3",
            },
            maxLength: {
              value: 50,
              message: "password lenght must be less than 20",
            },
          })}
          error={errors.password && true}
          errorMessage={errors.password?.message}
          className="mt-5"
          maxLength={50}
          type="password"
          placeholder="*************"
        />
        <Button className="w-full mt-10" type="submit">
          Sign in
        </Button>
      </form>
    </div>
  );
};

export default Login;
