"use server"

import connect from "./connet";
import User from "../models/user";

export async function makeAdmin(email: string) {
  await connect();

  const updatedUser = await User.findOneAndUpdate(
    { email:"raed@gmail.com" }, 
    { role: "admin" },
    { new: true }
  );

  return updatedUser;
}
