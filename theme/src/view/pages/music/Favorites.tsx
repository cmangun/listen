// Modules
import { useTranslation } from 'react-i18next'

// Hooks
import useFetch from '@core/hooks/useFetch'

// Layouts
import SectionLayout from '@layout/SectionLayout'

// Components
import TrackList from '@component/TrackList'

// Utilities
import { ALBUMS, TRACKS } from '@core/constants/api-urls'
import { AlbumTypes, TrackTypes } from '@core/types'

function Favorites() {
  const { t } = useTranslation()

  const { data: albums } = useFetch<AlbumTypes>({ url: ALBUMS, type: 'album' })
  const { data: tracks } = useFetch<TrackTypes>({ url: TRACKS, type: 'track' })

  if (!albums || !tracks) return null

  return (
    <>
      {/* Hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='hero' style={{ backgroundImage: 'url(/images/banner/track.jpg)' }} />

      {/* Under hero [[ Find at scss/framework/hero.scss ]] */}
      <div className='under-hero container'>
        {/* Section [[ Find at scss/framework/section.scss ]] */}
        <div className='section'>
          <div className='section__head'>
            <h3 className='mb-0'>{t('tracks')}</h3>
          </div>

          {/* List [[ Find at scss/components/list.scss ]] */}
          <div className='list'>
            <div className='row'>
              {tracks.map(
                (item: any, index: number) =>
                  item.favorite && (
                    <div key={index} className='col-xl-6'>
                      <TrackList data={item} favorite duration dropdown playlist queue play link />
                    </div>
                  )
              )}
            </div>
          </div>
        </div>

        <SectionLayout
          title={t('sidebar.albums')}
          data={albums.filter((item) => item.favorite)}
          card='album'
          slideView={5}
          grid
          navigation
          autoplay
        />
      </div>
    </>
  )
}

export default Favorites
