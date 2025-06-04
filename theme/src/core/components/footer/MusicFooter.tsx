/**
 * @name MusicFooter
 * @file MusicFooter.tsx
 * @description music pages footer component
 */

// Modules
import React from 'react'
import { Link } from 'react-router'

// Components
import DownloadApp from './DownloadApp'

// Utilities
import { BRAND } from '@core/constants'

const MusicFooter: React.FC = () => {
  return (
    <footer id='footer'>
      <div className='container'>
        <div className='text-center mb-4 pb-2'>
          <Link to={'mailto:' + BRAND.email} className='display-5 email'>
            {BRAND.email}
          </Link>
        </div>
        <DownloadApp button='primary' />
      </div>
    </footer>
  )
}

MusicFooter.displayName = 'MusicFooter'
export default MusicFooter
