"use client"
export default function SuccessPage() {
  const backToHome = () => {
    window.location.href = "/Home";
  }
  return (
    <div id="success" className="flex flex-col items-center justify-center  h-screen  ">
      <div className="flex items-center ">
        <span className="animate-bounce text-2xl  ">✅</span>

        <h1 className="text-3xl font-bold  text-green-700"> !Payment Successful</h1>
      </div>
      <h2 className="mt-4 text-gray-700 animate-pulse font-bold">.Thank you for your purchase</h2>
      <button className=" top-0 left-0 bg-gray-600 hover:bg-gray-500 p-2 rounded-full mt-2 animate-pulse" onClick={backToHome} >Back To Home</button>

    </div>
  );
}


