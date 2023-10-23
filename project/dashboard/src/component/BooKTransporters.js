import React, { useState, useEffect } from 'react';
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
    Box,
    Button,
    DialogContent,
    DialogContentText,
    TextField,
    Typography,
    Grid, Radio, Checkbox
} from '@mui/material';
import Select from 'react-select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useForm, Controller } from 'react-hook-form';
import { MdEdit, MdDelete } from 'react-icons/md';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';


const schema = yup.object().shape({
    date: yup.string().required('Date Is required.').nullable(),
    time: yup.string().required('Time is required.').nullable(),
    uhid: yup.string(),
    activity: yup.object().nullable(),
    patientName: yup.string(),
    pickupPoint: yup.string().required('PickupPoint Is required.').nullable(),
    dropPoint: yup.string().required('DropPoint Is required.').nullable(),
    remarks: yup.string(),
    equipment: yup.string().nullable(),
    gender: yup.string().required('Gender is required').nullable(),
    // checkboxes: yup
    //     .array()
    //     .of(yup.string())
    //     .min(1, 'At least one checkbox must be selected')
    //     .required('At least one checkbox must be selected').nullable(),
});

const BooKTransporters = () => {
    const initialValue = {
        date: null,
        time: null,
        // activity: null,
        patientName: "",
        uhid: "",
        pickupPoint: "",
        dropPoint: "",
        equipment: null,
        remarks: "",
        gender: '',
        // checkboxes: null,
    }
    const [editingBooking, setEditingBooking] = useState(null);

    const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: editingBooking || initialValue,
    });
    const [selectedEquipment] = useState(' ');
    const [bookings, setBookings] = useState([]);

    const createBooking = (data) => {
        const newBooking = { ...data, id: Date.now() };
        setBookings([...bookings, newBooking]);
    };

    useEffect(() => {
        if (editingBooking !== null) {
            //setValue('date', new DatePicker(editingBooking.date));
            setValue('time', editingBooking.time);
            //   setValue('activity', editingBooking.activity);
            setValue('patientName', editingBooking.patientName);
            setValue('uhid', editingBooking.uhid);
            setValue('pickupPoint', editingBooking.pickupPoint);
            setValue('dropPoint', editingBooking.dropPoint);
            setValue('equipment', editingBooking.equipment);
            setValue('remarks', editingBooking.remarks);
            setValue('gender', editingBooking.gender);
        }
    }, [editingBooking]);

    const updateBooking = (id) => {
        const bookingToEdit = bookings.find((booking) => booking.id === id);
        setEditingBooking(bookingToEdit);
    };

    const handleDeleteSuccess = () => {
        toast.warning('Record Delete successfully!', {
            position: 'top-right',
            autoClose: 3000,
        });
    };

    const deleteBooking = (id) => {
        const updatedBookings = bookings.filter((booking) => booking.id !== id);
        handleDeleteSuccess();
        setBookings(updatedBookings);
    };


    const handleSuccess = () => {
        toast.success('Booking created successfully!', {
            position: 'top-right',
            autoClose: 3000,
        });
    };

    const handleUpdateSuccess = () => {
        toast.success('Booking Updated successfully!', {
            position: 'top-right',
            autoClose: 3000,
        });
    };



    const handleError = () => {
        toast.error('An error occurred while creating the booking.', {
            position: 'top-right',
            autoClose: 3000,
        });
    }


    const onSubmitData = (data) => {
        if (editingBooking) {
            const updatedBookings = bookings.map((booking) =>
                booking.id === editingBooking.id ? { ...data, id: editingBooking.id } : booking
            );
            setBookings(updatedBookings);
            handleUpdateSuccess();
            setEditingBooking(null);
        } else {
            createBooking(data);
            handleSuccess()
        }
        reset(initialValue);
    };

    const genderOptions = [
        { value: 'female', label: 'Female' },
        { value: 'male', label: 'Male' },
    ];

    const equipmentOptions = [
        { serviceName: 'Option 1', id: 1 },
        { serviceName: 'Option 2', id: 2 },
        { serviceName: 'Option 3', id: 3 },
    ];

    const column = bookings.length > 0 ? Object.keys(bookings[0]) : [];
    if (bookings.length > 0) {
        column.push("Actions");
    }

    const ThData = () => {

        return column.map((data) => {
            return <th scope="col" className='px-6 py-3' key={data}>{data}</th>
        })
    }
    const tdData = () => {
        return bookings.map((data) => {
            return (
                <tr key={data.id}>
                    {column.map((value) => {
                        return (
                            <td className="whitespace-nowrap px-6 py-3 font-medium border-b dark:border-neutral-500" key={value}>
                                {data[value]}
                            </td>
                        );
                    })}
                    <td className="whitespace-nowrap px-6 py-3 font-medium border-b dark:border-neutral-500">
                        <button
                            type='button' title='Edit'
                            onClick={() => updateBooking(data.id)}
                            className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                        >
                            <MdEdit />
                        </button>
                        <button
                            type='button' title='Delete'
                            onClick={() => deleteBooking(data.id)}
                            className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-700 ml-2"
                        >
                            <MdDelete />
                        </button>
                    </td>


                </tr>
            );
        });
    };


    return (
        <>
            <form onSubmit={handleSubmit(onSubmitData)}>
                <DialogContent>
                    <DialogContentText>
                        <div class="container mx-auto">

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
                                                            textField: { size: 'small' },
                                                            field: { shouldRespectLeadingZeros: true }
                                                        }}
                                                        format="M/D/YYYY"
                                                        renderInput={(params) => <TextField  {...params} />}
                                                        value={field.value || null}
                                                        onChange={(date) => field.onChange(date)}
                                                    />
                                                </LocalizationProvider>
                                            )}
                                        />
                                        {errors.date && <p className="text-red-500">{errors.date.message}</p>}
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
                                                        slotProps={{ textField: { size: 'small' } }}
                                                        onChange={(newTime) => field.onChange(newTime)}
                                                        renderInput={(params) => (
                                                            <TextField  {...params} variant="outlined" />
                                                        )}
                                                    />
                                                </LocalizationProvider>
                                            )}
                                        />
                                        {errors.time && <p className="text-red-500">{errors.time.message}</p>}
                                    </Grid>
                                    {/* <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <Controller
                                        name="activity"
                                        control={control}
                                        defaultValue={null}
                                        rules={{ required: 'Activity is required' }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={patientOptions}
                                                placeholder='Activity'
                                                onChange={(selectedOption) => { field.onChange(selectedOption); handlePatientOptionChange(selectedOption) }} // Use the provided onChange function
                                                value={patientOptions.find((c) => c.value === field.value)}
                                                className="w-full"
                                            />
                                        )}
                                    />
                                </Grid> */}
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
                                        {errors.pickupPoint && <p className="text-red-500">{errors.pickupPoint.message}</p>}
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
                                        {errors.dropPoint && <p className="text-red-500">{errors.dropPoint.message}</p>}

                                    </Grid>
                                    <Grid item xs={12} md={4} sm={6} >
                                        <Controller
                                            name="equipment"
                                            control={control}
                                            render={({ field }) => (
                                                <Controller
                                                    name="equipment"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            options={equipmentOptions.map((option) => ({
                                                                value: option.serviceName,
                                                                label: option.serviceName,
                                                            }))}
                                                            placeholder="Select Equipment "
                                                            isSearchable={false}
                                                            onChange={(selectedOption) => {
                                                                field.onChange(selectedOption.value);
                                                            }}
                                                            value={
                                                                equipmentOptions.find((option) => option.serviceName === selectedEquipment)
                                                            }
                                                        />
                                                    )}
                                                />

                                            )}
                                        />

                                    </Grid>
                                    <Grid item xs={12} md={4} sm={6} >
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
                                    <Grid item xs={12} md={4} sm={6}>
                                        <div className="flex items-center space-x-4">
                                            <label className='justify-items-center'>Select Gender</label>
                                            <Controller
                                                control={control}
                                                name="gender"
                                                render={({ field: { onChange, value } }) => (
                                                    <div className='flex items-center'>
                                                        {genderOptions.map((option) => (
                                                            <div key={option.value}>
                                                                <Radio
                                                                    onChange={() => {
                                                                        onChange(option.value);
                                                                    }}
                                                                    checked={value === option.value}
                                                                    value={option.value}
                                                                />
                                                                {option.label}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            />
                                        </div>
                                        {errors.gender && (
                                            <p className="text-red-500">{errors.gender.message}</p>
                                        )}
                                    </Grid>
                                    {/* <Grid item xs={12} md={4} sm={6}>
                                    <div className="flex items-center space-x-3">
                                        <label className='justify-items-center'>Select Option</label>
                                        {options.map((option) => (
                                            <div key={option.value} className="flex items-center">
                                                <Controller
                                                    name="checkboxes"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Checkbox
                                                            {...field}
                                                            onChange={(e) => {
                                                                const selectedValues = field.value || [];
                                                                if (e.target.checked) {
                                                                    selectedValues.push(option.value);
                                                                } else {
                                                                    const index = selectedValues.indexOf(option.value);
                                                                    if (index !== -1) {
                                                                        selectedValues.splice(index, 1);
                                                                    }
                                                                }
                                                                field.onChange(selectedValues);
                                                            }}
                                                            checked={field.value && field.value.includes(option.value)}
                                                        />
                                                    )}
                                                />
                                                <label>{option.label}</label>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.checkboxes && (
                                        <p className="text-red-500">{errors.checkboxes.message}</p>
                                    )}
                                </Grid> */}
                                </Grid>
                            </Box>
                            <hr className="mt-4" />
                            <Grid container className=' gap-5 mt-3' justifyContent={{ md: 'center', lg: 'flex-end', sm: 'center', xs: 'center' }}>
                                <Grid>
                                    <Button variant="outlined" color="error">
                                        Reset
                                    </Button>
                                </Grid>
                                <Grid  >
                                    <Button variant="outlined" type="submit"  >
                                        Book
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid>
                                <div className="flex flex-col">
                                    <div className="overflow-x-auto max-w-[74.7rem]"> {/* Set your desired max-width here */}
                                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                            <div className="overflow-hidden">
                                                <table className="w-full text-left text-sm font-light border dark:border-neutral-500">
                                                    <thead className="border-b font-medium dark:border-neutral-500">
                                                        {ThData()}
                                                    </thead>
                                                    <tbody className="overflow-x-auto overflow-y-auto">
                                                        {tdData()}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        </div>
                    </DialogContentText>
                </DialogContent>
            </form>
        </>
    );
}
export default BooKTransporters;
