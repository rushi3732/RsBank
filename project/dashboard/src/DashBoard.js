import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import { FaHome, FaHistory } from "react-icons/fa";
import { BiDonateBlood, BiSolidHeartCircle } from "react-icons/bi";
import { MdOutlinePersonalInjury } from "react-icons/md";
import { GiDrop } from "react-icons/gi";
import { FaHospital } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function DashBoard() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const [activeSubMenuIndex, setActiveSubMenuIndex] = useState(null);
  const [activeSubMenuChildIndex, setActiveSubMenuChildIndex] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = (index) => {
    if (activeMenuIndex === index) {
      setActiveMenuIndex(null);
    } else {
      setActiveMenuIndex(index);
      setActiveSubMenuIndex(null);
    }
  };

  const toggleSubMenu = (index) => {
    if (activeSubMenuIndex === index) {
      setActiveSubMenuIndex(null);
    } else {
      setActiveSubMenuIndex(index);
      setActiveSubMenuChildIndex(null);
    }
  };

  const toggleSubMenuChild = (index) => {
    if (activeSubMenuChildIndex === index) {
      setActiveSubMenuChildIndex(null);
    } else {
      setActiveSubMenuChildIndex(index);
    }
  };

  const menus = [
    {
      title: "Home",
      icon: <FaHome />,
      path: "/dashboard/home",
    },
    {
      title: "Account",
      icon: <BsFillPersonFill />,
      path: "/dashboard/account",
    },
    {
      title: "Chart",
      icon: <BsFillPersonFill />,
      path: "/dashboard/chart",
    },
    {
      title: "Patient",
      icon: <MdOutlinePersonalInjury />,
      path: "/dashboard/patient",
    },
    {
      title: "Donations",
      icon: <FaHospital />,
      path: "/dashboard/donations",
    },
    {
      title: "Blood Requests",
      icon: <GiDrop />,
      path: "/dashboard/bloodrequest",
    },
    {
      title: "Request History",
      icon: <FaHistory />,
      path: "/dashboard/requesthistory",
    },
    {
      title: "Blood Stock",
      icon: <BiDonateBlood />,
      path: "/dashboard/bloodstock",
    },
    {
      title: "Project",
      icon: <BiDonateBlood />,
      subMenu: true,
      collapse: 1,
      submenuItems: [
        {
          title: "Master",
          subMenuChildren: true,
          submenuItemsChildren: [
            {
              title: "wizard",
              path: "/dashboard/multistepform",
            },
            {
              title: "Paint",
              path: "***",
            },
            {
              title: "Tax",
              path: "***",
            },
          ],
        },
        {
          title: "Ub Master",
          subMenuChildren: true,
          submenuItemsChildren: [
            {
              title: "Children 1",
              path: "***",
            },
            {
              title: "Children 2",
              path: "***",
            },
            {
              title: "Children 3",
              path: "***",
            },
          ],
        },
        {
          title: "Wizard Form",
          path: "dashboard/multistepform",
        },
      ],
    },
  ];

  const handleLogOut = () => {
    navigate("/auth/logout");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} className="bg-blue-800 ">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <BiSolidHeartCircle />
          </IconButton>
          {/* <Typography 
          component={'div'}
          variant="h6" noWrap component="div">
            Blood Bank Management System
          </Typography> */}
          <AppBar position="fixed" open={open} className="bg-red-500 ">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <BiSolidHeartCircle />
              </IconButton>
              {/* <Typography 
              component={'div'} 
              variant="h6" noWrap component="div">
                Blood Bank Management System
              </Typography> */}
              <AppBar
                position="fixed"
                open={open}
                className="bg-blue-800"
                style={{ boxShadow: "none !important" }}
              >
                <Toolbar sx={{ justifyContent: "space-between" }}>
                  <div className="flex items-center">
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={handleDrawerOpen}
                      edge="start"
                      sx={{
                        marginRight: 5,
                        ...(open && { display: "none" }),
                      }}
                    >
                      <BiSolidHeartCircle />
                    </IconButton>
                    {/* <Typography 
                      component={'div'}
                      variant="h6"
                      className="text-white"
                      noWrap
                      component="div"
                    >
                      Blood Bank Management System
                    </Typography> */}
                  </div>
                  <div className="flex items-center">
                    <Typography
                      variant="h6"
                      className="text-white"
                      noWrap
                      component="div"
                    ></Typography>
                    {/* Logout Icon */}
                    <IconButton color="inherit" onClick={handleLogOut}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        className="m-2"
                        viewBox="0 0 30 30"
                        fill="none"
                      >
                        <path
                          d="M25 15H13.125M22.5 18.75L26.25 15L22.5 11.25M15.5178 5.73223C15.0489 5.26339 14.413 5 13.75 5H7.5C6.83696 5 5.96884 5.03116 5.5 5.5C5.03116 5.96884 5 6.83696 5 7.5V22.5C5 23.163 5.03116 24.0312 5.5 24.5C5.96884 24.9688 6.83696 25 7.5 25H13.75C14.413 25 15.0489 24.7366 15.5178 24.2678"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </IconButton>
                  </div>
                </Toolbar>
              </AppBar>
            </Toolbar>
          </AppBar>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {/*     Application Logo       */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="40"
            className="m-2"
            viewBox="0 0 200 40"
            fill="none"
          >
            <path
              d="M38.8128 40C37.2768 40 35.8885 39.6524 34.6479 38.957C33.4074 38.2419 32.4326 37.2486 31.7237 35.9772C31.0148 34.6859 30.6603 33.1959 30.6603 31.5073C30.6603 29.8386 31.0246 28.3586 31.7532 27.0673C32.4818 25.776 33.4763 24.7827 34.7366 24.0874C35.9968 23.3921 37.4048 23.0445 38.9605 23.0445C40.5161 23.0445 41.9241 23.3921 43.1844 24.0874C44.4447 24.7827 45.4391 25.776 46.1677 27.0673C46.8963 28.3586 47.2606 29.8386 47.2606 31.5073C47.2606 33.1761 46.8865 34.6561 46.1382 35.9474C45.3899 37.2386 44.3659 38.2419 43.0662 38.957C41.7863 39.6524 40.3685 40 38.8128 40ZM38.8128 37.0499C39.6792 37.0499 40.4866 36.8413 41.2349 36.4241C42.0029 36.007 42.6232 35.3812 43.0958 34.5468C43.5684 33.7125 43.8047 32.6993 43.8047 31.5073C43.8047 30.3154 43.5782 29.3121 43.1253 28.4976C42.6724 27.6633 42.0718 27.0375 41.3235 26.6203C40.5752 26.2031 39.7678 25.9945 38.9014 25.9945C38.035 25.9945 37.2276 26.2031 36.4793 26.6203C35.7507 27.0375 35.1698 27.6633 34.7366 28.4976C34.3033 29.3121 34.0867 30.3154 34.0867 31.5073C34.0867 33.2754 34.5298 34.6461 35.4159 35.6196C36.3218 36.5731 37.454 37.0499 38.8128 37.0499Z"
              fill="#0B83A5"
            />
            <path
              d="M49.467 31.5073C49.467 29.8187 49.8017 28.3387 50.4713 27.0673C51.1605 25.776 52.1057 24.7827 53.3069 24.0874C54.5081 23.3921 55.8865 23.0445 57.4422 23.0445C59.4114 23.0445 61.036 23.5212 62.316 24.4748C63.6156 25.4085 64.4919 26.7494 64.9448 28.4976H61.3117C61.0163 27.6831 60.5437 27.0474 59.8938 26.5905C59.244 26.1336 58.4268 25.9051 57.4422 25.9051C56.0638 25.9051 54.961 26.4018 54.134 27.3951C53.3266 28.3685 52.9229 29.7393 52.9229 31.5073C52.9229 33.2754 53.3266 34.6561 54.134 35.6494C54.961 36.6427 56.0638 37.1393 57.4422 37.1393C59.3917 37.1393 60.6815 36.2752 61.3117 34.5468H64.9448C64.4722 36.2156 63.5861 37.5466 62.2864 38.5399C60.9867 39.5133 59.372 40 57.4422 40C55.8865 40 54.5081 39.6524 53.3069 38.957C52.1057 38.2419 51.1605 37.2486 50.4713 35.9772C49.8017 34.6859 49.467 33.1959 49.467 31.5073Z"
              fill="#0B83A5"
            />
            <path
              d="M72.9676 18.813V39.7318H67.9166V18.813H72.9676Z"
              fill="#FF9417"
            />
            <path
              d="M91.5446 18.813V22.8955H86.0506V39.7318H80.9996V22.8955H75.5055V18.813H91.5446Z"
              fill="#FF9417"
            />
            <path
              d="M110.857 19.0216V39.7318H107.49V30.673H97.8309V39.7318H94.4636V19.0216H97.8309V27.9017H107.49V19.0216H110.857Z"
              fill="#0B83A5"
            />
            <path
              d="M130.207 31.1199C130.207 31.7358 130.167 32.292 130.089 32.7887H117.653C117.752 34.0998 118.234 35.1527 119.1 35.9474C119.967 36.742 121.03 37.1393 122.291 37.1393C124.102 37.1393 125.382 36.3745 126.13 34.8448H129.764C129.271 36.3546 128.375 37.5962 127.076 38.5697C125.796 39.5232 124.201 40 122.291 40C120.735 40 119.337 39.6524 118.096 38.957C116.875 38.2419 115.91 37.2486 115.201 35.9772C114.512 34.6859 114.168 33.1959 114.168 31.5073C114.168 29.8187 114.502 28.3387 115.172 27.0673C115.861 25.776 116.816 24.7827 118.037 24.0874C119.278 23.3921 120.696 23.0445 122.291 23.0445C123.827 23.0445 125.195 23.3822 126.396 24.0576C127.598 24.7331 128.533 25.6866 129.202 26.9183C129.872 28.1301 130.207 29.5307 130.207 31.1199ZM126.692 30.0472C126.672 28.7956 126.229 27.7924 125.363 27.0375C124.496 26.2826 123.423 25.9051 122.143 25.9051C120.981 25.9051 119.987 26.2826 119.16 27.0375C118.332 27.7725 117.84 28.7758 117.683 30.0472H126.692Z"
              fill="#0B83A5"
            />
            <path
              d="M132.398 31.4477C132.398 29.7989 132.733 28.3387 133.402 27.0673C134.092 25.7959 135.017 24.8125 136.179 24.1172C137.36 23.402 138.66 23.0445 140.078 23.0445C141.358 23.0445 142.47 23.3027 143.416 23.8192C144.381 24.3159 145.149 24.9416 145.72 25.6965V23.3126H149.117V39.7318H145.72V37.2883C145.149 38.0631 144.371 38.7087 143.386 39.2252C142.402 39.7417 141.279 40 140.019 40C138.621 40 137.341 39.6424 136.179 38.9272C135.017 38.1922 134.092 37.179 133.402 35.8878C132.733 34.5766 132.398 33.0966 132.398 31.4477ZM145.72 31.5073C145.72 30.375 145.483 29.3916 145.011 28.5572C144.558 27.7229 143.957 27.0872 143.209 26.6501C142.461 26.2131 141.653 25.9945 140.787 25.9945C139.92 25.9945 139.113 26.2131 138.365 26.6501C137.616 27.0673 137.006 27.6931 136.533 28.5274C136.08 29.3419 135.854 30.3154 135.854 31.4477C135.854 32.5801 136.08 33.5734 136.533 34.4276C137.006 35.2819 137.616 35.9374 138.365 36.3943C139.133 36.8314 139.94 37.0499 140.787 37.0499C141.653 37.0499 142.461 36.8314 143.209 36.3943C143.957 35.9573 144.558 35.3216 145.011 34.4872C145.483 33.633 145.72 32.6397 145.72 31.5073Z"
              fill="#0B83A5"
            />
            <path
              d="M156.907 17.6807V39.7318H153.539V17.6807H156.907Z"
              fill="#0B83A5"
            />
            <path
              d="M165.256 26.0839V35.1726C165.256 35.7884 165.394 36.2354 165.67 36.5135C165.965 36.7718 166.457 36.9009 167.147 36.9009H169.214V39.7318H166.556C165.04 39.7318 163.878 39.3742 163.07 38.659C162.263 37.9439 161.859 36.7817 161.859 35.1726V26.0839H159.939V23.3126H161.859V19.2302H165.256V23.3126H169.214V26.0839H165.256Z"
              fill="#0B83A5"
            />
            <path
              d="M180.736 23.0445C181.977 23.0445 183.079 23.3126 184.044 23.849C185.029 24.3854 185.797 25.18 186.348 26.2329C186.919 27.2858 187.205 28.5572 187.205 30.0472V39.7318H183.867V30.5538C183.867 29.0837 183.503 27.9613 182.774 27.1865C182.046 26.3919 181.051 25.9945 179.791 25.9945C178.531 25.9945 177.526 26.3919 176.778 27.1865C176.049 27.9613 175.685 29.0837 175.685 30.5538V39.7318H172.318V17.6807H175.685V25.2198C176.256 24.5245 176.975 23.9881 177.841 23.6106C178.728 23.2332 179.692 23.0445 180.736 23.0445Z"
              fill="#0B83A5"
            />
            <path
              d="M4.25295 0C2.26148 0.295692 1.82019 0.56655 0 1.3894L0.00913353 5.50946C1.46528 4.85118 2.65977 4.40474 4.25295 4.16819V0Z"
              fill="#FF9417"
            />
            <path
              d="M4.17708 39.697C8.35415 39.8955 12.1551 39.2512 15.7782 37.5996C19.4013 35.948 22.4408 33.345 24.5311 30.1039C26.6213 26.8628 27.6733 23.1215 27.5605 19.3302C27.4476 15.5389 26.1747 11.8591 23.8949 8.73353L20.4526 10.9632C22.2764 13.4637 23.2948 16.4076 23.3851 19.4406C23.4753 22.4736 22.6337 25.4666 20.9615 28.0595C19.2893 30.6525 16.8577 32.7348 13.9592 34.0561C11.0607 35.3774 7.37231 35.8039 4.17708 35.4299L4.17708 39.697Z"
              fill="#FF9417"
            />
            <path
              d="M21.8615 6.13873C19.8199 4.1075 17.3479 2.51122 14.6089 1.45542C11.8699 0.399621 8.92635 -0.0916558 5.97273 0.0140653V3.9697C8.33562 3.88513 10.4427 4.16819 13.0389 5.13404C15.6351 6.09989 17.2077 7.2557 18.8409 8.88068L21.8615 6.13873Z"
              fill="#0B83A5"
            />
            <path d="M0 6.35152H4.25306V39.697H0V6.35152Z" fill="#0B83A5" />
            <path
              d="M13.7327 31.2796H9.55566V4.18024L10.036 4.26769L10.6084 4.39116L11.2117 4.5435L11.6958 4.68234L12.2193 4.84331L12.7401 5.02229L12.9489 5.10077L13.3064 5.23562L13.7327 5.40667V17.7826H23.3402C23.3402 17.7826 23.4676 18.8314 23.4675 19.4515C23.4674 20.0716 23.4267 20.9584 23.4267 20.9584H13.7327V31.2796Z"
              fill="#0B83A5"
            />
            <path
              d="M187.034 0.732844V0H192.106V0.732844H189.979V6.82211H189.161V0.732844H187.034Z"
              fill="#0B83A5"
            />
            <path
              d="M193.37 0H194.347L196.645 5.66289H196.724L199.023 0H200V6.82211H199.234V1.63891H199.168L197.055 6.82211H196.315L194.202 1.63891H194.136V6.82211H193.37V0Z"
              fill="#0B83A5"
            />
          </svg>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ul>
            {menus.map((menu, index) => (
              <React.Fragment key={index}>
                <Link
                  to={menu.path}
                  onClick={() => {
                    toggleMenu(index);
                  }}
                  component={Link}
                  className={`text-sm flex items-center gap-x-4 cursor-pointer active: rounded-md  p-2 ${
                    open ? " ml-3 mr-3 " : " ml-2   mr-2"
                  } ${
                    activeMenuIndex === index
                      ? "bg-gray-500  bg-opacity-9 transition-transform"
                      : "hover:bg-zinc-100  bg-opacity-10 transition-transform"
                  } active:rounded-md ${menu.spacing ? "mt-9" : "mt-2"}`}
                >
                  <span className="text-2xl block float-left">
                    <span className="text-blue-500">
                      {menu.icon ? menu.icon : <RiDashboardFill />}
                    </span>
                  </span>
                  <span
                    className={`text-base font-medium flex-1  duration-2 ${
                      !open && "hidden"
                    }`}
                  >
                    <span
                      className={`${
                        activeMenuIndex === index ? " text-white" : ""
                      } font-sans font-semibold
                      `}
                    >
                      {menu.title}
                    </span>
                  </span>

                  <span className="p-1">
                    {menu.subMenu && open && activeMenuIndex === index ? (
                      <AiOutlineMinusSquare
                        className={`${
                          activeMenuIndex === index ? " text-white " : ""
                        } font-sans text-lg`}
                      />
                    ) : menu.subMenu ? (
                      <AiOutlinePlusSquare
                        className={`${
                          activeMenuIndex === index ? " text-white " : ""
                        } font-sans text-lg`}
                      />
                    ) : (
                      ""
                    )}
                  </span>
                </Link>
                {menu.subMenu && activeMenuIndex === index && (
                  <ul>
                    {menu.submenuItems.map((submenuItem, subIndex) => (
                      <React.Fragment key={subIndex}>
                        <Link
                          component={Link}
                          to={submenuItem.path}
                          onClick={() => toggleSubMenu(subIndex)}
                          className={`text-sm   flex  ml-8  font-medium items-center gap-x-4 cursor-pointer pl-7 p-2 pb-2 pt-2 rounded-md mt-2 mr-3  ${
                            activeSubMenuIndex === subIndex
                              ? "bg-gray-500  bg-opacity-9 transition-transform"
                              : "hover:bg-zinc-100  bg-opacity-10 transition-transform"
                          }  ${!open && "hidden"}`}
                        >
                          <span
                            className={`text-base font-medium flex-1 duration-2  `}
                          >
                            <span
                              className={`${
                                activeSubMenuIndex === subIndex
                                  ? " text-white"
                                  : ""
                              } font-sans `}
                            >
                              {submenuItem.title}
                            </span>
                          </span>
                          <span className="p-1">
                            {submenuItem.subMenuChildren &&
                            open &&
                            activeMenuIndex === index &&
                            subIndex === activeSubMenuIndex ? (
                              <AiOutlineMinusSquare
                                className={`${
                                  activeSubMenuIndex === subIndex
                                    ? " text-white"
                                    : ""
                                } text-lg`}
                              />
                            ) : submenuItem.subMenuChildren ? (
                              <AiOutlinePlusSquare
                                className={`${
                                  activeSubMenuIndex === subIndex
                                    ? " text-white"
                                    : ""
                                }text-lg`}
                              />
                            ) : (
                              ""
                            )}
                          </span>
                        </Link>
                        {submenuItem.subMenuChildren &&
                          activeMenuIndex === index &&
                          subIndex === activeSubMenuIndex && (
                            <ul>
                              {submenuItem.submenuItemsChildren.map(
                                (submenuItemChild, childIndex) => (
                                  <React.Fragment key={childIndex}>
                                    <Link
                                      component={Link}
                                      to={submenuItemChild.path}
                                      onClick={() =>
                                        toggleSubMenuChild(childIndex)
                                      }
                                      className={`text-sm ml-12 flex  font-medium items-center gap-x-4 cursor-pointer  pl-4 pr-2 pt-2 pb-2  rounded-md mt-2  mr-3
                                      ${
                                        activeSubMenuChildIndex === childIndex
                                          ? "bg-gray-500  bg-opacity-9 transition-transform"
                                          : "hover:bg-zinc-100  bg-opacity-10 transition-transform"
                                      }  ${!open && "hidden"}`}
                                    >
                                      <span
                                        className={`text-base font-medium flex-1 duration-2  `}
                                      >
                                        <span
                                          className={`${
                                            activeSubMenuChildIndex ===
                                            childIndex
                                              ? " text-white"
                                              : ""
                                          } font-sans`}
                                        >
                                          {submenuItemChild.title}
                                        </span>
                                      </span>
                                    </Link>
                                  </React.Fragment>
                                )
                              )}
                            </ul>
                          )}
                      </React.Fragment>
                    ))}
                  </ul>
                )}
              </React.Fragment>
            ))}
          </ul>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography component={"div"} paragraph>
          {/* <AppRouter /> */}
          <Outlet />
        </Typography>
      </Box>
      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
}
