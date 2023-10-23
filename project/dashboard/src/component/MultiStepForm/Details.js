import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import {
  setInput,
  selectDetails,
  setStep,
  setRequiredFieldsFilled,
} from "../../formSlice";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  age: yup
    .number()
    .typeError("Age must be a number")
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .required("Age is required")
    .max(90, "Are you sure you're human?"),
  profession: yup.string().required("Profession is required"),
});

const Details = () => {
  const dispatch = useDispatch();
  const details = useSelector(selectDetails);

  const { control, handleSubmit, formState, getValues } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: details,
  });

  const onSubmit = (data) => {
    dispatch(setInput({ key: "details", value: data }));
    dispatch(setStep(1));
  };
  useEffect(() => {
    const data = getValues();

    if (formState.isValid) {
      dispatch(setInput({ key: "details", value: data }));

      dispatch(setRequiredFieldsFilled(true));
    } else {
      dispatch(setRequiredFieldsFilled(false));
    }
  }, [formState.isValid, dispatch, getValues]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 space-y-4  mt-2 border-gray-500  border  rounded-lg"
    >
      <div className="flex flex-col">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name *
        </label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="px-3 py-2 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
              placeholder="Rushi"
            />
          )}
        />
        <p
          className={`text-red-500 text-sm ${
            formState.errors.name ? "" : "hidden"
          }`}
        >
          {formState.errors.name?.message}
        </p>
      </div>
      <div className="flex flex-col">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Age *
        </label>
        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="23 "
              className="px-3 py-2 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
            />
          )}
        />
        <p
          className={`text-red-500 text-sm ${
            formState.errors.age ? "" : "hidden"
          }`}
        >
          {formState.errors.age?.message}
        </p>
      </div>
      <div className="flex flex-col">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Profession *
        </label>
        <Controller
          name="profession"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="testing "
              className="px-3 py-2 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
            />
          )}
        />
        <p
          className={`text-red-500 text-sm ${
            formState.errors.profession ? "" : "hidden"
          }`}
        >
          {formState.errors.profession?.message}
        </p>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Next
      </button>
    </form>
  );
};

export default Details;
