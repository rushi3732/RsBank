import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import api from "./api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object().shape({
  accountId: Yup.object().optional(),
  accountType: Yup.string().required("Account Type is required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      "Invalid email address"
    ),
  phone: Yup.string()
    .required("Phone is required")
    .matches(/^[\d-]+$/, "Phone number must only contain numbers and dashes"),
  address: Yup.string().required("Address is required"),
});

const AccountList = () => {
  const defaultValue = {
    accountType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  };

  const [rowData, setRowData] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);
  const [actionTitle, setActionTitle] = useState("Create");

  const { handleSubmit, control, reset } = useForm({
    mode: "onChange",
    defaultValue,
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await api.get("/accounts");
      const accountsAll = response.data.data;
      setRowData(accountsAll);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCreateOpen = () => {
    setOpen(true);
    setActionTitle("Create");
    reset(defaultValue);
  };

  const handleClose = () => {
    setId(0);
    setOpen(false);
    reset();
  };

  const deleteAccount = async (accountId) => {
    try {
      await api.delete(`/accountdeleteById/${accountId}`);
      toast.warn("Account Delete successfully ");
      fetchAccounts();
    } catch (error) {
      toast.error(" Error deleting account  ");
      console.error("Error deleting account:", error);
    }
  };



  const handleUpdateButtonClick = (account) => {
    setId(account._id);
    setActionTitle("Update");

    const updatedFormData = {
      accountType: account.accountType,
      firstName: account.accountHolder.firstName,
      lastName: account.accountHolder.lastName,
      email: account.accountHolder.contactInfo.email,
      phone: account.accountHolder.contactInfo.phone,
      address: account.accountHolder.contactInfo.address,
    };
    reset(updatedFormData);
    handleOpen();
  };

  const handleCreateOrUpdateAccount = async (data) => {
    const accountData = {
      accountId: id,
      accountType: data.accountType,
      accountHolder: {
        firstName: data.firstName,
        lastName: data.lastName,
        contactInfo: {
          email: data.email,
          phone: data.phone,
          address: data.address,
        },
      },
    };
    try {
      if (id) {
        await api.put(`/accountupdate/${accountData.accountId}`, accountData);
        setId(0);
        toast.success(`Account Updated successfully`);
      } else {
        await api.post("/saveaccounts", accountData);
        toast.success(`Account Created successfully`);
      }
      handleClose();
      fetchAccounts();
    } catch (error) {
      toast.error(`Error{actionTitle} Account`);
      console.error("Error creating/updating account:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={handleCreateOpen}
      >
        Create Account
      </button>
      <table className="mt-2 w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Account Number</th>
            <th className="border p-2">Account Type</th>
            <th className="border p-2">First Name</th>
            <th className="border p-2">Last Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Addreess</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {rowData.map((account, index) => (
            <tr key={account._id}>
              <td className="border p-2">{account.accountNumber}</td>
              <td className="border p-2">{account.accountType}</td>
              <td className="border p-2">{account.accountHolder?.firstName}</td>
              <td className="border p-2">{account.accountHolder?.lastName}</td>
              <td className="border p-2">
                {account.accountHolder?.contactInfo?.email}
              </td>
              <td className="border p-2">
                {account.accountHolder?.contactInfo?.phone}
              </td>
              <td className="border p-2">
                {account.accountHolder?.contactInfo?.address}
              </td>
              <td className="border p-2 ">
                <div className="flex gap-3">
                  {" "}
                  <div
                    onClick={() => handleUpdateButtonClick(account)}
                    className="text-blue-600 hover:text-blue-900 focus:outline-none"
                  >
                    <FaEdit size={20} />
                  </div>
                  <div
                    onClick={() => deleteAccount(account._id)}
                    className="text-red-600 hover:text-red-900 focus:outline-none"
                  >
                    <FaTrash size={20} />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle className="bg-black text-white py-3">
          {actionTitle} Account
        </DialogTitle>
        <DialogContent>
          <form className="pt-3">
            <div className="mb-4 mt-2">
              <Controller
                name="accountType"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    size="small"
                    label="Account Type"
                    {...field}
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    fullWidth
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <Controller
                name="firstName"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    size="small"
                    label="First Name"
                    {...field}
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    fullWidth
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <Controller
                name="lastName"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    size="small"
                    label="Last Name"
                    {...field}
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    fullWidth
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    size="small"
                    label="Email"
                    {...field}
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    fullWidth
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    size="small"
                    label="Phone"
                    {...field}
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    fullWidth
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="address"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    size="small"
                    label="Address"
                    {...field}
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    fullWidth
                  />
                )}
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions className="justify-center pr-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClose}
          >
            {actionTitle === "Create" ? "Cancel" : "Discard"}
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit(handleCreateOrUpdateAccount)}
          >
            {actionTitle === "Create" ? "Create" : "Update"}
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AccountList;
