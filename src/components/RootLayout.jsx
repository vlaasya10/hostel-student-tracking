import React from 'react'
import NavigationBar from './NavigationBar'
import {Outlet} from 'react-router'

function RootLayout() {
  return (
    <div>
      <NavigationBar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout
