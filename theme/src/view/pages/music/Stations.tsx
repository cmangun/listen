// Modules
import { useTranslation } from 'react-i18next'

// Hooks
import useFetch from '@core/hooks/useFetch'

// Layouts
import SectionLayout from '@layout/SectionLayout'

// Utilities
import { RADIO } from '@core/constants/api-urls'
import { RadioTypes } from '@core/types'

function Stations() {
  const { t } = useTranslation()
  const { data: radio } = useFetch<RadioTypes>({ url: RADIO, type: 'radio' })

  if (!radio) return null

  return (
    <>
      {/* Hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='hero' style={{ backgroundImage: 'url(/images/banner/radio.jpg)' }} />

      {/* Under hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='under-hero container'>
        <SectionLayout
          title={t('live_frequency_title')}
          data={radio}
          card='radio'
          slideView={5}
          grid
          navigation
          autoplay
        />
        <SectionLayout
          title={t('top_radio_title')}
          data={radio}
          card='radio'
          slideView={5}
          grid
          navigation
          autoplay
        />
      </div>
    </>
  )
}

export default Stations
