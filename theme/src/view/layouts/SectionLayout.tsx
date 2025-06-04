/**
 * @name SectionLayout
 * @file SectionLayout.tsx
 * @description common component for music pages section
 */

// Modules
import React from 'react'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { SwiperClass } from 'swiper/react'

// Components
import Carousel, { CarouselProps } from '@component/Carousel'
import TrackCard from '@component/card/TrackCard'
import EventCard from '@component/card/EventCard'
import AvatarCard from '@component/card/AvatarCard'
import CollectionCard from '@component/card/CollectionCard'

// Utilities
import { CardNameTypes } from '@core/types'

interface Props extends Omit<CarouselProps, 'Component'> {
  /**
   * Set card component base on name
   */
  card: CardNameTypes

  /**
   * Set section link
   */
  href?: string

  /**
   * Set section subtitle
   */
  subtitle?: string

  /**
   * Set section title
   */
  title: string
}

const SectionLayout: React.FC<Props> = ({
  card,
  data,
  href,
  subtitle,
  slideView,
  title,
  ...props
}) => {
  const { t } = useTranslation()
  let cardType = null
  let cardProps = null

  const sectionHead = () => {
    return href ? (
      <>
        <div className='flex-grow-1'>
          {subtitle && <span className='section__subtitle'>{subtitle}</span>}
          <h3 className='mb-0' dangerouslySetInnerHTML={{ __html: title }} />
        </div>
        <Link to={href} className='btn btn-link'>
          {t('view_all')}
        </Link>
      </>
    ) : (
      <>
        {subtitle && <span className='section__subtitle'>{subtitle}</span>}
        <h3 className='mb-0' dangerouslySetInnerHTML={{ __html: title }} />
      </>
    )
  }

  const handleAfterInit = (swiper: SwiperClass) => {
    const slide = swiper.slides[0]
    const { height } = slide.getBoundingClientRect()
    const foot = slide.querySelector('.cover__foot')

    if (foot) {
      const footHeight = foot.getBoundingClientRect().height || 0
      const percentage = Math.round(((height - footHeight) / height) * 100)
      const { parentElement } = swiper.el
      if (parentElement) {
        parentElement.style.setProperty('--swiper-carousel-navigation-top', percentage / 2 + '%')
      }
    }
  }

  //
  // Set card component element & props.
  if (card === 'event') {
    cardType = EventCard
  } else if (card === 'avatar') {
    cardType = AvatarCard
  } else if (card === 'playlist' || card === 'genre') {
    cardType = CollectionCard
    if (card === 'playlist') {
      cardProps = {
        info: true,
      }
    }
  } else {
    cardType = TrackCard
    cardProps = {
      dropdown: card !== 'artist',
      link: card === 'artist' || card === 'album',
      favorite: true,
      play: card === 'radio' || card === 'track',
      playlist: card === 'album' || card === 'track',
      queue: card === 'radio' || card === 'track',
    }
  }

  return (
    // SectionLayout [[ Find at scss/framework/section.scss ]]
    <section className='section'>
      <div className='section__head'>{sectionHead()}</div>
      <Carousel
        data={data}
        Component={cardType}
        childProps={cardProps}
        slideView={slideView}
        onAfterInit={handleAfterInit}
        {...props}
      />
    </section>
  )
}

SectionLayout.displayName = 'SectionLayout'

export default SectionLayout
