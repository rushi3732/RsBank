import React from "react";
import { Link } from "react-router-dom";
import ErrorImg from "./404-error-idea.gif";

const Error = () => (
  <div className="flex flex-col  text-center justify-center">
    <div className="container mx-auto">
      <img src={ErrorImg} alt="404" className="w-full max-w-md mx-auto" />
      <h1 className="text-4xl font-mono  mb-4">Oops!!!</h1>
      <h4 className="text-lg mb-4 font-mono">
        This page you are looking for could not be found.
      </h4>
      <button className="bg-primary bg-blue-200 px-4 py-2 rounded focus:outline-none hover:bg-opacity-75">
        <Link to="/" className='font-mono "'>
          Go Back to Home
        </Link>
      </button>
    </div>
  </div>
);
export default Error;
