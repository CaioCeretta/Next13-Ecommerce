'use client'

import { FieldValues, UseFormRegister } from 'react-hook-form'

interface CustomCheckProps {
  id: string
  label: string
  disabled?: boolean
  register: UseFormRegister<FieldValues>
}

const CustomCheckbox = ({
  id,
  label,
  disabled,
  register,
}: CustomCheckProps) => {
  return (
    <div className="flex w-full gap-2 text-center">
      <input
        id={id}
        disabled={disabled}
        {...register(id)}
        type="checkbox"
        name=""
        placeholder=""
        className={`cursor-pointer`}
      />
      <label
        htmlFor={id}
        className="
          cursor-pointer
          font-medium
          
      "
      >
        {label}
      </label>
    </div>
  )
}

export default CustomCheckbox
