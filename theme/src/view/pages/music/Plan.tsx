// Hooks
import useFetch from '@core/hooks/useFetch'

// Layouts
import PricingLayout from '@layout/PricingLayout'

// Utilities
import { PlanTypes } from '@core/types'
import { PLANS } from '@core/constants/api-urls'

function Plan() {
  const { data: plans } = useFetch<PlanTypes>({ url: PLANS, type: 'plan' })

  if (!plans) return null

  return (
    <>
      {/* Hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='hero' style={{ backgroundImage: 'url(/images/banner/event.jpg)' }} />

      {/* Under hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='under-hero container'>
        {/* Section [[ Find at scss/framework/section.scss ]] */}
        <div className='section'>
          <PricingLayout data={plans} />
        </div>
      </div>
    </>
  )
}

export default Plan
