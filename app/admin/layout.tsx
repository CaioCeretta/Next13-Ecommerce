import { ReactNode } from 'react'
import AdminNav from '../components/admin/AdminNav'

export const metadata = {
  title: 'E~Shop Admin',
  description: 'E~Shop Admin Dashboard ',
}

interface AdminLayoutProps {
  children: ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div>
      <AdminNav />
      {children}
    </div>
  )
}

export default AdminLayout
