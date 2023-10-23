import React, { useState } from "react";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  DialogContent,
  DialogContentText,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import Select from "react-select";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const equipmentOptions = [
  { value: "option1", label: "Option 1", name: "Option One" },
  { value: "option2", label: "Option 2", name: "Option Two" },
  { value: "option3", label: "Option 3", name: "Option Three" },
];

const patientOptions = [
  {
    value: "option1",
    label: "Patient Transfer",
    name: "Option One",
    data: [
      {
        checkpoint: "Checkpoint Patient 1",
        description: "Description Patient 1",
      },
      {
        checkpoint: "Checkpoint Patient2",
        description: "Description Patient2",
      },
    ],
  },
  {
    value: "option2",
    label: "Option 2",
    name: "Option Two",
    data: [
      {
        checkpoint: "Checkpoint 3",
        description: "Description 3",
      },
      {
        checkpoint: "Checkpoint 4",
        description: "Description 4",
      },
    ],
  },
  {
    value: "option3",
    label: "Option 3",
    name: "Option Three",
    data: [
      {
        checkpoint: "Checkpoint 5",
        description: "Description 5",
      },
      {
        checkpoint: "Checkpoint 6",
        description: "Description 6",
      },
    ],
  },
  {
    value: "option4",
    label: "Option 4",
    name: "Option Four",
    data: [
      {
        checkpoint: "Checkpoint 7",
        description: "Description 7",
      },
      {
        checkpoint: "Checkpoint 8",
        description: "Description 8",
      },
    ],
  },
  {
    value: "option5",
    label: "Option 5",
    name: "Option Five",
    data: [
      {
        checkpoint: "Checkpoint 9",
        description: "Description 9",
      },
      {
        checkpoint: "Checkpoint 10",
        description: "Description 10",
      },
    ],
  },
];

const ArrayData = [
  {
    name: "BMW",
    model: 2022,
  },
  {
    name: "AUDI",
    model: 2021,
  },
];

const schema = yup.object().shape({
  date: yup.string().required("Date Is required.").nullable(),
  time: yup.string().required("Time is required.").nullable(),
  uhid: yup.string(),
  activity: yup.object().nullable(),
  patientName: yup.string(),
  pickupPoint: yup.string().required("PickupPoint Is required.").nullable(),
  dropPoint: yup.string().required("DropPoint Is required.").nullable(),
  remarks: yup.string(),
  equipment: yup.object().nullable(),
});

const BookTransporter = () => {
  const initialValue = {
    date: null,
    time: null,
    activity: null,
    patientName: "",
    uhid: "",
    pickupPoint: "",
    dropPoint: "",
    equipment: null,
    remarks: "",
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    initialValue,
  });

  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedPatientData, setSelectedPatientData] = useState([]);

  const handleEquipmentChange = (selectedEquipment) => {
    setSelectedEquipment(selectedEquipment);
  };
  const handleItemClick = (index) => {
    setSelectedItem(null);
    initialValue.arrList = { ...index };
  };

  const handlePatientOptionChange = (selectedPatientOption) => {
    setSelectedPatientData(selectedPatientOption.data);
  };

  const onSubmitData = (data) => {
    if (selectedItemIndex !== null) {
      const selectedObject = ArrayData[selectedItemIndex];
      console.log("Selected Object Item", selectedObject);
      setSelectedItem(null);
      console.log("Output", data);
    } else {
      setSelectedItem("No item selected");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitData)}>
        <DialogContent>
          <DialogContentText>
            <Box textAlign="left">
              <Grid lg={12} sm={12} md={12} item container spacing={2}>
                <Grid item xs={6} md={2} sm={3} lg={2}>
                  <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          {...field}
                          label="Date"
                          slotProps={{
                            textField: { size: "small" },
                            field: { shouldRespectLeadingZeros: true },
                          }}
                          format="M/D/YYYY"
                          renderInput={(params) => <TextField {...params} />}
                          value={field.value || null}
                          onChange={(date) => field.onChange(date)}
                        />
                      </LocalizationProvider>
                    )}
                  />
                  {errors.date && (
                    <p className="text-red-700">{errors.date.message}</p>
                  )}
                </Grid>
                <Grid item xs={6} md={2} sm={3} lg={2}>
                  <Controller
                    name="time"
                    control={control}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          {...field}
                          label="Time *"
                          slotProps={{ textField: { size: "small" } }}
                          onChange={(newTime) => field.onChange(newTime)}
                          renderInput={(params) => (
                            <TextField {...params} variant="outlined" />
                          )}
                        />
                      </LocalizationProvider>
                    )}
                  />
                  {errors.time && (
                    <p className="text-red-700">{errors.time.message}</p>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Controller
                    name="activity"
                    control={control}
                    defaultValue={null}
                    rules={{ required: "Activity is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={patientOptions}
                        placeholder="Activity"
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption);
                          handlePatientOptionChange(selectedOption);
                        }} 
                        value={patientOptions.find(
                          (c) => c.value === field.value
                        )}
                        className="w-full"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={8} sm={6} md={3} lg={3}>
                  <Controller
                    name="patientName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="patientName"
                        label="Patient Name"
                        variant="outlined"
                        multiline
                        size="small"
                        rows={1}
                        className="w-full"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4} sm={6} md={1} lg={1}>
                  <Controller
                    name="uhid"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="uhid"
                        size="small"
                        label="UHID"
                        variant="outlined"
                        className="w-full"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Controller
                    name="pickupPoint"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-required"
                        label="Pickup Point *"
                        variant="outlined"
                        size="small"
                        className="w-full"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                  {errors.pickupPoint && (
                    <p className="text-red-700">{errors.pickupPoint.message}</p>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Controller
                    name="dropPoint"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-required"
                        label="Drop Point *"
                        variant="outlined"
                        size="small"
                        className="w-full"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                  {errors.dropPoint && (
                    <p className="text-red-700">{errors.dropPoint.message}</p>
                  )}
                </Grid>
                <Grid item xs={12} md={4} sm={6}>
                  <Controller
                    name="equipment"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        id="equipment"
                        options={equipmentOptions}
                        placeholder="Equipment"
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption);
                          handleEquipmentChange(selectedOption);
                        }}
                        value={selectedEquipment}
                        className="w-full"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4} sm={6}>
                  <Controller
                    name="remarks"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="remarks"
                        label="Remarks"
                        variant="outlined"
                        multiline
                        size="small"
                        rows={1}
                        className="w-full"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
            <hr className="mt-4" />
            <Grid container spacing={2} className="mt-1">
              <Grid item xs={12} className="mb-2 bold">
                <div className="text-black text-base">Activity Hooks</div>
              </Grid>
            </Grid>
            <Grid lg={12} md={12} sm={12} item container spacing={2}>
              <Grid
                item
                xs={12}
                sm={12}
                md={8}
                className="border-r border-gray-500 pr-1"
              >
                <Table
                  className="w-full  border-r border-gray-400 "
                  size="small"
                >
                  <TableHead size="small">
                    <TableRow className="bg-zinc-100">
                      <TableCell className="border">Actions</TableCell>
                      <TableCell className="border">Checkpoint</TableCell>
                      <TableCell className="border">Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedPatientData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="border px-4 py-2">
                          <button>
                            <DeleteIcon style={{ color: "red" }} />
                          </button>
                        </TableCell>
                        <TableCell className="border px-4 py-2">
                          {item.checkpoint}
                        </TableCell>
                        <TableCell className="border px-4 py-2">
                          {item.description}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <hr className=" border-gray-500 pb-2  mt-4" />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Grid container md={12} sm={12} item spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={4}>
                    <Typography
                      component={"div"}
                      variant="subtitle1"
                      fontWeight={600}
                      mb="5px"
                      mt="5px"
                    >
                      Transporters
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={8}>
                    <Controller
                      name="transporterSearch"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-required"
                          label="Transporter Search "
                          variant="outlined"
                          size="small"
                          className="w-full"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} className="  p-1 ">
                    <div className="  mt-2 m-2 text-red-700 ">
                      {selectedItem}
                    </div>
                    {ArrayData.map((cardData, index) => (
                      <div
                        key={index}
                        className={`container mt-3 mb-3 bg-${cardData.color}-100 border  border-gray-600 `}
                        onClick={() => {
                          setSelectedItemIndex(index);
                          handleItemClick(cardData);
                        }}
                      >
                        <div className="row">
                          <div className="col-md-12">
                            <div
                              className=" p-2 shadow-md flex justify-between"
                              style={{
                                cursor: "pointer",
                                backgroundColor:
                                  selectedItemIndex === index
                                    ? "lightblue"
                                    : "white",
                              }}
                            >
                              <div>
                                <div className="text-sm font-semibold">
                                  {cardData.name}{" "}
                                  <span className="ml-5">{cardData.model}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <hr className="mt-4" />
            <Grid
              container
              className=" gap-5 mt-3"
              justifyContent={{
                md: "center",
                lg: "flex-end",
                sm: "center",
                xs: "center",
              }}
            >
              <Grid>
                <Button variant="outlined" color="error">
                  Reset
                </Button>
              </Grid>
              <Grid>
                <Button variant="outlined" type="submit">
                  Book
                </Button>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </form>
    </>
  );
};
export default BookTransporter;
