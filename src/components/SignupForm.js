import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../contexts/authContext";

function SignupForm() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup } = useAuthContext();

  const onSubmit = async (data) => {
    try {
      await signup(data);
      history.push("/blogs");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          {...register("name", { required: true })}
        />
        {errors.name && <p>Name is required</p>}
      </div>
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
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;
