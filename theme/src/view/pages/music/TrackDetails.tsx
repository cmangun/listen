// Modules
import { useParams } from 'react-router'
import { useTranslation } from 'react-i18next'

// Hooks
import useFetch from '@core/hooks/useFetch'

// Layouts
import SectionLayout from '@layout/SectionLayout'

// Components
import Comments from '@component/Comments'
import CoverInfo from '@component/CoverInfo'

// Utilities
import { TRACKS } from '@core/constants/api-urls'
import { TrackTypes } from '@core/types'

function TrackDetails() {
  const { id } = useParams()
  const { t } = useTranslation()
  const { data: tracks } = useFetch<TrackTypes>({ url: TRACKS, type: 'track' })

  if (!tracks) return null
  const track = tracks.find((item) => item.id === id) as TrackTypes

  return (
    <>
      {/* Hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='hero' style={{ backgroundImage: 'url(/images/banner/track.jpg)' }} />

      {/* Under hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='under-hero container'>
        <CoverInfo data={track} />

        <SectionLayout
          title={t('related_tracks_title')}
          data={tracks}
          card='track'
          slideView={5}
          navigation
          autoplay
        />

        <Comments />
      </div>
    </>
  )
}

export default TrackDetails
