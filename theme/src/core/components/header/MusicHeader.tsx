/**
 * @name MusicHeader
 * @file MusicHeader.tsx
 * @description music pages header component
 */

// Modules
import React from 'react'
import { RiMenu3Line } from '@remixicon/react'

// Contexts
import { useTheme } from '@core/contexts/Theme'

// Components
import Search from './Search'
import Language from './Language'
import Profile from './Profile'

// Utilities
import { toggleSidebar } from '@core/utils'

const MusicHeader: React.FC = () => {
  const { replaceClassName, headerSkin } = useTheme()

  return (
    // Header [[ Find at scss/framework/header.scss ]]
    <header id='header' data-header={headerSkin}>
      <div className='container'>
        <div className='header-container'>
          <div className='d-flex align-items-center'>
            <a
              role='button'
              className={replaceClassName('header-text sidebar-toggler d-lg-none me-3')}
              aria-label='Sidebar toggler'
              onClick={toggleSidebar}
            >
              <RiMenu3Line />
            </a>
            <Search />
            <div className='d-flex align-items-center'>
              <Language />
              <Profile />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

MusicHeader.displayName = 'MusicHeader'
export default MusicHeader
