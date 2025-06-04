"use client"

/**
 * @name Brand
 * @file Brand.tsx
 * @description music brand component
 */

// Modules
import type React from "react"
import { Link } from "react-router-dom" // Changed import

import { BRAND, SIDEBAR_TOGGLE } from "../constants"

const Brand: React.FC = () => {
  /**
   *
   * Handle link `onClick` event
   */
  const handleClick = () => {
    if (document.body.hasAttribute(SIDEBAR_TOGGLE)) {
      document.body.removeAttribute(SIDEBAR_TOGGLE)
    }
  }

  return (
    <Link className="brand" to={BRAND.href} onClick={handleClick}>
      <img src={BRAND.logo || "/placeholder.svg"} width={104} height={44} alt={BRAND.name} />
    </Link>
  )
}

Brand.displayName = "Brand"
export default Brand
