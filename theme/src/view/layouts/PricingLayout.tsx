/**
 * @name PricingLayout
 * @file PricingLayout.tsx
 * @description component use to display plan pricing.
 */

// Modules
import React from 'react'
import { useTranslation } from 'react-i18next'
import { RiCheckboxCircleFill } from '@remixicon/react'

// Contexts
import { useTheme } from '@core/contexts/Theme'

// Components
import PlanCard from '@component/card/PlanCard'

// Utilities
import { PlanTypes, translationsObjectTypes } from '@core/types'
import IconEl from '@core/utils/icon'

interface Props {
  data: PlanTypes[]
  userPlan?: boolean
  showLink?: boolean
}

const PricingLayout: React.FC<Props> = ({ data, userPlan, showLink }) => {
  const { replaceClassName } = useTheme()
  const { t } = useTranslation()
  const pricing: translationsObjectTypes = t('pricing', { returnObjects: true })

  return (
    <>
      {/* Plan [[ Find at scss/framework/plan.scss ]] */}
      <div className='plan bg-light'>
        <PlanCard register={userPlan} showLink={showLink} />
        <div className='plan__data'>
          {data.map((plan, index) => (
            <div className='card plan__col' key={index}>
              <div className='card-body fw-medium'>
                <div className='d-flex align-items-center text-dark mb-4'>
                  {IconEl(plan.icon, 32)}
                  <i className='ri-music-2-line fs-3'></i>
                  <h3
                    className={replaceClassName('h4 mb-0 ps-3')}
                    dangerouslySetInnerHTML={{ __html: plan.title }}
                  />
                </div>
                <p className='fs-6 opacity-50'>{pricing.plan_subtitle}</p>
                {plan.features.map((feature) => (
                  <div className='d-flex mb-3' key={feature.id}>
                    <RiCheckboxCircleFill className='text-primary opacity-75' size={16} />
                    <span className={replaceClassName('ps-2')}>{feature.title}</span>
                  </div>
                ))}
              </div>
              <div className='card-footer pb-4 pb-sm-0'>
                <div className='text-dark mb-3'>
                  <span className='fs-4 fw-bold'>${plan.price}</span>/{pricing.year}
                </div>
                <button type='button' className='btn btn-primary w-100'>
                  {pricing.choose}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

PricingLayout.displayName = 'PricingLayout'
export default PricingLayout
