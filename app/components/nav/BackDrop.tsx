interface BackDropProps {
  onClick: () => void
}

const BackDrop = ({ onClick }: BackDropProps) => {
  return (
    <div
      onClick={onClick}
      className="
  l-0
  fixed
  top-0
  z-20
  h-screen
  w-screen
  bg-slate-200
  opacity-50
  
  "
    ></div>
  )
}

export default BackDrop
