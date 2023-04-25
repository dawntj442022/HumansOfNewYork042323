import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../contexts/authContext";

function LoginForm() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useAuthContext();

  const onSubmit = async (data) => {
    try {
      await login(data);
      history.push("/blogs");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", { required: true })}
        />
        {errors.email && <p>Email is required</p>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register("password", { required: true })}
        />
        {errors.password && <p>Password is required</p>}
      </div>
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginForm;