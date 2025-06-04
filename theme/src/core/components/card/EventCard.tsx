/**
 * @name EventCard
 * @file EventCard.tsx
 * @description event card component
 */

// Modules
import React from 'react'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { RiMapPinFill } from '@remixicon/react'

// Contexts
import { useTheme } from '@core/contexts/Theme'

// Components
import AvatarGroup from '../AvatarGroup'

// Utilities
import { EventTypes } from '@core/types'
import { removeHtml } from '@core/utils'

interface Props {
  data: EventTypes
}

const EventCard: React.FC<Props> = ({ data }) => {
  const { replaceClassName } = useTheme()
  const { t } = useTranslation()

  return (
    // Cover [[ Find at scss/components/cover.scss ]]
    <div className='cover cover--round scale-animation'>
      <Link to={'/music/event/' + data.id} className='cover__image'>
        <div className='ratio ratio-16x9'>
          <img src={data.image} width={540} height={320} alt={data.title} />
        </div>
      </Link>
      <div className='cover__foot mt-3 px-2'>
        <div className='cover__subtitle d-flex mb-2'>
          <RiMapPinFill size={16} />
          <span
            className={replaceClassName('ms-1 fw-semibold')}
            dangerouslySetInnerHTML={{ __html: removeHtml(data.address) }}
          ></span>
        </div>
        <div className='mb-3'>
          <Link to={'/music/event/' + data.id} className='cover__title fs-6'>
            {data.title}
          </Link>
        </div>
        <div className='d-flex align-items-center justify-content-between'>
          <AvatarGroup data={data} />
          <Link className='btn btn-sm btn-light-primary' to={'/music/event/' + data.id}>
            {t('join_event')}
          </Link>
        </div>
      </div>
    </div>
  )
}

EventCard.displayName = 'EventCard'
export default EventCard
