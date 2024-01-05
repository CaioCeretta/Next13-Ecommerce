'use client'

import Link from 'next/link'
import { Container } from '../Container'
import AdminNavItem from './AdminNavItem'
import {
  MdDashboard,
  MdDns,
  MdFormatListBulleted,
  MdHome,
  MdLibraryAdd,
} from 'react-icons/md'
import { usePathname } from 'next/navigation'

const AdminNav = () => {
  const pathname = usePathname()

  const navItems = [
    { label: 'Summary', icon: MdDashboard, href: '/admin' },
    { label: 'Products', icon: MdLibraryAdd, href: '/admin/add-products' },
    {
      label: 'Manage Products',
      icon: MdDns,
      href: '/admin/manage-products',
    },
    {
      label: 'Manage Orders',
      icon: MdFormatListBulleted,
      href: '/admin/manage-orders',
    },
  ]

  return (
    <div className="top-20 w-full border-b-[1px] pt-4 shadow-sm">
      <Container>
        <div className="over flex flex-nowrap items-center justify-between gap-8 md:justify-center md:gap-12">
          {navItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <AdminNavItem
                label={item.label}
                icon={item.icon}
                selected={pathname === item.href}
              />
            </Link>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default AdminNav
