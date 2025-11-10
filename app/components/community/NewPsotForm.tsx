// "use client";

// import React, { useState } from "react";

// interface NewPostFormProps {
//     user: { id: string; name: string };
//     onAddPost: (text: string) => void;
// }

// export default function NewPostForm({ user, onAddPost }: NewPostFormProps) {
//     const [text, setText] = useState("");

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!text.trim()) return;
//         onAddPost(text);
//         setText("");
//     };

//     return (
//         <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
//             <textarea
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 placeholder={`ماذا تريد أن تقول، ${user.name}?`}
//                 className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <button
//                 type="submit"
//                 className="self-end px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
//             >
//                 نشر
//             </button>
//         </form>
//     );
// }
