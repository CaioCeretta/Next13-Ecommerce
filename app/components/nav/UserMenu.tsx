'use client'

import { Avatar, MenuItem } from '@mui/material'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { AiFillCaretDown } from 'react-icons/ai'
import BackDrop from './BackDrop'
import { SafeUser } from '@/types'

interface UserMenuProps {
  currentUser: SafeUser
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  return (
    <>
      <div className="relative z-30">
        <div
          onClick={toggleOpen}
          className="
          border[1px]
          flex
          cursor-pointer
          flex-row
          items-center
          gap-1
          rounded-full
          border-slate-400
          p-2
          text-slate-700 transition
          hover:shadow-md
        "
        >
          <Avatar />
          <AiFillCaretDown />
        </div>
        {isOpen && (
          <div
            className="
          absolute
          right-0
          top-12
          flex
          w-[11rem]
          cursor-pointer
          flex-col
          overflow-hidden
          rounded-md
          bg-white
          text-sm
          shadow-md"
          >
            {currentUser ? (
              <div>
                <Link href="/orders">
                  <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
                </Link>
                <Link href="/admin">
                  <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
                </Link>
                <MenuItem
                  onClick={() => {
                    toggleOpen()
                    signOut()
                  }}
                >
                  Log Out
                </MenuItem>
              </div>
            ) : (
              <div>
                <Link href="/login">
                  <MenuItem onClick={toggleOpen}>Login</MenuItem>
                </Link>
                <Link href="/register">
                  <MenuItem onClick={toggleOpen}>Register</MenuItem>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
    </>
  )
}

export default UserMenu
