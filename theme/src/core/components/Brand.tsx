/**
 * @name Brand
 * @file Brand.tsx
 * @description music brand component
 */

// Modules
import React from 'react'
import { Link } from 'react-router'

import { BRAND, SIDEBAR_TOGGLE } from '../constants'

const Brand: React.FC = () => {
  /**
   *
   * Handle link `onClick` event
   */
  const handleClick = () => {
    document.body.removeAttribute(SIDEBAR_TOGGLE)
  }

  return (
    <Link className='brand' to={BRAND.href} onClick={handleClick}>
      <img src={BRAND.logo} width={104} height={44} alt={BRAND.name} />
    </Link>
  )
}

Brand.displayName = 'Brand'
export default Brand
