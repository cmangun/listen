/**
 * @name DownloadApp
 * @file DownloadApp.tsx
 * @description download app button component
 */

// Modules
import React from 'react'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

// Contexts
import { useTheme } from '@core/contexts/Theme'

// Utilities
import { APP } from '@core/constants'

interface Props {
  button?: 'default' | 'primary'
}

const DownloadApp: React.FC<Props> = ({ button = 'default' }) => {
  const { replaceClassName } = useTheme()
  const { t } = useTranslation()

  return (
    APP.length && (
      <div className='app-btn-group'>
        {APP.map((item, index) => (
          <Link key={index} to={item.href} className={'btn btn-lg btn-' + button}>
            <span className='btn__wrap'>
              <item.icon />
              <span className={replaceClassName('ms-2')}>{t(item.name)}</span>
            </span>
          </Link>
        ))}
      </div>
    )
  )
}

DownloadApp.displayName = 'DownloadApp'
export default DownloadApp
