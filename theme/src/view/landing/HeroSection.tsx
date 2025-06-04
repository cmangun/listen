/**
 * @name HeroSection
 * @file HeroSection.tsx
 * @description music landing page hero section component
 */

// Modules
import React from 'react'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

// Contexts
import { useTheme } from '@core/contexts/Theme'

// Utilities
import { translationsObjectTypes } from '@core/types'

const HeroSection: React.FC = () => {
  const { replaceClassName } = useTheme()
  const { t } = useTranslation()
  const homePage: translationsObjectTypes = t('home_page', { returnObjects: true })

  return (
    <section className='container-fluid px-xl-4'>
      {/* Main hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='main-hero mx-auto'>
        <div className='container'>
          <div className='col-xl-6 col-lg-8 col-md-9 fs-5'>
            <h1
              className='main-hero__title mb-3'
              dangerouslySetInnerHTML={{ __html: homePage.hero_title }}
            />
            <div className={replaceClassName('me-sm-5')}>
              <p>{homePage.hero_description}</p>
              <div className='d-flex gap-2'>
                <Link
                  className='btn btn-lg btn-white flex-sm-grow-0 flex-grow-1'
                  to='/auth/register'
                >
                  {t('try_it_free')}
                </Link>
                <Link
                  className='btn btn-lg btn-outline-dark flex-sm-grow-0 flex-grow-1'
                  to='/music'
                >
                  {t('header.discover')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

HeroSection.displayName = 'HeroSection'
export default HeroSection
