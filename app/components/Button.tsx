'use client'

import { MouseEvent } from "react";
import * as MaterialDesign from 'react-icons/md'
import { IconType } from "react-icons";

interface ButtonProps {
  label: string,
  disabled?: boolean,
  outline?: boolean,
  small?: boolean,
  custom?: string,
  icon?: IconType,
  onClick: (e: MouseEvent<HTMLButtonElement>)
  => void
}

const Button = ({
  label,
  custom,
  disabled,
  icon,
  outline,
  small,
  onClick
}: ButtonProps) => {
  return <button
  disabled
  className={`
    disabled:opacity-70
    disabled:cursor-not-allowedrounded-md
    hover:opacity-80      
    transition
    w-full
    border-slate-700
    flex
    items-center
    justify-center
    gap-2
    rounded
    ${outline ? "bg-white text-slate-700" : "bg-slate-700 text-white"}
    ${small ? "text-sm font-light py-1 px-2 border-[1px]" : "text-md py-3 px-4 font-semibold border-2"}
    ${custom ? custom : ''}
  

  `}>
    {icon && <Icon name="icon" size={24}/>}
    {label}
  </button>
}
 
export default Button;