import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectStep,
  setStep,
  selectRequiredFieldsFilled,
  setRequiredFieldsFilled,
} from "../../formSlice";

import Details from "./Details";
import Address from "./Address";
import Review from "./Review";

const steps = [Details, Address, Review];
const stepNames = ["Details", "Address", "Review"];

const MultiStepForm = () => {
  const currentStep = useSelector(selectStep);
  const areRequiredFieldsFilled = useSelector(selectRequiredFieldsFilled);

  const Component = steps[currentStep];
  const dispatch = useDispatch();

  const navigateToStep = (stepIndex) => {
    if (currentStep < stepIndex && areRequiredFieldsFilled) {
      dispatch(setStep(stepIndex));
      dispatch(setRequiredFieldsFilled(false));
    } else if (currentStep > stepIndex) {
      dispatch(setStep(stepIndex));
    } else {
      console.log("Please fill out the required fields before proceeding.");
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex">
        <div className="w-full">
          <div className="p-4">
            <div className="flex space-x-2  border-gray-500  border  p-3 rounded-lg">
              {stepNames.map((name, index) => (
                <div
                  key={index}
                  className={`cursor-pointer ${
                    currentStep === index ? "border-b-2 border-blue-500 " : ""
                  } p-1`}
                  onClick={() => navigateToStep(index)}
                >
                  {name}
                </div>
              ))}
            </div>
            <Component />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
