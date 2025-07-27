// components/ui/dropdown-menu.tsx
"use client"

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuContent = ({ className, ...props }: any) => (
  <DropdownMenuPrimitive.Content
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 text-sm shadow-md dark:border-gray-700 dark:bg-gray-800",
      className
    )}
    {...props}
  />
)
const DropdownMenuItem = DropdownMenuPrimitive.Item
const DropdownMenuLabel = DropdownMenuPrimitive.Label

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
}
