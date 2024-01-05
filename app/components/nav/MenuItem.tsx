import { ReactNode } from 'react'

interface MenuItemProps {
  children: ReactNode
  onClick: () => void
}

const MenuItems = ({ children, onClick }: MenuItemProps) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 
  transition hover:bg-neutral-100"
    >
      {children}
    </div>
  )
}

export default MenuItems
