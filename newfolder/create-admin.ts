// scripts/create-admin.ts (تشغيل يدوي)
import User from "@/app/models/user"
import connect from "@/lib/connect"
import bcrypt from "bcrypt"

async function createAdmin() {
  await connect()

  const password = await bcrypt.hash("كلمة_سر_قوية", 10)

  await User.create({
    email: "admin@site.com",
    name: "Admin",
    password,
    role: "admin",
  })

  console.log("✅ Admin created")
}

createAdmin()
