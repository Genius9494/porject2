"use client";
import Image from "next/image";
import React from "react";
import { useGetUser } from "@/lib/queryFunctions";

const User = () => {
  const { user, isLoading, isError } = useGetUser();

  if (isLoading) return null;

  if (isError || !user?.data?.avatar?.secure_url || !user?.data?.name) {
    return null;
  }

  return (
    <div className="cursor-pointer flex items-center gap-3">
      <h1 className="text-base text-white">{user.data.name}</h1>
      <div className="w-14 h-14 relative rounded-full overflow-hidden">
        <Image
          fill
          src={user.data.avatar.secure_url}
          alt={user.data.name}
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      
    </div>
  );
};

export default User;






// 'use client';
// import React, { useState } from 'react';
// import Image from 'next/image';

// const User = ({ user }: { user: { name: string; avatar: { secure_url: string } } }) => {
//   const [avatarUrl, setAvatarUrl] = useState(user.avatar.secure_url);

//   const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // 1. ارفع الصورة إلى Cloudinary (مثال باستخدام FormData)
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', 'your_preset'); // استبدل بـ upload preset الخاص بك

//     const res = await fetch('https://api.cloudinary.com/v1_1/dxaj2hoal/image/upload', {
//       method: 'POST',
//       body: formData,
//     });

//     const data = await res.json();
//     if (data.secure_url) {
//       // 2. حدّث الصورة في الواجهة الأمامية
//       setAvatarUrl(data.secure_url);

//       // 3. أرسل الطلب لتحديث قاعدة البيانات (API)
//       await fetch('/api/user/update-avatar', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ avatarUrl: data.secure_url }),
//       });
//     }
//   };

//   return (
//     <div className="cursor-pointer flex items-center gap-3">
//       <div className="w-14 h-14 relative rounded-full overflow-hidden">
//         <Image
//           fill
//           src={avatarUrl}
//           alt={user.name}
//           className="object-cover"
//           priority
//           sizes="(max-width: 768px) 100vw, 50vw"
//         />
//       </div>
//       <h1 className="text-base text-white">{user.name}</h1>
//       <input type="file" accept="image/*" onChange={handleChangeImage} className="ml-4 text-white" />
//     </div>
//   );
// };

// export default User;