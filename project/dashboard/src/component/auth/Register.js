import React from "react";
import { useForm, Controller } from "react-hook-form";
import api from "../api/api";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  userName: yup.string().required("Username is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

const Register = () => {
  const title = "Registration";
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/register", data);
      if (response.status === 200) {
        toast.success(" User Register Successfully..!!");
        navigate('/auth/login"');
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log("Something bad happened", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md p-8 rounded-lg w-full max-w-md">
        {title && (
          <h2 className="font-bold  text-center  text-3xl mb-4">{title}</h2>
        )}
        <ToastContainer position="top-right" autoClose={3000} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="text-base font-mono" htmlFor="userName">
              Username :
            </label>
            <Controller
              name="userName"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  className={`px-3 py-2 placeholder-slate-300 relative  bg-white rounded text-sm border ${
                    errors.userName
                      ? " border-red-400 text-red-600"
                      : "border-slate-300 text-slate-600"
                  } outline-none focus:outline-none focus:ring w-full`}
                />
              )}
            />
            {errors.userName && (
              <p className="text-red-500">{errors.userName.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="text-base font-mono" htmlFor="email">
              Email :
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  type="email"
                  {...field}
                  className={`px-3 py-2 placeholder-slate-300 relative  bg-white rounded text-sm border ${
                    errors.email
                      ? " border-red-400 text-red-600"
                      : "border-slate-300 text-slate-600"
                  } outline-none focus:outline-none focus:ring w-full`}
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="text-base font-mono" htmlFor="password">
              Password :
            </label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  type="password"
                  {...field}
                  className={`px-3 py-2 placeholder-slate-300 relative  bg-white rounded text-sm border ${
                    errors.password
                      ? " border-red-400 text-red-600"
                      : "border-slate-300 text-slate-600"
                  } outline-none focus:outline-none focus:ring w-full`}
                />
              )}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <button
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none w-full"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
