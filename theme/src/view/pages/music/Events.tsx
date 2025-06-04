// Modules
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { RiAddFill } from '@remixicon/react'

// Hooks
import useFetch from '@core/hooks/useFetch'

// Components
import Carousel from '@component/Carousel'
import EventCard from '@component/card/EventCard'

// Utilities
import { EVENTS } from '@core/constants/api-urls'
import { EventTypes } from '@core/types'

function Events() {
  const { t } = useTranslation()
  const { data: events } = useFetch<EventTypes>({ url: EVENTS, type: 'event' })

  if (!events) return null

  return (
    <>
      {/* Hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='hero' style={{ backgroundImage: 'url(/images/banner/event.jpg)' }} />

      {/* Under hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='under-hero container'>
        {/* Section [[ Find at scss/framework/section.scss ]] */}
        <div className='section'>
          <div className='section__head'>
            <div className='flex-grow-1'>
              <h3
                className='mb-0'
                dangerouslySetInnerHTML={{ __html: t('upcoming_event_title') }}
              />
            </div>
            <Link to='/music/create-event' className='btn btn-primary'>
              <div className='btn__wrap'>
                <RiAddFill />
                <span>{t('create_event')}</span>
              </div>
            </Link>
          </div>

          <Carousel data={events} Component={EventCard} slideView={3} grid />
        </div>
      </div>
    </>
  )
}

export default Events
