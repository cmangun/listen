// Modules
import { useTranslation } from 'react-i18next'

// Hooks
import useFetch from '@core/hooks/useFetch'

// Layouts
import SectionLayout from '@layout/SectionLayout'

// Utilities
import { ARTISTS } from '@core/constants/api-urls'
import { ArtistTypes } from '@core/types'

function Artists() {
  const { t } = useTranslation()
  const { data: artists } = useFetch<ArtistTypes>({ url: ARTISTS, type: 'artist' })

  if (!artists) return null

  return (
    <>
      {/* Hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='hero' style={{ backgroundImage: 'url(/images/banner/artists.jpg)' }} />

      {/* Under hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='under-hero container'>
        <SectionLayout
          title={t('feature_artists_title')}
          data={artists}
          card='avatar'
          slideView={6}
          pagination
          autoplay
        />

        <SectionLayout
          title={t('top_artists_title')}
          data={artists}
          card='artist'
          slideView={5}
          grid
          navigation
          autoplay
        />
      </div>
    </>
  )
}

export default Artists
