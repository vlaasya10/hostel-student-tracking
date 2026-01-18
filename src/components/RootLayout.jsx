import NavigationBar from './NavigationBar'
import {Outlet} from 'react-router'

function RootLayout() {
  return (
    <div>
      <NavigationBar />
      <div className="container mt-5 pt-5" >
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout
