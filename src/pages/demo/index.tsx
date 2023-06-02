import { Outlet } from 'react-router-dom'
import type { FC } from 'react'

const Component: FC = () => {
  return (
    <div>
      <p>nested demo view:</p>
      <Outlet />
    </div>
  )
}

export default Component