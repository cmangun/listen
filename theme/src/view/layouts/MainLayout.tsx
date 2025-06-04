/**
 * @name MainLayout
 * @file MainLayout.tsx
 * @description Main layout for the external pages
 */

// Modules
import type React from "react"
import { Outlet } from "react-router-dom" // Changed import

// Contexts
import Authentication from "@core/contexts/Authentication"
import Player from "@core/contexts/Player"
import Theme from "@core/contexts/Theme"

// Components
import Loading from "@component/Loading"
import Snackbar from "@component/Snackbar"
import Settings from "@component/Settings"

// Utilities
import { ENABLE_SETTINGS } from "@core/constants"

const MainLayout: React.FC = () => {
  return (
    <>
      <Loading />
      <Authentication>
        <Theme>
          <Snackbar>
            <Player>
              <Outlet />
            </Player>
          </Snackbar>
          {ENABLE_SETTINGS && <Settings />}
        </Theme>
      </Authentication>
    </>
  )
}

MainLayout.displayName = "MainLayout"
export default MainLayout
