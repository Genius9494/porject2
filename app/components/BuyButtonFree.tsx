"use client";

import React from "react";

type BuyButtonProps = {
  name: string;
};

const BuyButtonFree: React.FC<BuyButtonProps> = ({ name }) => {
  const handleBuy = async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });


      if (!res.ok) {
        console.error("API Error:", res.statusText);
        return;
      }

      const data = await res.json();


      if (data?.url) {
        window.location.href = data.url;
      } else {
        console.error("No URL in response:", data);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  return (
    <button style={{ width: "50%" }}
      onClick={handleBuy}
      className="bg-green-600 hover:bg-red-700 text-white py-2 px-4 rounded-xl mt-6 h-10 animate-pulse delay-75 text-sm"
    >
      Download it for free
    </button>
  );
};

export default BuyButtonFree;













// "use client";

// import React from "react";

// type BuyButtonProps = {
//   name: string;
// };

// const BuyButtonFree: React.FC<BuyButtonProps> = ({ name }) => {
//   const handleBuy = async () => {
//     try {
//       const res = await fetch("/api/checkout", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name}),
//       });

//       // تحقق من حالة الاستجابة (إذا كانت غير ناجحة)
//       if (!res.ok) {
//         console.error("API Error:", res.statusText);
//         return;
//       }

//       const data = await res.json();

//       // إذا كان هناك رابط (URL) في الاستجابة، يتم إعادة التوجيه
//       if (data?.url) {
//         window.location.href = data.url;
//       } else {
//         console.error("No URL in response:", data);
//       }
//     } catch (error) {
//       console.error("Error during fetch:", error);
//     }
//   };

//   return (
//     <button style={{width:"50%"}}
//       onClick={handleBuy}
//       className="bg-pink-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl mt-6 h-10 animate-pulse delay-75 text-sm"
//     >
//       Download it for free
//     </button>
//   );
// };

// export default BuyButtonFree;



