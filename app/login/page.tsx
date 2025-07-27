import React from "react";
import Login from "../components/forms/Login";
import { getUser } from "../actions/auth";

const page = async () => {
  return (
    <main
      className=" min-h-screen flex items-center justify-center w-full relative "
      style={{
        backgroundImage: "url('/login2.jpeg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute w-full overflow-hidden mt-12">
        <div className=" overflow-hidden w-full h-32 inset-0 animate-marquee ">
          <img src="/fbc.jpg" alt="Lufy" className=" w-32 h-32 object-cover opacity-50 rounded-xl" />
        </div>
        <div className="relative overflow-hidden w-full h-32 inset-0 animate-marquee2 ">
          <img src="/ghost.jpg" alt="Lufy" className=" w-32 h-32 object-cover opacity-50 rounded-xl" />
        </div>
        <div className="relative overflow-hidden w-full h-32 inset-0 animate-marquee3 ">
          <img src="/hell.jpg" alt="Lufy" className=" w-32 h-32 object-cover opacity-50 rounded-xl" />
        </div>
        <div className="relative overflow-hidden w-full h-32 inset-0 animate-marquee4 ">
          <img src="/kong.jpg" alt="Lufy" className=" w-32 h-32 object-cover opacity-50 rounded-xl" />
        </div>
        <div className=" overflow-hidden w-full h-32 inset-0 animate-marquee ">
          <img src="/lego.jpg" alt="Lufy" className=" w-32 h-32 object-cover opacity-50 rounded-xl" />
        </div>
        <div className="relative overflow-hidden w-full h-32 inset-0 animate-marquee2 ">
          <img src="/limbo.jpg" alt="Lufy" className=" w-32 h-32 object-cover opacity-50 rounded-xl" />
        </div>

      </div>
      <Login />
      
    </main>
  );
};

export default page;
