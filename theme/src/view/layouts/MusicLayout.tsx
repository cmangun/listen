/**
 * @name MusicLayout
 * @file MusicLayout.tsx
 * @description music pages layout
 */

// Modules
import type React from "react"
import { Outlet } from "react-router-dom" // Changed import

// Components
import MusicHeader from "@component/header/MusicHeader"
import MusicFooter from "@component/footer/MusicFooter"
import Sidebar from "@component/Sidebar"

const MusicLayout: React.FC = () => {
  return (
    <>
      <MusicHeader />
      <Sidebar />

      {/* Page content [[ Find at scss/framework/wrapper.scss ]] */}
      <main id="page_content">
        <Outlet />
      </main>

      {/* Backdrop [[ Find at scss/framework/wrapper.scss ]] */}
      <div id="backdrop"></div>

      <MusicFooter />
    </>
  )
}

MusicLayout.displayName = "MusicLayout"
export default MusicLayout
