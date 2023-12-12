import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div
      className="
      mx-auto
      max-w-[1920px]
      px-4
      md:px-2
      xl:px-20 
      
    "
    >
      {children}
    </div>
  )
}

export { Container }
