/**
 * @name PlanCard
 * @file PlanCard.tsx
 * @description plan card component
 */

// Modules
import React from 'react'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { RiArrowLeftLine, RiArrowRightLine } from '@remixicon/react'

// Contexts
import { useTheme } from '@core/contexts/Theme'

// Utilities
import { translationsObjectTypes } from '@core/types'

interface Props {
  register?: boolean
  showLink?: boolean
}

const PlanCard: React.FC<Props> = ({ register, showLink }) => {
  const { rtl, replaceClassName } = useTheme()
  const { t } = useTranslation()
  const pricing: translationsObjectTypes = t('pricing', { returnObjects: true })

  const ArrowIcon = rtl ? RiArrowLeftLine : RiArrowRightLine
  const href = register ? '/auth/register' : '/music/plan'

  return (
    <div className='card plan__info overflow-hidden'>
      <div className='card-body d-flex flex-column p-0'>
        <div className='p-4'>
          <h3
            className='h4 mb-3'
            dangerouslySetInnerHTML={{
              __html: register ? pricing.plan_1_title : pricing.plan_2_title,
            }}
          />
          <p
            className='fs-6'
            dangerouslySetInnerHTML={{
              __html: register ? pricing.plan_1_description : pricing.plan_2_description,
            }}
          />
          {showLink && (
            <Link to={href} className='d-inline-flex align-items-center'>
              <span className={replaceClassName('me-1')}>
                {register ? t('register_now') : pricing.choose_plan}
              </span>
              <ArrowIcon size={16} />
            </Link>
          )}
        </div>
        <div className='px-3 text-center mt-auto'>
          <img
            src='/images/misc/plan.png'
            width={320}
            height={374}
            alt='Plan image'
            className='img-fluid'
          />
        </div>
      </div>
    </div>
  )
}

PlanCard.displayName = 'PlanCard'
export default PlanCard
