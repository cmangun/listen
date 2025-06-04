/**
 * @name MainHeader
 * @file MainHeader.tsx
 * @description music main pages header component
 */

// Modules
import React, { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'
import { RiMenu3Fill } from '@remixicon/react'

// Contexts
import { useTheme } from '@core/contexts/Theme'

// Components
import Brand from '../Brand'

// Utilities
import { addClass, removeClass } from '@core/utils'
import { NAVBAR_LINK } from '@core/constants'
import { NavLinkTypes, translationsObjectTypes } from '@core/types'

const MainHeader: React.FC = () => {
  const { t } = useTranslation()
  const header: translationsObjectTypes = t('header', { returnObjects: true })

  const location = useLocation()
  const { replaceClassName } = useTheme()
  const navRef = useRef<HTMLDivElement | null>(null)
  const btnRef = useRef<HTMLButtonElement | null>(null)

  // Collapse menu in mobile
  useEffect(() => {
    const btn = btnRef.current
    const nav = navRef.current
    if (btn && nav) {
      addClass(btn, 'collapsed')
      btn.setAttribute('aria-expanded', 'false')
      removeClass(nav, 'show')
    }
  }, [location.pathname])

  /**
   *
   * Navbar link view
   * @param nav
   * @returns
   */
  const navLink = (nav: NavLinkTypes) => {
    return (
      <li key={nav.name} className='nav-item'>
        <Link className='nav-link' to={nav.path + (nav.fragment ? `#${nav.fragment}` : '')}>
          {header[nav.name]}
        </Link>
      </li>
    )
  }

  return (
    // header [[ Find at scss/framework/header.scss ]]
    <header id='main_header'>
      <div className='container'>
        <nav className='navbar navbar-expand-lg'>
          <Brand />
          <div className='d-flex align-items-center navbar-ex'>
            <Link className='btn btn-primary' to='/auth/login'>
              {t('try_it_free')}
            </Link>
            <button
              ref={btnRef}
              className={replaceClassName('navbar-toggler ms-3 ms-sm-4')}
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#top_navbar'
              aria-controls='top_navbar'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <RiMenu3Fill />
            </button>
          </div>
          <div ref={navRef} className='collapse navbar-collapse' id='top_navbar'>
            <ul className='navbar-nav mt-4 mt-lg-0 mx-auto fw-semibold'>
              {NAVBAR_LINK.map((nav) => navLink(nav))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  )
}

MainHeader.displayName = 'MainHeader'
export default MainHeader
