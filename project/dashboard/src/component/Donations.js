// import React from 'react'

// const Donations = () => {
//   return (
//     <h1 className="text-1xl font-bold mb-2">Donations</h1 >

//   )
// }

// export default Donations
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function Donations() {
  const {
    handleSubmit: handleSubmit1,
    control: control1,
    formState: { errors: errors1 },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        firstName: yup.string().required("First Name is required"),
        lastName: yup.string().required("Last Name is required"),
        age: yup
          .number()
          .typeError("Age must be a number")
          .required("Age is required")
          .positive("Age must be a positive number"),
        gender: yup.string().required("Gender is required"),
      })
    ),
    mode: "onChange",
  });

  const {
    handleSubmit: handleSubmit2,
    control: control2,
    formState: { errors: errors2 },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .required("Email is required")
          .email("Enter a valid email"),
        address: yup.string().required("Address is required"),
        phone: yup.string().required("Phone number is required"),
        city: yup.string().required("City is required"),
      })
    ),
    mode: "onChange",
  });

  const {
    handleSubmit: handleSubmit3,
    control: control3,
    formState: { errors: errors3 },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        username: yup.string().required("Username is required"),
        password: yup
          .string()
          .required("Password is required")
          .min(6, "Password must be at least 6 characters"),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref("password"), null], "Passwords must match"),
      })
    ),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="App grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <form
        key={1}
        onSubmit={handleSubmit1(onSubmit)}
        className="bg-white border-2 p-4   rounded-lg"
      >
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            First Name
          </label>
          <Controller
            name="firstName"
            control={control1}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Bill"
                type="text"
                className="px-3 py-2 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
              />
            )}
          />
          {errors1.firstName && (
            <p className="text-red-500">{errors1.firstName.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Last Name
          </label>
          <Controller
            name="lastName"
            control={control1}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Luo"
                type="text"
                className="px-3 py-2 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
              />
            )}
          />
          {errors1.lastName && (
            <p className="text-red-500">{errors1.lastName.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="age"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Age
          </label>
          <Controller
            name="age"
            control={control1}
            render={({ field }) => (
              <input
                {...field}
                placeholder="25"
                type="text"
                className="px-3 py-2 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
              />
            )}
          />
          {errors1.age && <p className="text-red-500">{errors1.age.message}</p>}
        </div>

        <div className="mb-4">
          <label
            htmlFor="gender"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Gender
          </label>
          <Controller
            name="gender"
            control={control1}
            render={({ field }) => (
              <select
                {...field}
                type="text"
                placeholder="address2 "
                className="px-3 py-2 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            )}
          />
          {errors1.gender && (
            <p className="text-red-500">{errors1.gender.message}</p>
          )}
        </div>

        <input
          type="submit"
          value="Save Form 1"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        />
      </form>

      <form
        key={2}
        onSubmit={handleSubmit2(onSubmit)}
        className="bg-white border-2 p-4   rounded-lg"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <Controller
            name="email"
            control={control2}
            render={({ field }) => (
              <input
                {...field}
                placeholder="example@example.com"
                type="text"
                className="px-3 py-2 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
              />
            )}
          />
          {errors2.email && (
            <p className="text-red-500">{errors2.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Address
          </label>
          <Controller
            name="address"
            control={control2}
            render={({ field }) => (
              <input
                {...field}
                placeholder="123 Main St"
                type="text"
                className="px-3 py-2 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
              />
            )}
          />
          {errors2.address && (
            <p className="text-red-500">{errors2.address.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Phone
          </label>
          <Controller
            name="phone"
            control={control2}
            render={({ field }) => (
              <input
                {...field}
                placeholder="555-555-5555"
                type="text"
                className="px-3 py-2 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
              />
            )}
          />
          {errors2.phone && (
            <p className="text-red-500">{errors2.phone.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            City
          </label>
          <Controller
            name="city"
            control={control2}
            render={({ field }) => (
              <input
                {...field}
                placeholder="New York"
                type="text"
                className="px-3 py-2 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
              />
            )}
          />
          {errors2.city && (
            <p className="text-red-500">{errors2.city.message}</p>
          )}
        </div>

        <input
          type="submit"
          value="Save Form 2"
          className=" mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        />
      </form>

      <form
        key={3}
        onSubmit={handleSubmit3(onSubmit)}
        className="bg-white border-2 p-4   rounded-lg"
      >
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Username
          </label>
          <Controller
            name="username"
            control={control3}
            render={({ field }) => (
              <input
                {...field}
                placeholder="myusername"
                type="text"
                className="px-3 py-2 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
              />
            )}
          />
          {errors3.username && (
            <p className="text-red-500">{errors3.username.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <Controller
            name="password"
            control={control3}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                placeholder="password "
                className="px-3 py-2 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
              />
            )}
          />
          {errors3.password && (
            <p className="text-red-500">{errors3.password.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Confirm Password
          </label>
          <Controller
            name="confirmPassword"
            control={control3}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                placeholder="address2 "
                className="px-3 py-2 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
              />
            )}
          />
          {errors3.confirmPassword && (
            <p className="text-red-500">{errors3.confirmPassword.message}</p>
          )}
        </div>

        <input
          type="submit"
          value="Save Form 3"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        />
      </form>
    </div>
  );
}

export default Donations;
