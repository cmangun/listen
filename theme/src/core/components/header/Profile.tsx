/**
 * @name Profile
 * @file Profile.tsx
 * @description profile dropdown component for header
 */

// Modules
import React from 'react'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { RiLogoutCircleLine } from '@remixicon/react'

// Contexts
import { useAuthentication } from '@core/contexts/Authentication'
import { useTheme } from '@core/contexts/Theme'

// Utilities
import { OPTIONS } from '@core/constants'
import { translationsObjectTypes } from '@core/types'

const Profile: React.FC = () => {
  const { currentUser, logout } = useAuthentication()
  const { replaceClassName } = useTheme()
  const { t } = useTranslation()
  const user: translationsObjectTypes = t('user', { returnObjects: true })

  return (
    <>
      {currentUser && (
        <div className={replaceClassName('dropdown ms-3 ms-sm-4')}>
          <a
            role='button'
            id='user_menu'
            className='avatar header-text'
            data-bs-toggle='dropdown'
            data-bs-offset='0,8'
            aria-expanded='false'
          >
            <div className='avatar__image'>
              <img src={currentUser.cover} width={128} height={128} alt='Profile picture' />
            </div>
            <span className={replaceClassName('ps-2 d-none d-sm-block')}>{currentUser.name}</span>
          </a>
          <div
            className={replaceClassName(
              'dropdown-menu dropdown-menu-md dropdown-menu-end profile-dropdown'
            )}
            aria-labelledby='user_menu'
          >
            <div className='py-2 px-3 avatar avatar--lg'>
              <div className='avatar__image'>
                <img src={currentUser.cover} width={128} height={128} alt={currentUser.name} />
              </div>
              <div className='avatar__content'>
                <span className='avatar__title'>{currentUser.name}</span>
                <span className='avatar__subtitle'>{currentUser.role}</span>
              </div>
            </div>
            <div className='dropdown-divider'></div>
            {OPTIONS.map((option, index) => (
              <Link
                to={option.path}
                key={index}
                className='dropdown-item d-flex align-items-center'
              >
                {<option.icon size={20} />}
                <span className={replaceClassName('ms-2')}>{user[option.name]}</span>
              </Link>
            ))}
            <div className='dropdown-divider'></div>
            <a
              role='button'
              className='dropdown-item d-flex align-items-center text-danger'
              onClick={logout}
            >
              <RiLogoutCircleLine size={20} />
              <span className={replaceClassName('ps-2')}>{t('logout')}</span>
            </a>
          </div>
        </div>
      )}
    </>
  )
}

Profile.displayName = 'Profile'
export default Profile
