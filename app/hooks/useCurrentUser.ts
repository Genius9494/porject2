// "use client";
// import { useEffect, useState } from "react";

// export function useCurrentUser() {
//   const [user, setUser] = useState<{ id: string; name: string } | null>(null);

//   useEffect(() => {
//     fetch("/api/me")
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.id && data.name) setUser({ id: data.id, name: data.name });
//       });
//   }, []);

//   return user;
// }
