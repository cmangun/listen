/**
 * @name ArtistSection
 * @file ArtistSection.tsx
 * @description music landing page artist section component
 */

// Modules
import React from 'react'
import { useTranslation } from 'react-i18next'

// Utilities
import { translationsObjectTypes } from '@core/types'

interface Props {
  children: React.ReactElement
}

const ArtistSection: React.FC<Props> = ({ children }) => {
  const { t } = useTranslation()
  const homePage: translationsObjectTypes = t('home_page', { returnObjects: true })

  return (
    // main section [[ Find at scss/framework/section.scss ]]
    <section className='main-section bg-light'>
      <div className='container'>
        <div className='col-xl-6 col-lg-8 mx-auto text-center fs-5 mb-5'>
          <h2 dangerouslySetInnerHTML={{ __html: homePage.artists_title }} />
          <p>{homePage.artists_description}</p>
        </div>
        {children}
      </div>
    </section>
  )
}

ArtistSection.displayName = 'ArtistSection'
export default ArtistSection
