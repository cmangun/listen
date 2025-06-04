/**
 * @name PlanSection
 * @file PlanSection.tsx
 * @description music landing page plan section component
 */

// Modules
import React from 'react'
import { useTranslation } from 'react-i18next'

// Utilities
import { translationsObjectTypes } from '@core/types'

interface Props {
  children: React.ReactElement
}

const PlanSection: React.FC<Props> = ({ children }) => {
  const { t } = useTranslation()
  const homePage: translationsObjectTypes = t('home_page', { returnObjects: true })

  return (
    // Main section [[ Find at scss/framework/section.scss ]]
    <section id='pricing' className='main-section'>
      <div className='container'>
        <div className='text-center mb-5'>
          <h2 className='mb-4 mb-sm-0' dangerouslySetInnerHTML={{ __html: homePage.plan_title }} />
        </div>
        <div className='col-xl-11 col-lg-8 mx-auto pt-4'>{children}</div>
      </div>
    </section>
  )
}

PlanSection.displayName = 'PlanSection'
export default PlanSection
