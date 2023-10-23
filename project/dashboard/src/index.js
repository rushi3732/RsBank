import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider, createTheme } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { DataProvider } from "./component/DataContext";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
const theme = createTheme();
root.render(
  <React.StrictMode>
    <Suspense>
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <Router>
            <ThemeProvider theme={theme}>
              <DataProvider>
                <App />
              </DataProvider>
            </ThemeProvider>
          </Router>
        </StyledEngineProvider>
      </Provider>
    </Suspense>
  </React.StrictMode>
);

reportWebVitals();
