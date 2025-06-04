// Hooks
import useFetch from '@core/hooks/useFetch'

// Components
import AvatarCard from '@component/card/AvatarCard'
import Carousel from '@component/Carousel'
import HeroSection from '../landing/HeroSection'
import FeatureSection from '../landing/FeatureSection'
import EventSection from '../landing/EventSection'
import PlanSection from '../landing/PlanSection'
import ArtistSection from '../landing/ArtistSection'
import BlogSection from '../landing/BlogSection'
import PricingLayout from '../layouts/PricingLayout'

// Utilities
import { ARTISTS, EVENTS, PLANS } from '@core/constants/api-urls'
import { ArtistTypes, EventTypes, PlanTypes } from '@core/types'

function Home() {
  const { data: artists } = useFetch<ArtistTypes>({ url: ARTISTS, type: 'artist' })
  const { data: events } = useFetch<EventTypes>({ url: EVENTS, type: 'event' })
  const { data: plans } = useFetch<PlanTypes>({ url: PLANS, type: 'plan' })

  if (!artists || !events || !plans) return null

  return (
    <>
      <HeroSection />
      <FeatureSection />
      <EventSection events={events} />
      <PlanSection>
        <PricingLayout data={plans} userPlan showLink />
      </PlanSection>
      <ArtistSection>
        <Carousel Component={AvatarCard} slideView={6} data={artists} pagination autoplay />
      </ArtistSection>
      <BlogSection />
    </>
  )
}

export default Home
