// Modules
import { useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { RiAddCircleLine, RiMailOpenFill, RiMapPin2Fill, RiPhoneFill } from '@remixicon/react'

// Context
import { useTheme } from '@core/contexts/Theme'

// Hooks
import useFetch from '@core/hooks/useFetch'

// Components
import AvatarGroup from '@component/AvatarGroup'

// Utilities
import { EVENTS } from '@core/constants/api-urls'
import { EventTypes } from '@core/types'

function EventDetails() {
  const { replaceClassName } = useTheme()
  const { id } = useParams()
  const { t } = useTranslation()
  const { data: events } = useFetch<EventTypes>({ url: EVENTS, type: 'event' })

  if (!events) return null
  const event = events.find((item) => item.id === id) as EventTypes

  return (
    <>
      {/* Hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='hero' style={{ backgroundImage: 'url(/images/banner/event.jpg)' }} />

      {/* Under hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='under-hero container'>
        {/* Section [[ Find at scss/framework/section.scss ]] */}
        <div className='section'>
          <div className='col-xl-8 px-sm-4 px-md-5 px-xl-0 mx-auto mb-5'>
            <h1>{event.title}</h1>
            {/* Info list [[ Find at scss/components/list.scss ]] */}
            <ul className='info-list info-list--dotted mt-3'>
              <li>
                <AvatarGroup data={event} />
              </li>
              {event.seats && <li>{event.seats} seats only</li>}
              <li className='fw-semibold'>{event.date}</li>
            </ul>

            <button type='button' className='btn btn-primary mt-4' style={{ minWidth: 140 }}>
              <div className='btn__wrap'>
                <RiAddCircleLine />
                <span>{t('join_event')}</span>
              </div>
            </button>
          </div>

          <div className='col-xl-10 mx-auto mb-5'>
            {/* Cover [[ Find at scss/components/cover.scss ]] */}
            <div className='cover cover--round'>
              <div className='cover__image'>
                <div className='ratio ratio-16x9'>
                  <img width={540} height={320} src={event.image} alt={event.title} />
                </div>
              </div>
            </div>
          </div>

          <div className='col-xl-8 px-4 px-md-5 px-xl-0 mx-auto'>
            <div className='row g-4 fs-6 mb-4'>
              <div className='col-sm-6 d-flex'>
                <RiMapPin2Fill size={20} />
                <div className={replaceClassName('ms-3')}>
                  <span className='d-block mb-2 fw-semibold text-dark'>Venue At</span>
                  <div dangerouslySetInnerHTML={{ __html: event.address }} />
                </div>
              </div>
              <div className='col-sm-6'>
                <div className='d-flex align-items-center mb-3'>
                  <RiPhoneFill size={20} />
                  <a href={'tel:' + event.phone} className={replaceClassName('ms-3 text-dark')}>
                    {event.phone}
                  </a>
                </div>
                <div className='d-flex align-items-center'>
                  <RiMailOpenFill size={20} />
                  <a href={'mailto:' + event.email} className={replaceClassName('ms-3 text-dark')}>
                    {event.email}
                  </a>
                </div>
              </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: event.description }} />
          </div>
        </div>
      </div>
    </>
  )
}

export default EventDetails
