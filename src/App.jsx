import React, { Children } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router'
import RootLayout from './components/RootLayout'
import Dashboard from './components/Dashboard'
import Students from './components/Students'
import Checkin from './components/Checkin'
import Alerts from './components/Alerts'
import Notifications from './components/Notifications'
import Settings from './components/Settings'

function App() {

  let routerObj = createBrowserRouter([
    {
    path:"/",
    element:<RootLayout />,
    children:[
      {
        path:"dashboard",
        element:<Dashboard />
      },
      {
        path:"students",
        element:<Students />
      },
      {
        path:"checkin",
        element:<Checkin />
      },
      {
        path:"alerts",
        element:<Alerts />
      },
      {
        path:"notifications",
        element:<Notifications />
      },
      {
        path:"settings",
        element:<Settings />
      }
    ]
  }
  ])
  return (
    <div>
      <RouterProvider router={routerObj} />
    </div>
  )
}

export default App
