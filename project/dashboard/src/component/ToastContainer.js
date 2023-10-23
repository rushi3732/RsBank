import React from 'react';
import { ToastProvider } from 'react-toast-notifications';

const ToastContainer = ({ children }) => {
  return (
    <ToastProvider
      autoDismissTimeout={3000} 
      autoDismiss={true} 
      placement="top-center" 
    >
      {children}
    </ToastProvider>
  );
};

export default ToastContainer;
