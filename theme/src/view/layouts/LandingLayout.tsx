/**
 * @name LandingLayout
 * @file LandingLayout.tsx
 * @description Main layout for the external pages
 */

// Modules
import type React from "react"
import { Outlet } from "react-router-dom" // Changed import

// Components
import MainHeader from "@component/header/MainHeader"
import MainFooter from "@component/footer/MainFooter"

const LandingLayout: React.FC = () => {
  return (
    <>
      <MainHeader />
      <Outlet />
      <MainFooter />
    </>
  )
}

LandingLayout.displayName = "LandingLayout"
export default LandingLayout
