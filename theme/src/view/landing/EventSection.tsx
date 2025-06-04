/**
 * @name Event
 * @file EventSection.tsx
 * @description music landing page event section component
 */

// Modules
import React from 'react'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

// Components
import Carousel from '@component/Carousel'
import EventCard from '@component/card/EventCard'

// Utilities
import { EventTypes, translationsObjectTypes } from '@core/types'

interface Props {
  events: EventTypes[]
}

const EventSection: React.FC<Props> = ({ events }) => {
  const { t } = useTranslation()
  const homePage: translationsObjectTypes = t('home_page', { returnObjects: true })

  return (
    // Main section [[ Find at scss/framework/section.scss ]]
    <section className='main-section bg-light'>
      <div className='container'>
        <div className='d-sm-flex align-items-center justify-content-between text-center mb-5'>
          <h2 className='mb-4 mb-sm-0' dangerouslySetInnerHTML={{ __html: homePage.event_title }} />
          <Link className='btn btn-outline-primary' to='/music/event'>
            {homePage.event_button}
          </Link>
        </div>
        <Carousel Component={EventCard} slideView={3} gap={32} data={events} pagination autoplay />
      </div>
    </section>
  )
}

EventSection.displayName = 'EventSection'
export default EventSection
