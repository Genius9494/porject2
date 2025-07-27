import React from "react";
import { ImSpinner10 } from "react-icons/im";
// import { SpinnerOne } from "@mynaui/icons-react";

const Spinner = () => {
  return <div id="done" className="h-screen">
    <ImSpinner10 id="spinner" className=" text-white mt-50 w-16 h-16 animate-spin" />
    <p className=" mt-4 text-purple-500 font-bold text-xl animate-pulse ">.....Please Wait</p>
  </div> 
};

export default Spinner;
