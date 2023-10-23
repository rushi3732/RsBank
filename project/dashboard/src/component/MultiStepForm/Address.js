import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import {
  setInput,
  selectAddress,
  setStep,
  setRequiredFieldsFilled,
} from "../../formSlice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  address1: yup.string().required("Address is required"),
  address2: yup.string(),
  city: yup.string().required("City is required"),
});

const Address = () => {
  const dispatch = useDispatch();
  const address = useSelector(selectAddress);

  const { control, handleSubmit, formState, getValues } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: address,
  });
  const Back = () => {
    dispatch(setStep(0));
  };
  useEffect(() => {
    const data = getValues();

    if (formState.isValid) {
      dispatch(setInput({ key: "address", value: data }));

      dispatch(setRequiredFieldsFilled(true));
    } else {
      dispatch(setRequiredFieldsFilled(false));
    }
  }, [formState.isValid, dispatch, getValues]);

  const onSubmit = (data) => {
    dispatch(setInput({ key: "address", value: data }));
    dispatch(setStep(2));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 space-y-4  border-gray-500  border  mt-2 rounded-lg"
    >
      <div className="flex flex-col">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Address-1 *
        </label>
        <Controller
          name="address1"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="address1 "
              className="px-3 py-2 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
       
            />
          )}
        />
        <p
          className={`text-red-500 text-sm ${
            formState.errors.address1 ? "" : "hidden"
          }`}
        >
          {formState.errors.address1?.message}
        </p>
      </div>
      <div className="flex flex-col">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Address-2
        </label>
        <Controller
          name="address2"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="address2 "
              className="px-3 py-2 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
            />
          )}
        />
      </div>
      <div className="flex flex-col">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          City *
        </label>
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Pune "
              className="px-3 py-2 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
            />
          )}
        />
        <p
          className={`text-red-500 text-sm ${
            formState.errors.city ? "" : "hidden"
          }`}
        >
          {formState.errors.city?.message}
        </p>
      </div>
      <button
        onClick={Back}
        className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 mr-2"
      >
        Back
      </button>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Next
      </button>
    </form>
  );
};

export default Address;
