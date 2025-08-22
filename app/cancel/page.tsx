"use client"
export default function CancelPage() {
  const backToHome = () => {
    window.location.href = "/Home";
  }
  return (
    <div id="success" className="flex flex-col items-center justify-center h-screen relative">
      <div className="flex items-center ">
        <span className="animate-bounce text-xl  ">❌</span>
        <h1 className="text-3xl font-bold text-red-600"> Payment Cancelled</h1>
      </div>
      <p className="mt-4 text-white text-xl font-bold animate-pulse">.Your payment was not completed, Please try again</p>
      <button className=" top-0 left-0 bg-gray-600 hover:bg-gray-500 p-2 rounded-full mt-2 animate-pulse" onClick={backToHome} >Back To Home</button>

    </div>
  );
}
