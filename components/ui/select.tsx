import type React from "react"

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode
}

export const Select: React.FC<SelectProps> = ({ children, className = "", ...props }) => {
  return (
    <select
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    >
      {children}
    </select>
  )
}

export const SelectGroup = () => <></>
export const SelectTrigger = () => <></>
export const SelectValue = () => <></>
export const SelectContent = () => <></>
export const SelectLabel = () => <></>
export const SelectItem = () => <></>
export const SelectSeparator = () => <></>
export const SelectScrollUpButton = () => <></>
export const SelectScrollDownButton = () => <></>