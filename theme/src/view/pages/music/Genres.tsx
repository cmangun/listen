// Modules
import { useTranslation } from 'react-i18next'

// Hooks
import useFetch from '@core/hooks/useFetch'

// Layouts
import SectionLayout from '@layout/SectionLayout'

// Utilities
import { GenreTypes } from '@core/types'
import { GENRES } from '@core/constants/api-urls'

function Genres() {
  const { t } = useTranslation()
  const { data: genres } = useFetch<GenreTypes>({ url: GENRES, type: 'genre' })

  if (!genres) return null

  return (
    <>
      {/* Hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='hero' style={{ backgroundImage: 'url(/images/banner/home.jpg)' }} />

      {/* Under hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='under-hero container'>
        <SectionLayout
          title={t('music_genres_title')}
          data={genres}
          card='genre'
          slideView={4}
          grid
          navigation
          autoplay
        />
        <SectionLayout
          title={t('podcast_genres_title')}
          data={genres}
          card='genre'
          slideView={4}
          grid
          navigation
          autoplay
        />
      </div>
    </>
  )
}

export default Genres
