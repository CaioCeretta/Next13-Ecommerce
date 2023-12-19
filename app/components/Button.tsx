'use client'

import { Icon } from '@mui/material'
import { MouseEvent } from 'react'
import { IconType } from 'react-icons'

interface ButtonProps {
  label: string
  disabled?: boolean
  outline?: boolean
  small?: boolean
  custom?: string
  icon?: IconType
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

const Button = ({
  label,
  custom,
  disabled,
  icon,
  outline,
  small,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`
    flex
    w-full
    items-center
    justify-center      
    gap-2
    rounded-md
    border-slate-700
    
    transition
    hover:opacity-80
    disabled:cursor-not-allowed
    disabled:opacity-70
    ${outline ? 'bg-white text-slate-700' : 'bg-slate-700 text-white'}
    ${
      small
        ? 'border-[1px] px-2 py-1 text-sm font-light'
        : 'text-md border-2 px-4 py-3 font-semibold'
    }
    ${custom || ''}
  `}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default Button
