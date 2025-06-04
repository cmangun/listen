/**
 * @name Sidebar
 * @file Sidebar.tsx
 * @description music pages sidebar component
 */

// Modules
import React from 'react'
import classNames from 'classnames'
import { Link, useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'
import { RiMenu3Line, RiMenuLine, RiMenuFoldLine, RiMusicFill } from '@remixicon/react'

// Contexts
import { useTheme } from '../contexts/Theme'

// Components
import Brand from './Brand'
import Scrollbar from './Scrollbar'

// Utilities
import { toggleSidebar } from '../utils'
import { NAVBAR } from '../constants'
import { translationsObjectTypes } from '../types'

const Sidebar: React.FC = () => {
  const location = useLocation()
  const { replaceClassName, sidebarSkin } = useTheme()
  const { t } = useTranslation()
  const navbar: translationsObjectTypes = t('sidebar', { returnObjects: true })

  /**
   *
   * Check if a given route is the active route based on the current pathname.
   * @param href
   * @returns
   */
  const isActiveRoute = (href: string) => {
    if (!location.pathname) return false
    const isActivePage = location.pathname.split('/')[2] === href.split('/')[2]
    return isActivePage && location.pathname.startsWith(href)
  }

  /**
   *
   * Navigation link or head view
   * @param nav
   * @returns
   */
  const navLink = (nav: any) => {
    return nav.title ? (
      <>
        <span className='nav-item--head__text'>{navbar[nav.title]}</span>
        <span className='nav-item--head__dots'>...</span>
      </>
    ) : (
      <Link
        to={nav.path}
        className={classNames(
          'nav-link d-flex align-items-center',
          isActiveRoute(nav.path) && 'active'
        )}
      >
        <nav.icon size={20} />
        <span className={replaceClassName('ms-3')}>{navbar[nav.name]}</span>
      </Link>
    )
  }

  return (
    <aside id='sidebar' data-sidebar={sidebarSkin}>
      <div className='sidebar-head d-flex align-items-center justify-content-between'>
        <Brand />

        <a
          role='button'
          className='sidebar-toggler'
          aria-label='Sidebar toggler'
          onClick={toggleSidebar}
        >
          <div className='d-none d-lg-block'>
            <RiMenu3Line className='sidebar-menu-1' />
            <RiMenuLine className='sidebar-menu-2' />
          </div>
          <RiMenuFoldLine className='d-lg-none' />
        </a>
      </div>

      <Scrollbar className='sidebar-body'>
        <nav className='navbar d-block p-0'>
          <ul className='navbar-nav'>
            {NAVBAR.map((nav: any, index) => (
              <li key={index} className={classNames('nav-item', nav.title && 'nav-item--head')}>
                {navLink(nav)}
              </li>
            ))}
          </ul>
        </nav>
      </Scrollbar>

      <div className='sidebar-foot'>
        <Link to='/music/add-track' className='btn btn-primary d-flex'>
          <div className='btn__wrap'>
            <RiMusicFill />
            <span>{navbar.add_music}</span>
          </div>
        </Link>
      </div>
    </aside>
  )
}

Sidebar.displayName = 'Sidebar'
export default Sidebar
