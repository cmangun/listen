// Modules
import { useParams } from 'react-router'
import { useTranslation } from 'react-i18next'

// Hooks
import useFetch from '@core/hooks/useFetch'

// Layouts
import SectionLayout from '@layout/SectionLayout'

// Components
import TrackList from '@component/TrackList'

// Utilities
import { GenreTypes } from '@core/types'
import { GENRES } from '@core/constants/api-urls'

function GenreDetails() {
  const { id } = useParams()
  const { t } = useTranslation()
  const { data: genres } = useFetch<GenreTypes>({ url: GENRES, type: 'genre' })

  if (!genres) return null
  const genre = genres.find((item) => item.id === id) as GenreTypes

  return (
    <>
      {/* Hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='hero' style={{ backgroundImage: 'url(/images/banner/home.jpg)' }} />

      {/* Under hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='under-hero container'>
        {/* Section [[ Find at scss/framework/section.scss ]] */}
        <div className='section'>
          <div className='section__head'>
            <h3 className='mb-0'>{genre.title}</h3>
          </div>
          {/* List [[ Find at scss/components/list.scss ]] */}
          <div className='list'>
            <div className='row'>
              {genre.tracks.map((item: any, index: number) => (
                <div key={index} className='col-xl-6'>
                  <TrackList data={item} duration dropdown playlist queue play />
                </div>
              ))}
            </div>
          </div>
        </div>

        <SectionLayout
          title={t('discover_genres_title')}
          data={genres}
          card='genre'
          slideView={4}
          navigation
          autoplay
        />
      </div>
    </>
  )
}

export default GenreDetails
